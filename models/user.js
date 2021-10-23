const { Schema, model } = require("mongoose");



const UserSchema = Schema({
  displayName: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: Array,
    default: ['admin'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  redirectUrl: {
    type: String,
    default: "/example",
  },
  settings: {
    type: Object,
    default: {
      layout: {
        style: "layout1",
        config: {},
      },
      customScrollbars: true,
      direction: "ltr", // rtl, ltr
      theme: {
        main: "default",
        navbar: "greyDark",
        toolbar: "mainThemeLight",
        footer: "mainThemeDark",
      },
    },
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uuid = _id;
  return user;
};

module.exports = model("User", UserSchema);
