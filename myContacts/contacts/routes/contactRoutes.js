const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactform,
} = require("../controllers/contactController.js");

router.route("/")
.get(getAllContacts);

router.route("/add")
.get(addContactform)
.post(createContact);

router.route("/:id")
.get(getContact)
.put(updateContact)
.delete(deleteContact);


module.exports = router;

