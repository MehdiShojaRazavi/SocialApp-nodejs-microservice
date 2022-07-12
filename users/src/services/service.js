const autoBind = require('auto-bind');
const {validationResult} = require('express-validator');
const User = require('../database/users');
const axios = require('axios');
const config = require('config');

module.exports = class {
  constructor(){
    autoBind(this);
    this.User = User;
  }
 
  validationBody(req,res){
    const result = validationResult(req);
    console.log(result);
    if(!result.isEmpty()){
      const errors = result.array();
      const data = [];
      errors.forEach(err => data.push(err.msg));

      this.response({
        res,
        status: 400,
        message: "validation error",
        data
      });
      return false;
    }
    return true;
  }

  validate(req,res,next){
    if(!this.validationBody(req,res)){
      return;
    }
    next();
  }

  response({res, message, status=200, data={}}){
    res.status(status).json({
      status,
      message,
      data
    });
  };
 
  async deleteAllCommentsByUserId_CommentService(userId, res){
    const commentsPort = config.get('commentsPort');
    await axios.delete(`http://localhost:${commentsPort}/manage/deleteAll/` + userId).then((resAxios)=>{
      res.resAxios = resAxios;
    }).catch((error)=>{
      return error.message; 
    });
  }
}; 