const express = require("express");
const router = express.Router();
const validator = require("./validator");
const service = require("./service");
const { uploadFile } = require("./../../utils/multer");

router.get("/:id", 
  service.getUserById
);

router.post(
  "/add",
  validator.addUserValidator(),
  service.validate,
  service.addUser
);

router.patch("/editUsername/:id", 
validator.editUsernameByIdValidator(),
service.validate,
service.editUsernameById
);

router.patch(
  "/updateProfilePic/:id",
  uploadFile.single("image"),
  validator.imageValidator(),
  service.updateProfilePic
  );

  router.delete("/delete/:id", 
    service.removeUserById
  );

module.exports = router;
