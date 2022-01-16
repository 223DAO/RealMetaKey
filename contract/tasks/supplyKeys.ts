import { KEYSTORE_CONTRACT_ADDRESS } from '../deploy/contracts';
import { KeyStore } from '../plugins/types';
import { task } from "hardhat/config";
import path from "path";
import { Promise } from 'bluebird'

task('supplyKeys', 'Supply keys to key store')
  .addParam("keylist", "Json file of keys")
  .setAction(async (args, hre) => {
    // log config

    console.log('Network')
    console.log('  ', hre.network.name)
    console.log('Task Args')
    console.log(args)

    // compile

    await hre.run('compile')
    const signer = (await hre.ethers.getSigners())[0]

    const file = path.resolve(args.keylist)
    console.log(`read keylist from file ${file}`)

    const list = require(file).map((entry: any) => entry.key)
    console.log(`got ${list.length} keys`)

    const KeyStoreInstance = await hre.ethers.getContractAt('KeyStore', KEYSTORE_CONTRACT_ADDRESS, signer) as KeyStore

    await KeyStoreInstance.supplyKeys(list)

    console.log("Done")
  })
