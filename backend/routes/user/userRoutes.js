const express = require("express");
const { registerValidations } = require("../../validations/userValidations");
const { validationResult } = require("express-validator");
const { register } = require("../../controllers/user/userController");
const router = express.Router();
router.post("/register", registerValidations, register);

module.exports = router;
