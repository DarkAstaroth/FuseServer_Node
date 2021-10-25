const { request, response } = require("express");
const Sucursal = require("../models/sucursal");

const getSucursales = async (req = request, res = response) => {
  const query = { status: true };

  const [total, sucursales] = await Promise.all([
    Sucursal.count(),
    Sucursal.find(),
  ]);

  res.json(sucursales);
};

const postSucursales = async (req = request, res = response) => {
  const { nombre, casa_matriz, zona, calle, telefono_fijo, departamento } =
    req.body;
  const sucursal = new Sucursal({
    nombre,
    casa_matriz,
    zona,
    calle,
    telefono_fijo,
    departamento,
  });

  await sucursal.save();

  res.json(sucursal);
};

module.exports = {
  getSucursales,
  postSucursales,
};
