// kyber.js
const kyberNetworkABI = require('../abis/kyberNetworkABI'); // (Abbreviated for brevity)

const initKyber = (web3, kyberAddress) => {
  const kyberRateContract = new web3.eth.Contract(kyberNetworkABI, kyberAddress);
  return { kyberRateContract };
};

module.exports = { initKyber };
