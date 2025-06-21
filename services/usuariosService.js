const connection = require("../configs/dbConfiguration");

const create = async (usuario, senha) => {
  const query = "INSERT INTO usuarios (usuario, senha) VALUES (?, ?)";
  await (await connection).execute(query, [usuario, senha]);
};

const findAll = async () => {
  const [rows] = await (await connection).execute("SELECT * FROM usuarios");
  return rows;
};

const findByUsuario = async (usuario) => {
  const [rows] = await (await connection).execute(
    "SELECT * FROM usuarios WHERE usuario = ?",
    [usuario]
  );
  return rows[0];
};

module.exports = { create, findAll, findByUsuario };
