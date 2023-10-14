// uniswap.js
const uniswapFactoryABI = require('../abis/uniswapFactoryABI.js'); 

const initUniswap = (web3, factoryAddress) => {
  const uniswapFactoryContract = new web3.eth.Contract(uniswapFactoryABI, factoryAddress);
  return { uniswapFactoryContract };
};

module.exports = { initUniswap };
