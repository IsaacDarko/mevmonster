// web3.js
const Web3 = require('web3');

const initWeb3 = (rpcUrl) => {
  return new Web3(rpcUrl);
};

module.exports = { initWeb3 };
