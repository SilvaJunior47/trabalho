const connection = require("../configs/dbConfiguration");

const findAll = async () => {
  const [clientes] = await (await connection).execute("SELECT * FROM clientes");
  return clientes;
};

const save = async (cliente) => {
  const query =
    "INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)";
  const [result] = await (await connection).execute(query, [
    cliente.nome,
    cliente.sobrenome,
    cliente.email,
    cliente.idade,
  ]);
  return result.affectedRows === 1;
};

const update = async (cliente) => {
  const query =
    "UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?";
  const [result] = await (await connection).execute(query, [
    cliente.nome,
    cliente.sobrenome,
    cliente.email,
    cliente.idade,
    cliente.id,
  ]);
  return result.affectedRows === 1;
};

const remove = async (id) => {
  const query = "DELETE FROM clientes WHERE id = ?";
  const [result] = await (await connection).execute(query, [id]);
  return result.affectedRows === 1;
};

module.exports = { findAll, save, update, remove };
