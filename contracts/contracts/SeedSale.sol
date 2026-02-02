// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SeedSale is Ownable, ReentrancyGuard, Pausable {
    
    uint256 public softCap; // Minimum BNB to proceed
    uint256 public hardCap; // Maximum BNB to raise
    
    mapping(address => uint256) public deposits; // Renamed from contributions
    uint256 public raisedAmount; // Renamed from totalRaised
    
    bool public saleActive = true;
    bool public saleFinalized = false;
    bool public failed = false;

    uint256 public startTime; // New variable
    uint256 public endTime; // New variable

    event Deposited(address indexed user, uint256 amount); // Renamed from Contributed
    event SaleFinalized(uint256 totalBnBRaised);
    event SaleFailed();
    event RefundClaimed(address indexed user, uint256 amount); // Renamed from Refunded

    constructor(uint256 _softCap, uint256 _hardCap, uint256 _startTime, uint256 _endTime) Ownable(msg.sender) {
        require(_startTime < _endTime, "Start time must be before end time");
        softCap = _softCap;
        hardCap = _hardCap;
        startTime = _startTime;
        endTime = _endTime;
    }

    function deposit() external payable nonReentrant whenNotPaused {
        require(block.timestamp >= startTime, "Sale not started");
        require(block.timestamp <= endTime, "Sale ended");
        require(raisedAmount + msg.value <= hardCap, "HardCap exceeded");
        require(msg.value > 0, "Cannot deposit 0"); // Audit Fix: Min deposit check
        
        deposits[msg.sender] += msg.value;
        raisedAmount += msg.value;
        
        emit Deposited(msg.sender, msg.value);
    }
    
    function finalizeSale() external onlyOwner {
        require(saleActive, "Sale already ended");
        
        if (raisedAmount >= softCap) {
            saleFinalized = true;
            saleActive = false;
            
            // Transfer BNB to owner for Liquidity Creation
            (bool sent, ) = payable(owner()).call{value: address(this).balance}("");
            require(sent, "Failed to send BNB");
            
            emit SaleFinalized(raisedAmount);
        } else {
            failed = true;
            saleActive = false;
            emit SaleFailed();
        }
    }
    
    function claimRefund() external nonReentrant {
        require(block.timestamp > endTime, "Sale not ended");
        require(raisedAmount < softCap, "SoftCap reached");
        
        uint256 deposited = deposits[msg.sender];
        require(deposited > 0, "No deposit to refund");

        // Audit Fix: Checks-Effects-Interactions Pattern
        deposits[msg.sender] = 0; // Update state BEFORE transfer

        (bool success, ) = payable(msg.sender).call{value: deposited}("");
        require(success, "Refund failed");

        emit RefundClaimed(msg.sender, deposited);
    }

    // Audit Fix: Emergency Pause
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function emergencyWithdrawToken(address token) external onlyOwner {
        IERC20(token).transfer(owner(), IERC20(token).balanceOf(address(this)));
    }
}
