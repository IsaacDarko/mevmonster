// server.js
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);


const PORT = process.env.PORT || 5000

const startServer = (PORT) => {
  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
};



module.exports = { app, startServer };