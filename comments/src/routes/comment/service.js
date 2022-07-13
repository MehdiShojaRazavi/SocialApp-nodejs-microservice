const service = require("../../services/service.js");
const utils = require("./../../utils/utils");
const {hahtagAndMentionSeparator} = require('./../../utils/utils');

module.exports = new (class extends service {

  async addComment(req, res) {
    const userId = req.params.userId;
    const data = req.body;
    const BlackListFields = [""];
    utils.deleteInvalidPropertyInObject(data, BlackListFields);

    const { text } = data;
    const {hashtags,mentions} = hahtagAndMentionSeparator(text);

    await this.Comment.create({
      id: utils.idGenerator(),
      text,
      timestamp: Math.floor(Date.now()/1000),
      userId,
      hashtags,
      mentions
    },
    (err, data) => {
      if (err) return this.response({res, status: 500, message: "InternalServerError " + err.message });
      if (data.length < 1) return this.response({ res, status: 400, message: "Not found"});

      this.response({ res, status: 200, message: "Comment added successfully"});
    });
  }

  async deleteCommentById(req, res) {

    const id = req.params.id;
    await this.Comment.deleteOne(
      {id}
    ).then((deleteRes)=>{
      if( deleteRes.deletedCount === 0) 
        return this.response({res, status: 400, message: "not found" });
      this.response({res, status: 200, message: "Comment deleted successfully"});
    }).catch((error)=>{
      return this.response({res, status: 500, message: "InternalServerError:" + error.message });
    });

  }

  async deleteAllCommentsByUserId(req, res) {

    const userId = req.params.userId;
    await this.Comment.deleteMany(
      {userId}
    ).then((deleteRes)=>{
        console.log(deleteRes);
        console.log( req.params.userId);
      if( deleteRes.deletedCount === 0) 
        return this.response({res, status: 400, message: "not found" });
      this.response({res, status: 200, message: "All comments of this user deleted successfully"});
    }).catch((error)=>{
      return this.response({res, status: 500, message: "InternalServerError:" + error.message });
    });
  }
 
  async editCommentById(req, res) {
    const data = req.body;
    const BlackListFields = [""];
    utils.deleteInvalidPropertyInObject(data, BlackListFields);

    const {text} = data;
    const {hashtags,mentions} = hahtagAndMentionSeparator(text);
    const id = req.params.id;

    await this.Comment.updateOne(
        { id },
        { $set: {text, hashtags, mentions},
      }).then((updateRes)=>{
        if( updateRes.matchedCount === 0) 
          return this.response({res, status: 400, message: "not found" });
        this.response({res, status: 200, message: "Comment edited successfully"});
      }).catch((error)=>{
        return this.response({res, status: 500, message: "InternalServerError:" + error.message });
      });
  }

  async getCommentById(req, res) {
    const id = req.params.id;
    
    await this.Comment.aggregate([
      {$match: {id}},
      {$project: {userId:1, text:1, hashtags:1, mentions:1, _id:0}}
    ], 
      async (err, data) => {
        let commentObj = {};
        if (err) return this.response({ res, status: 500, message: "InternalServerError " + err.message });
        if (data.length < 1) return this.response({ res, status: 400, message: "Comment not found" });
        
        commentObj.data = data;
        await this.getUsernameFromUserService(commentObj, res);

        this.response({ res, status: 200, message: "ok", data: commentObj });
    });
  }

  async getAllCommentsByUserId(req, res) {
    const userId = req.params.userId;

    await this.Comment.aggregate([
      {$match: {userId}},
      {$project: {userId:1, text:1, hashtags:1, mentions:1, _id:0}}
    ], 
      async(err, data) => {
        if (err) return this.response({ res, status: 500, message: "InternalServerError " + err.message });
        if (data.length < 1) return this.response({ res, status: 400, message: "Not found" });
        
        let commentObj = {};
        commentObj.data = data;
        await this.getUsernameFromUserService(commentObj, res);


        this.response({ res, status: 200, message: "ok", data: commentObj });
    });
  }

  async getTop10Hshtags(req, res) {
    const arrHashtags = [];
    arrHashtags.push(1);
    arrHashtags.push(1);
    console.log(arrHashtags);

    this.Comment.aggregate(
      [
        { $unwind: "$hashtags" },
        { $group: { _id: "$hashtags", count: { $sum: 1 } } },
        { $project: { count: { $add: ["$count", 1] }, tag: "$_id" } },
        { $project: { _id: 0 } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ],
      async (err, data) => {
        if (err)
          return this.response({
            res,
            status: 500,
            message: "InternalServerError " + err.message,
          });
        if (data.length < 1)
          return this.response({ res, status: 400, message: "Not found" });

        this.response({
          res,
          status: 200,
          message: "ok",
          data: data,
        });
      }
    );
  }

})();
