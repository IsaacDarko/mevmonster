const { initWeb3 } = require("../utils/web3")

const rpcUrl = process.env.ETHEREUM_NODE_URL_HTTP;
const web3 = initWeb3(rpcUrl);

// ADD YOUR CUSTOM TOKEN PAIRS HERE!!!
const tokenPairs = [
    {
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'MKR',
        outputTokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        inputAmount: web3.utils.toWei('1', 'ETHER')
    },

    {
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'DAI',
        outputTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        inputAmount:web3.utils.toWei('1', 'ETHER')
    },

    {
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'KNC',
        outputTokenAddress: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
        inputAmount: web3.utils.toWei('1', 'ETHER')
    },

    {
        inputTokenSymbol: 'ETH',
        inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        outputTokenSymbol: 'LINK',
        outputTokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
        inputAmount: web3.utils.toWei('1', 'ETHER')
    }
]  

module.exports = tokenPairs;
