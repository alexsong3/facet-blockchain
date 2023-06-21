require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

const private_keys = [
  process.env.PRIVATE_KEY
]

const { INFURA_API_KEY, MNEMONIC, API_KEY_ETH } = process.env;

module.exports = {
  contracts_build_directory: "./public/contracts",
  api_keys: {
    etherscan: API_KEY_ETH,
  },
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // testnet: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
    //   network_id: 97,
    //   confirmations: 10,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
    sepolia: {
      provider: () => new HDWalletProvider({
        // mnemonic: {
        //   phrase: MNEMONIC
        // },
        privateKeys: private_keys,
        providerOrUrl: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
        numberOfAddress: 1
      }),
      network_id: 11155111,
      gas: 4465030,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
      network_id: 1,
      gas: 2000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13", // A version or constraint - Ex. "^0.5.0"
    }
  }
}