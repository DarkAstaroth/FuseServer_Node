const { Router } = require("express");
const { check } = require("express-validator");
const {
  getSucursales,
  postSucursales,
} = require("../controllers/sucursalController");
const { usersPost } = require("../controllers/userController");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", getSucursales);
router.post("/", postSucursales);

module.exports = router;
