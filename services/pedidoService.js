const db = require("../database/connection");

const criarPedido = async (cliente_id, produto_id, quantidade) => {
  const sql = "INSERT INTO pedidos (cliente_id, produto_id, quantidade) VALUES (?, ?, ?)";
  const values = [cliente_id, produto_id, quantidade];
  await db.execute(sql, values);
};

module.exports = {
  criarPedido,
};
