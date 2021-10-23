const { Router } = require("express");
const { check } = require("express-validator");
const { usersPost } = require("../controllers/userController");
const { validarFields } = require("../middlewares/validate-fields");

const router = Router();

router.post("/register", usersPost);

module.exports = router;
