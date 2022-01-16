import { KEYSTORE_CONTRACT_ADDRESS } from '../deploy/contracts';
import { KeyStore } from '../plugins/types';
import { task } from "hardhat/config";

task('grantNFT', 'Grant NFT to receiver')
  .addParam("receiver", "receiver address")
  .addParam("type", "1 or 6")
  .addParam("number", "Number of NFT granted")
  .setAction(async (args, hre) => {
    // log config

    console.log('Network')
    console.log('  ', hre.network.name)
    console.log('Task Args')
    console.log(args)

    // compile

    await hre.run('compile')
    const signer = (await hre.ethers.getSigners())[0]

    const receiver = args.receiver
    console.log(`Receiver: ${receiver}`)
    const type = args.type
    console.log(`Type: ${type}`)
    const number = args.number
    console.log(`Number of NFT granted: ${number}`)

    const KeyStoreInstance = await hre.ethers.getContractAt('KeyStore', KEYSTORE_CONTRACT_ADDRESS, signer) as KeyStore

    await KeyStoreInstance.grantNft(receiver, type, number);

    console.log("Done")
  })
