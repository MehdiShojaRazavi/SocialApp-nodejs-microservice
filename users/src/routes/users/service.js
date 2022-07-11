const service = require("../../services/service.js");
const utils = require("../../utils/utils");
const path = require('path');

module.exports = new (class extends service {

  async getUserById(req, res) {
    const userId = req.params.id;

    await this.User.aggregate([{ $match:{ id:userId }}, {$project: { username:1, contact:1, profilePictureUrl:1, _id:0 }}],       
      (err, data) => {
      if (err) return this.response({res, status: 500, message: err.message });
      if (data.length < 1) return this.response({res, status: 400, message: "User not found" });
      this.response({res, status: 200, message: "ok", data });
    });
  }

  async addUser(req, res) {
    const data = req.body;
    const BlackListFields = [""];
    utils.deleteInvalidPropertyInObject(data, BlackListFields);
    
    const { firstName, lastName, email, username } = data;

    const resultCheckUsername = await utils.checkUniqueItem({ username: username });
    const resultCheckEmail = await utils.checkUniqueItem({ 'contact.email': email });
    if (resultCheckUsername || resultCheckEmail) 
      return this.response({res, status: 400, message: "Username or email already exist" });

    await this.User.create(
    {
      'id' : utils.idGenerator(),
      'username' : username,
      'contact.firstName' : firstName,
      'contact.lastName' : lastName,
      'contact.email': email
    },
    (err, data) => {
      if (err) return this.response({ res, status: 500, message: err.message });
      this.response({ res, status: 200, message: "User added successfully"});
    }
    );
  }

  async updateProfilePic(req, res) {
    const userId = req.params.id;
    console.log(req.body.profilePictureUrl, req.body.filename, req.params.id)
    const imageProfile = path.join(req.body.profilePictureUrl, req.body.filename)

    await this.User.updateOne(
        { id: userId },
        { $set: { profilePictureUrl: imageProfile }
    }).then((updateRes)=>{
      if( updateRes.matchedCount === 0) 
        return this.response({res, status: 400, message: "not found" });
      this.response({res, status: 200, message: "Profile Picture Updated successfully"});
    }).catch((error)=>{
      return this.response({res, status: 500, message: "InternalServerError:" + error.message });
    });
  }

  async removeUserById(req, res, next) {
    const userId = req.params.id;

    await this.User.deleteOne(
        { id: userId }
    ).then(async(deleteRes)=>{
      if( deleteRes.deletedCount === 0) 
        return this.response({res, status: 400, message: "not found" });
      await this.deleteAllCommentsByUserId_CommentService(userId, res)
      this.response({res, status: 200, message: "User deleted successfully"});
    }).catch((error)=>{
      return this.response({res, status: 500, message: "InternalServerError:" + error.message });
    });
  }

  async editUsernameById(req, res, next) {
    const data = req.body;
    const BlackListFields = [""]
    utils.deleteInvalidPropertyInObject(data, BlackListFields);

    const userId = req.params.id;
    const {username} = data;

    const resultCheckEmail = await utils.checkUniqueItem({ 'username': username, id:{$ne: userId}});
    if (resultCheckEmail) 
      return this.response({res, status: 400, message: "Email already exist" });

    await this.User.updateOne(
        { id: userId },
        { $set: { username },
    }).then((updateRes)=>{
      if( updateRes.matchedCount === 0) 
        return this.response({res, status: 400, message: "not found" });
      this.response({res, status: 200, message: "Username edited successfully"});
    }).catch((error)=>{
      return this.response({res, status: 500, message: "InternalServerError:" + error.message });
    });
  }
})();
