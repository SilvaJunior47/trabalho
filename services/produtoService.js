// Arquivo de configura��o do banco de dados 
const connection = require("../configs/dbConfiguration");

const findAll = async () => {
    const [produtos] = await (await connection).execute("SELECT * FROM produtos");
    return produtos;
};

const save = async (produto) => {
    const query = "INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)";
    const [result] = await (await connection).execute(query, [
        produto.nome,
        produto.descricao,
        produto.preco,
    ]);
    return result.affectedRows === 1;
};

const update = async (produto) => {
    const query = "UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?";
    const [result] = await (await connection).execute(query, [
        produto.nome,
        produto.descricao,
        produto.preco,
        produto.id,
    ]);
    return result.affectedRows === 1;
};

const remove = async (id) => {
    const query = "DELETE FROM produtos WHERE id = ?";
    const [result] = await (await connection).execute(query, [id]);
    return result.affectedRows === 1;
};

module.exports = { findAll, save, update, remove };
