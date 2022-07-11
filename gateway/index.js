const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const proxyOptions =  {
  parseReqBody: false,
  limit: "5mb",
  proxyErrorHandler: (err, res, next)=>
  {
    next(err);
  }
};
const config = require('config');
require('./startup/logging')();
app.use('/users', proxy('http://localhost:8001', proxyOptions));
app.use('/comments', proxy('http://localhost:8002', proxyOptions));
require('./startup/config')(app, express);
require('./src/middlewares/error')(app);

const port = config.get('port');
app.listen(port, () => console.log(`listening on port ${port}`));