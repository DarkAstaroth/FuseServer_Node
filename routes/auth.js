const { Router } = require("express");
const { check } = require("express-validator");
const { login, loginWithToken } = require("../controllers/authController");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El Email es obligatorio").not().isEmpty(),
    check("email", "No es email valido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
  ],
  login
);
router.post("/access-token", loginWithToken);

module.exports = router;
