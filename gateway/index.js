const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const config = require('config');
const gatewayPort = config.get('gatewayPort');
const usersPort = config.get('usersPort');
const commentsPort = config.get('commentsPort');
const proxyOptions =  {
  parseReqBody: false,
  limit: "5mb",
  proxyErrorHandler: (err, res, next)=>
  {
    next(err);
  }
};
require('./startup/logging')();
app.use('/users', proxy(`http://localhost:${usersPort}`, proxyOptions));
app.use('/comments', proxy(`http://localhost:${commentsPort}`, proxyOptions));
require('./startup/config')(app, express);
require('./src/middlewares/error')(app);

app.listen(gatewayPort, () => console.log(`listening on port ${gatewayPort}`));