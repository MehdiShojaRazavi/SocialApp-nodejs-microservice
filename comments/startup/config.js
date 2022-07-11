const config = require('config');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = function(app, express){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  if (app.get('env') === 'development') app.use(morgan('tiny'));
}