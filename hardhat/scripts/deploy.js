const hre = require("hardhat")
const { Framework } = require("@superfluid-finance/sdk-core")
require("dotenv").config()

//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network specified in hardhat.config.js
//3) run: npx hardhat run scripts/deploy.js --network goerli
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const provider = new hre.ethers.providers.JsonRpcProvider(
        process.env.MUMBAI_URL
    )

    const sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider
    })

    
    // We get the contract to deploy
    const SuperApp = await hre.ethers.getContractFactory("SuperApp")
    //deploy the money router account using the proper host address and the address of the first signer
    const superApp = await SuperApp.deploy(
        process.env.SUPERTOKEN_ADDRESS,
        sf.settings.config.hostAddress,
        sf.settings.config.cfaV1Address
    )

    await superApp.deployed()

    console.log("superApp deployed to:", superApp.address)
    //0x76EdA1C989fF33fcbdff574afb925c82dbCc1a90
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})