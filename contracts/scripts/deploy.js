const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy ROLL Token
    const marketingWallet = deployer.address;
    const shopWallet = deployer.address;

    const ROLLToken = await hre.ethers.getContractFactory("ROLLToken");
    const rollToken = await ROLLToken.deploy(marketingWallet, shopWallet);

    await rollToken.waitForDeployment();
    const rollAddress = await rollToken.getAddress();
    console.log("ROLLToken deployed to:", rollAddress);

    // 2. Deploy SeedSale
    const softCap = hre.ethers.parseEther("5");
    const hardCap = hre.ethers.parseEther("20");
    const startTime = Math.floor(Date.now() / 1000) + 60; // Starts in 1 minute
    const endTime = startTime + (2 * 24 * 60 * 60); // Ends in 2 days

    const SeedSale = await hre.ethers.getContractFactory("SeedSale");
    const seedSale = await SeedSale.deploy(softCap, hardCap, startTime, endTime);

    await seedSale.waitForDeployment();
    const seedAddress = await seedSale.getAddress();
    console.log("SeedSale deployed to:", seedAddress);

    // 3. Deploy LiquidityLocker
    const LiquidityLocker = await hre.ethers.getContractFactory("LiquidityLocker");
    const locker = await LiquidityLocker.deploy();

    await locker.waitForDeployment();
    const lockerAddress = await locker.getAddress();
    console.log("LiquidityLocker deployed to:", lockerAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
