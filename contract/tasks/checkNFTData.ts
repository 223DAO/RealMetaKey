import { KEYSTORE_CONTRACT_ADDRESS } from '../deploy/contracts';
import { KeyStore } from '../plugins/types';
import { task } from "hardhat/config";

task('checkNFTData', 'Check NFT data')
  .addParam("id", "Token ID")
  .setAction(async (args, hre) => {
    // log config

    console.log('Network')
    console.log('  ', hre.network.name)
    console.log('Task Args')
    console.log(args)

    // compile

    await hre.run('compile')
    const signer = (await hre.ethers.getSigners())[0]

    const id = args.id
    console.log(`Token ID: ${id}`)

    const KeyStoreInstance = await hre.ethers.getContractAt('KeyStore', KEYSTORE_CONTRACT_ADDRESS, signer) as KeyStore

    let r = await KeyStoreInstance.nftData(id)

    console.log("NFT data: " + r)
  })
