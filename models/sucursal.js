const { Schema, model } = require("mongoose");

const SucursalSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la sucursal es obligatorio"],
  },
  casa_matriz: {
    type: String,
    required: [true, "La casa matriz es obligatoria"],
  },
  zona: {
    type: String,
    required: [true, "La zona matriz es obligatoria"],
  },
  calle: {
    type: String,
    required: [true, "La calle es obligatoria"],
  },
  telefono_fijo: {
    type: String,
    required: [true, "El telefono es obligatoria"],
  },
  departamento: {
    type: String,
    required: [true, "El departamento es obligatoria"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

SucursalSchema.methods.toJSON = function () {
  const { _v, _id, ...sucursal } = this.toObject();
  sucursal.id = _id;
  return sucursal;
};

module.exports = model("Sucursale", SucursalSchema);
