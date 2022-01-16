
import { NFT_CONTRACT_ADDRESS } from '../deploy/contracts';
import { task } from "hardhat/config";
import { NFT } from '../plugins/types';

task('addAdminForNFT', 'add admin for NFT contract')
  .addParam("admin", "Admin address to add to NFT contract")
  .setAction(async (args, hre) => {
    // log config

    console.log('Network')
    console.log('  ', hre.network.name)
    console.log('Task Args')
    console.log(args)

    // compile

    await hre.run('compile')
    const signer = (await hre.ethers.getSigners())[0]

    const adminAddress = args.admin
    console.log(`admin address ${adminAddress}`)

    const NFTInstance = await hre.ethers.getContractAt('NFT', NFT_CONTRACT_ADDRESS, signer) as NFT

    await NFTInstance.addAdmin(adminAddress);

    console.log("Done")
  })
