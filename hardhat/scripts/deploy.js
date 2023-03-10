const hre = require("hardhat")
// const { Framework } = require("@superfluid-finance/sdk-core")
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

    // const sf = await Framework.create({
    //     chainId: (await provider.getNetwork()).chainId,
    //     provider
    // })

    
    // We get the contract to deploy
    const SuperApp = await hre.ethers.getContractFactory("SuperApp")
    //deploy the money router account using the proper host address and the address of the first signer
    const superApp = await SuperApp.deploy(
        process.env.SUPERTOKEN_ADDRESS,
        "0xEB796bdb90fFA0f28255275e16936D25d3418603",
        "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
        "0x2b42dA16aEa56A6477c235D0de443a9a413B83E6"
    )

    await superApp.deployed()

    console.log("superApp deployed to:", superApp.address)
    //0x7D376d9B33833CD2143B26DFcd00cb15f1aBbcfC
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})