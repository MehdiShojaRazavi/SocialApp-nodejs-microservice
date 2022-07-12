const autoBind = require('auto-bind');
const {validationResult} = require('express-validator');
const Comment = require('../database/comments');
const axios = require('axios');
const config = require('config');
const usersPort = config.get('usersPort');

module.exports = class {
  constructor(){
    autoBind(this);
    this.Comment = Comment;
  }
 
  validationBody(req,res){
    const result = validationResult(req);
    if(!result.isEmpty()){
      const errors = result.array();
      const data = [];
      errors.forEach(err => data.push(err.msg));

      this.response({
        res,
        status: 400,
        success : false,
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

  async getUsernameFromUserService(obj, res){
    const {userId} = obj.data[0];
    await axios.get(`http://localhost:${usersPort}/manage/` + userId).then((resAxios)=>{
      const {username} = resAxios.data.data[0];
      obj.username = username;
      obj = obj.data.map(v=> delete(v.userId))

    }).catch((error)=>{
      return error.message;
    });

  };

};