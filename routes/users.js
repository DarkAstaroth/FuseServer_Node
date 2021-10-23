const { Router } = require("express");
const { check } = require("express-validator");
const { usersPost } = require("../controllers/userController");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/register",
  [
    check("displayName", "El nombre el obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 8,
    }),
    check("email", "El correo no es valido").isEmail(),
    validateFields,
  ],
  usersPost
);

module.exports = router;
