// index.js
const dotenv = require('dotenv');

const { app, startServer } = require('./server');
const { monitorPrice } = require('./pricers/priceMonitor');
dotenv.config();


let priceMonitor


const PORT = process.env.PORT || 5000 ;


const startMonitoring = () => {
  const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 2000;
  setInterval(async () => {
    await monitorPrice();
  }, POLLING_INTERVAL);
};

startServer(PORT);
startMonitoring();