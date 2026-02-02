// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityLocker is Ownable {
    
    struct Lock {
        uint256 amount;
        uint256 unlockTime;
        bool withdrawn;
    }
    
    // LP Token Address -> Lock Details
    mapping(address => Lock) public locks;
    
    event Locked(address indexed token, uint256 amount, uint256 unlockTime);
    event Withdrawn(address indexed token, uint256 amount);
    event LockExtended(address indexed token, uint256 newUnlockTime);

    constructor() Ownable(msg.sender) {}

    function lockLP(address _lpToken, uint256 _amount, uint256 _unlockTime) external onlyOwner {
        require(_unlockTime > block.timestamp, "Unlock time must be in future");
        require(_amount > 0, "Amount must be > 0");
        require(locks[_lpToken].amount == 0, "Lock already exists, use extend or add"); // Simple version: One lock per token
        
        // Transfer LP tokens to this contract
        IERC20(_lpToken).transferFrom(msg.sender, address(this), _amount);
        
        locks[_lpToken] = Lock({
            amount: _amount,
            unlockTime: _unlockTime,
            withdrawn: false
        });
        
        emit Locked(_lpToken, _amount, _unlockTime);
    }
    
    function extendLock(address _lpToken, uint256 _newUnlockTime) external onlyOwner {
        require(locks[_lpToken].amount > 0, "No lock found");
        require(_newUnlockTime > locks[_lpToken].unlockTime, "New time must be greater");
        
        locks[_lpToken].unlockTime = _newUnlockTime;
        emit LockExtended(_lpToken, _newUnlockTime);
    }
    
    function withdraw(address _lpToken) external onlyOwner {
        Lock storage userLock = locks[_lpToken];
        require(userLock.amount > 0, "No lock found");
        require(!userLock.withdrawn, "Already withdrawn");
        require(block.timestamp >= userLock.unlockTime, "Lock still active");
        
        userLock.withdrawn = true;
        IERC20(_lpToken).transfer(owner(), userLock.amount);
        
        emit Withdrawn(_lpToken, userLock.amount);
    }
}
