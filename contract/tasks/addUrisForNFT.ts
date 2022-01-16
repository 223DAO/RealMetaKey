import { NFT_CONTRACT_ADDRESS } from '../deploy/contracts';
import { NFT } from '../plugins/types';
import { task } from "hardhat/config";

task('addURIForNFT', 'add URIs to NFT')
  .addParam("total", "Total redemption")
  .addParam("remain", "Remaining redemption")
  .addParam("uri", "Token URI")
  .setAction(async (args, hre) => {
    // log config

    console.log('Network')
    console.log('  ', hre.network.name)
    console.log('Task Args')
    console.log(args)

    // compile

    await hre.run('compile')
    const signer = (await hre.ethers.getSigners())[0]

    const total = args.total
    console.log(`Total redemption: ${total}`)
    const remain = args.remain
    console.log(`Remaining redemption: ${remain}`)
    const uri = args.uri
    console.log(`Token URI: ${uri}`)

    const NFTInstance = await hre.ethers.getContractAt('NFT', NFT_CONTRACT_ADDRESS, signer) as NFT

    await NFTInstance.setUri(total, remain, uri);

    console.log("Done")
  })
