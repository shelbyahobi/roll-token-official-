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

    IERC20 public saleToken;
    uint256 public constant TOKENS_PER_BNB = 5_000_000; // 1 BNB = 5M ROLL (Based on 20 BNB HardCap for 10% Supply)
    
    mapping(address => bool) public participation;

    event TokensClaimed(address indexed user, uint256 amount);

    // ... constructor ...

    function setSaleToken(address _token) external onlyOwner {
        require(address(saleToken) == address(0), "Token already set");
        saleToken = IERC20(_token);
    }

    function deposit() external payable nonReentrant whenNotPaused {
        require(block.timestamp >= startTime, "Sale not started");
        require(block.timestamp <= endTime, "Sale ended");
        require(raisedAmount + msg.value <= hardCap, "HardCap exceeded");
        require(msg.value > 0, "Cannot deposit 0"); 
        
        deposits[msg.sender] += msg.value;
        raisedAmount += msg.value;
        participation[msg.sender] = true;
        
        emit Deposited(msg.sender, msg.value);
    }
    
    function finalizeSale() external onlyOwner {
        require(saleActive, "Sale already ended");
        require(raisedAmount >= softCap, "SoftCap not met"); // Only finalize if success
        
        saleFinalized = true;
        saleActive = false;
        
        emit SaleFinalized(raisedAmount);
    }

    // New: Investors claim their tokens safely
    function claimTokens() external nonReentrant {
        require(saleFinalized, "Sale not finalized");
        require(!failed, "Sale failed, claim refund instead");
        
        uint256 deposited = deposits[msg.sender];
        require(deposited > 0, "No deposit");
        
        uint256 tokenAmount = deposited * TOKENS_PER_BNB;
        
        // Safety: Prevent double claiming by checking deposit, but wait.
        // Better pattern: Set deposit to 0? No, we might need record.
        // Usage of 'participation' or just deduct?
        // Let's use a separate mapping for claims or just reset deposit?
        // Resetting deposit prevents Refund, which is good if Finalized.
        
        deposits[msg.sender] = 0; // Prevent re-entry
        
        saleToken.transfer(msg.sender, tokenAmount);
        emit TokensClaimed(msg.sender, tokenAmount);
    }
    
    // New: Explicit withdrawal for Owner (Liquidity Creation)
    function withdrawFunds() external onlyOwner {
        require(saleFinalized, "Sale not finalized");
        
        (bool sent, ) = payable(owner()).call{value: address(this).balance}("");
        require(sent, "Failed to send BNB");
    }
    
    function claimRefund() external nonReentrant {
        require(block.timestamp > endTime, "Sale not ended");
        require(raisedAmount < softCap, "SoftCap reached"); // Refund only if failed
        require(!saleFinalized, "Sale success");
        
        uint256 deposited = deposits[msg.sender];
        require(deposited > 0, "No deposit");
        
        deposits[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: deposited}("");
        require(success, "Refund failed");
        
        emit RefundClaimed(msg.sender, deposited);
    }

    // Safety: Recover UNSOLD tokens if any
    function withdrawUnsoldTokens() external onlyOwner {
        require(block.timestamp > endTime + 7 days, "Timelock on recovery"); // Safety buffer
        uint256 balance = saleToken.balanceOf(address(this));
        saleToken.transfer(owner(), balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
