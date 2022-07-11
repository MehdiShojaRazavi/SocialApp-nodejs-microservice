const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  addUserValidator(){
    return [
      check('username')
        .not()
        .isEmpty()
        .withMessage('username cant be empty'),
      check('firstName')
        .not()
        .isEmpty()
        .withMessage('FirstName cant be empty'),
      check('lastName')
        .not()
        .isEmpty()
        .withMessage('LastName cant be empty'),
      check('email')
        .isEmail()
        .withMessage('Email should be correct'),
    ]
  }

  imageValidator(){
    return [
      check('image').custom((value, {req, res}) =>{
        if(Object.keys(req.file).length == 0) 
          return res.status(400).json({res, status:400, success: false, message: "please select a picture"});
        const ext = path.extname(req.file.originalname);
        const exts = ['.jpg', '.png', '.jpeg', '.gif', '.webp'];
        if (!exts.includes(ext)) 
          return res.status(400).json({res, status:400, success: false, message: "The uploaded image format is incorrect"});
        const maxSize = 2 * 1024 * 1024; //2MB
        if (req.file.size > maxSize) 
          return res.status(400).json({res, status:400, success: false, message: "Please select an image with a size of less than 2 MB"});
        return true
      })
      
    ]
  }

  editUsernameByIdValidator(){
    return [
      check('username')
        .not()
        .isEmpty()
        .withMessage('username cant be empty'),
    ]
  }




}