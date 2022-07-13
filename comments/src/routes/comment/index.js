const express = require("express");
const router = express.Router();
const validator = require("./validator");
const service = require("./service");

router.post("/add/:userId",
  validator.addCommentValidator(),
  service.validate,
  service.addComment
);

router.patch("/edit/:id",
validator.addCommentValidator(),
service.validate,
service.editCommentById
);

router.delete("/delete/:id", 
service.deleteCommentById
);

router.delete("/deleteall/:userId", 
service.deleteAllCommentsByUserId
);

router.get("/all/:userId", 
service.getAllCommentsByUserId
);

router.get("/top10Hashtags", 
service.getTop10Hshtags
);

router.get("/:id", 
service.getCommentById
);

module.exports = router;
