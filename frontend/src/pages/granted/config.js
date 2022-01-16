export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const url =
  "https://eth-kovan.alchemyapi.io/v2/D5mZn4gVHMiQUIMSKn1HDXAoHfjnn48P";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
