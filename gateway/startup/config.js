const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = function(app){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  if (app.get('env') === 'development') app.use(morgan('tiny'));
}