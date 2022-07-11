const express = require("express");
const router = express.Router();
const validator = require("./validator");
const service = require("./service");

router.patch("/edit/:id",
  validator.contactValidator(),
  service.validate,
  service.editContactByUserId
);

router.get("/:id",
  service.getContactByUserId
);

router.delete("/delete/:id", 
  service.deleteContactByUserId
);

module.exports = router;
