const service = require("../../services/service.js");
const utils = require('../../utils/utils');

module.exports = new (class extends service {
  async editContactByUserId(req, res) {
    const data = req.body;
    const BlackListFields = [""]
    utils.deleteInvalidPropertyInObject(data, BlackListFields);

    const userId = req.params.id;

    const {firstName, lastName, email} = data;
    const resultCheckEmail = await utils.checkUniqueItem({ 'contact.email': email, id:{$ne: userId}});
    if (resultCheckEmail) 
      return this.response({res, status: 400, message: "Email already exist" });

    await this.User.updateOne(
      {id : userId},
      {$set : {
        'contact.firstName': firstName,
        'contact.lastName': lastName,
        'contact.email': email,
      }
    }).then((updateRes)=>{
      if( updateRes.matchedCount === 0) 
        return this.response({res, status: 400, message: "not found" });
      this.response({res, status: 200, message: "User Contact deleted successfully"});
    }).catch((error)=>{
      return this.response({res, status: 500, message: "InternalServerError:" + error.message });
    });    
  }

  async getContactByUserId(req, res) {
    const userId = req.params.id;
  
    await this.User.aggregate([{ $match: {id : userId} }, {$project: {contact:1, _id:0}}], 
      (err, data) => {
      if (err) return this.response({res, status: 500, message: "(Internal server error)" + err.message });
      if (data.length < 1) return this.response({res, status: 400, message: "User not found" });
      this.response({ res, status: 200, message: "ok", data });
    });
  }

  async deleteContactByUserId(req, res, next){ 
    const userId = req.params.id;

    await this.User.updateOne(
      {id : userId}, 
      {$set : {
          'contact.firstName': '',
          'contact.lastName': '',
          'contact.email': '',
        }
    }).then((updateRes)=>{
      if( updateRes.matchedCount === 0) 
        return this.response({res, status: 400, message: "not found" });
      this.response({res, status: 200, message: "User Contact deleted successfully"});
    }).catch((error)=>{
      return this.response({res, status: 500, message: "InternalServerError:" + error.message });
    });
  }
})();
