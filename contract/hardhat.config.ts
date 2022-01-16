import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat'
import 'hardhat-deploy';
import { HardhatUserConfig } from "hardhat/config";

// admin account for test deploy on goerli
let adminPrivateKeyTest = ''
try {
  adminPrivateKeyTest = require('./secrets/admin-account-test.json')[0].privateKey
} catch (e) {
  console.error(e)
}

const rpcMumbai = 'https://matic-mumbai.chainstacklabs.com' // from MetaMask

const config: HardhatUserConfig = {
  // Your type-safe config goes here
  solidity: {
    version: "0.8.0"
  },
  defaultNetwork: 'hardhat',
  networks: {
    // for test
    mumbai: {
      url: rpcMumbai,
      accounts: [
        adminPrivateKeyTest
      ]
    },
    hardhat: {},
  },
  typechain: {
    outDir: 'plugins/types',
    // target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    // externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  namedAccounts: {
    deployer: 0,
  }
};

export default config;


// Network stuff for later

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// export default {
//   solidity: "0.8.4",
//   // networks: {
//   //   hardhat: {
//   //     // accounts: {
//   //     //   accountsBalance: "10",
//   //     // },
//   //     forking: {
//   //       enabled: true,
//   //       url: "https://xdai-archive.blockscout.com/",
//   //       blockNumber: 17615631, //17615631
//   //     },
//   //   },
//   // },
// };
