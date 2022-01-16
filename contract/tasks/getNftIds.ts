import { KEYSTORE_CONTRACT_ADDRESS } from '../deploy/contracts';
import { KeyStore } from '../plugins/types';
import { task } from "hardhat/config";

task('getNftIds', 'Get NFT IDs of user')
  .setAction(async (args, hre) => {
    // log config

    console.log('Network')
    console.log('  ', hre.network.name)
    console.log('Task Args')
    console.log(args)

    // compile

    await hre.run('compile')
    const signer = (await hre.ethers.getSigners())[0]

    const KeyStoreInstance = await hre.ethers.getContractAt('KeyStore', KEYSTORE_CONTRACT_ADDRESS, signer) as KeyStore

    let r = await KeyStoreInstance.getNftIds()

    console.log("NFT IDs: " + r)
  })
