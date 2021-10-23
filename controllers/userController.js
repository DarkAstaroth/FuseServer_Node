const { request, response } = require("express");
const bcryptj = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const usersPost = async (req = request, res = response) => {
  const { displayName, email, password, role } = req.body;

  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({
      msg: `El correo ${email} ya esta registrado`,
    });
  }

  const user = new User({ displayName, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptj.genSaltSync();
  user.password = bcryptj.hashSync(password, salt);

  // Guardar en base de datos

  await user.save();

  const created = await User.findOne({ email: user.email });

  const access_token = await generateJWT(created._id);
  const data = {
    redirectUrl: created.redirectUrl,
    password: user.password,
    role: user.role,
    data: {
      displayName: user.displayName,
      photoUrl: user.img,
      email: user.email,
      settings: user.settings,
    },
  };
  res.json({ access_token, user: data });
};

module.exports = {
  usersPost,
};
