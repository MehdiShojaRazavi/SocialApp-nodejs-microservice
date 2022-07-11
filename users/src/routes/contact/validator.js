const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  contactValidator(){
    return [
      check('firstName')
        .not()
        .isEmpty()
        .withMessage('firstName cant be empty'),
      check('lastName')
        .not()
        .isEmpty()
        .withMessage('lastName cant be empty'),
      check('email')
        .isEmail()
        .withMessage('email should be correct'),
    ]
  }
}