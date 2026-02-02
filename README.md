# $ROLL Dung Beetle Project

## Structure
- `contracts/`: Smart Contracts (Hardhat)
- `frontend/`: React + Vite DApp

## Setup

### 1. Smart Contracts
```bash
cd contracts
npm install
npm pkg set type="module" # If needed
npx hardhat compile
```
*Note: If you encounter ESM/CJS errors, ensure your `hardhat.config.js` and `package.json` "type" match.*

**Deployment:**
1. Create `.env` in `contracts/` with:
   ```
   PRIVATE_KEY=your_private_key_here
   ```
2. Run:
   ```bash
   npx hardhat run scripts/deploy.js --network bscTestnet
   ```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Launch Strategy
Refer to `launch_strategy.md` in the brain folder for the 3-Day Plan.
