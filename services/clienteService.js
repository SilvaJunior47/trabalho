const connection = require('../db/connection');

const criarCliente = async (nome, sobrenome, idade) => {
    const [result] = await connection.execute(
        'INSERT INTO clientes (nome, sobrenome, idade) VALUES (?, ?, ?)',
        [nome, sobrenome, idade],
    );
    return { id: result.insertId, nome, sobrenome, idade };
};

const listarClientes = async () => {
    const [clientes] = await connection.execute('SELECT * FROM clientes');
    return clientes;
};

const buscarClientePorId = async (id) => {
    const [clientes] = await connection.execute(
        'SELECT * FROM clientes WHERE id = ?',
        [id],
    );
    return clientes[0];
};

module.exports = {
    criarCliente,
    listarClientes,
    buscarClientePorId,
};
