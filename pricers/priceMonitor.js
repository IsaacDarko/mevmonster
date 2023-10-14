const tokenPairs = require('./tokenpairs');
const moment = require('moment-timezone');
const dotenv = require('dotenv');
const uniswapExchangeABI = require('../abis/uniswapExchangeABI.js'); 
const { initWeb3 } = require('../utils/web3');
const { initUniswap } = require('../services/uniswap');
const { initKyber } = require('../services/kyber');

dotenv.config();

let priceMonitor


const RPC_URL = process.env.ETHEREUM_NODE_URL_HTTP;
const UNISWAP_FACTORY_ADDRESS = '0xc0a47dfe034b400b47bdad5fecda2621de6c4d95';
const KYBER_RATE_ADDRESS = '0x96b610046d63638d970e6243151311d8827d69a5';

const web3 = initWeb3(RPC_URL);
const { uniswapFactoryContract } = initUniswap(web3, UNISWAP_FACTORY_ADDRESS);
const { kyberRateContract } = initKyber(web3, KYBER_RATE_ADDRESS);

let monitoringPrice = false;

const checkPair = async(args) => {
    // Function to check prices on both Uniswap and Kyber for a given token pair
    const { inputTokenSymbol, inputTokenAddress, outputTokenSymbol, outputTokenAddress, inputAmount } = args

    const exchangeAddress = await uniswapFactoryContract.methods.getExchange(outputTokenAddress).call()
    const exchangeContract = new web3.eth.Contract(uniswapExchangeABI, exchangeAddress)

    const uniswapResult = await exchangeContract.methods.getEthToTokenInputPrice(inputAmount).call()
    let kyberResult = await kyberRateContract.methods.getExpectedRate(inputTokenAddress, outputTokenAddress, inputAmount, true).call()

    console.table([{
        'Input Token': inputTokenSymbol,
        'Output Token': outputTokenSymbol,
        'Input Amount': web3.utils.fromWei(inputAmount, 'Ether'),
        'Uniswap Return': web3.utils.fromWei(uniswapResult, 'Ether'),
        'Kyber Expected Rate': web3.utils.fromWei(kyberResult.expectedRate, 'Ether'),
        'Kyber Min Return': web3.utils.fromWei(kyberResult.slippageRate, 'Ether'),
        'Timestamp': moment().tz('Africa/Accra').format('ha z'),
    }])
  }

  
  async function monitorPrice() {
    // Function to periodically monitor token prices
    if(monitoringPrice) {
        return
      }
      console.log(RPC_URL)
      console.log("Checking prices...")
      monitoringPrice = true
    
    try {
        
    // ADD YOUR CUSTOM TOKEN PAIRS HERE!!!

    await checkPair({
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'MKR',
        outputTokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        inputAmount: web3.utils.toWei('1', 'ETHER')
      })
  
      await checkPair({
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'DAI',
        outputTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        inputAmount: web3.utils.toWei('1', 'ETHER')
      })
  
      await checkPair({
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'KNC',
        outputTokenAddress: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
        inputAmount: web3.utils.toWei('1', 'ETHER')
      })
  
      await checkPair({
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'LINK',
        outputTokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
        inputAmount: web3.utils.toWei('1', 'ETHER')
      })
            
            
            

    } catch (error) {
      console.error(error)
      monitoringPrice = false
      clearInterval(priceMonitor)
      return
    }
    
      
    
      monitoringPrice = false
    
  }
  
 module.exports = { monitorPrice, checkPair};