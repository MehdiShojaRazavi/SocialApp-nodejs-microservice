const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  addCommentValidator(){
    return [
      check('text')
        .not()
        .isEmpty()
        .withMessage('text cant be empty'),
    ]
  }

}
  