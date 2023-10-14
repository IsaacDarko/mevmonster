const tokenPairs = require('./tokenpairs');
const moment = require('moment-timezone');
const dotenv = require('dotenv');
const uniswapExchangeABI = require('../abis/uniswapExchangeABI.js'); 
const { initWeb3 } = require('../utils/web3');
const { initUniswap } = require('../services/uniswap');
const { initKyber } = require('../services/kyber');

dotenv.config();

let priceMonitor

let monitoringPrice = false;


const RPC_URL = process.env.ETHEREUM_NODE_URL_HTTP;
const UNISWAP_FACTORY_ADDRESS = '0xc0a47dfe034b400b47bdad5fecda2621de6c4d95';
const KYBER_RATE_ADDRESS = '0x96b610046d63638d970e6243151311d8827d69a5';

const web3 = initWeb3(RPC_URL);
const { uniswapFactoryContract } = initUniswap(web3, UNISWAP_FACTORY_ADDRESS);
const { kyberRateContract } = initKyber(web3, KYBER_RATE_ADDRESS);




const checkPair = async(args) => {
    // Function to check prices on both Uniswap and Kyber for a given token pair
    const { inputTokenSymbol, inputTokenAddress, outputTokenSymbol, outputTokenAddress, inputAmount } = args

    const exchangeAddress = await uniswapFactoryContract.methods.getExchange(outputTokenAddress).call()

    const exchangeContract = new web3.eth.Contract(uniswapExchangeABI, exchangeAddress)

    const uniswapResult = await exchangeContract.methods.getEthToTokenInputPrice(inputAmount).call();

    let kyberResult = await kyberRateContract.methods.getExpectedRate(inputTokenAddress, outputTokenAddress, inputAmount, true).call().catch((err) => { return; });

    console.table([{
        'Input Token': inputTokenSymbol,
        'Output Token': outputTokenSymbol,
        'Input Amount': web3.utils.fromWei(inputAmount, 'Ether'),
        'Uniswap Return': web3.utils.fromWei(uniswapResult, 'Ether'),
        //'Kyber Expected Rate': web3.utils.fromWei(kyberResult.expectedRate, 'Ether'),
        //'Kyber Min Return': web3.utils.fromWei(kyberResult.slippageRate, 'Ether'),
        'Timestamp': moment().tz('Africa/Accra').format('ha z'),
    }])
}

  
async function monitorPrice() {
    // Function to periodically monitor token prices
    if(monitoringPrice) {
        return
      }

    monitoringPrice = true;

    
    try {        
    // ADD YOUR CUSTOM TOKEN PAIRS HERE
    tokenPairs.forEach((pair) => {
        checkPair(pair)
    })
    } catch (error) {
      console.error(error)
      monitoringPrice = false;
      return
    }    

    monitoringPrice = false  
}
  
module.exports = { monitorPrice, checkPair};