// services/usuarioService.js
const connection = require("../configs/dbConfiguration");
const bcrypt = require("bcrypt");

async function create(usuario, senha) {
  // hash da senha
  const hash = await bcrypt.hash(senha, 10);
  const query = "INSERT INTO usuarios (usuario, senha) VALUES (?, ?)";
  await (await connection).execute(query, [usuario, hash]);
}

async function findAll() {
  const [rows] = await (await connection).execute("SELECT * FROM usuarios");
  return rows;
}

async function findByUsuario(usuario) {
  const [rows] = await (await connection).execute(
    "SELECT * FROM usuarios WHERE usuario = ?",
    [usuario]
  );
  return rows[0];
}

module.exports = { create, findAll, findByUsuario };
