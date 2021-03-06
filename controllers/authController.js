const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { default: jwtDecode } = require("jwt-decode");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // verificar si el Email existe
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / email  no son correctos - correo",
      });
    }

    // verificar el password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Genera el JWT
    const access_token = await generateJWT(user.id);

    const data = {
      redirectUrl: user.redirectUrl,
      password: user.password,
      role: user.role,
      data: {
        displayName: user.displayName,
        photoUrl: user.img,
        email: user.email,
        settings: user.settings,
      },
    };
    res.status(200).json({ access_token, user: data });
  } catch (error) {
    throw new Error(error);
  }
};

const loginWithToken = async (req = resquest, res = response) => {
  const { access_token } = req.body;
  try {
    const decode = jwtDecode(access_token);
    const user = await User.findOne({ _id: decode.uid });

    const data = {
      redirectUrl: user.redirectUrl,
      password: user.password,
      role: user.role,
      data: {
        displayName: user.displayName,
        photoUrl: user.img,
        email: user.email,
        settings: user.settings,
      },
    };
    res.status(200).json({ access_token, user: data });
  } catch (error) {
    res.status(400).json({ msg: "Token no valido" });
  }
};

module.exports = {
  login,
  loginWithToken,
};
