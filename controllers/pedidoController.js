const pedidoService = require('../services/pedidoService');

const criarPedido = async (req, res) => {
  const { cliente_id, produto_id, quantidade } = req.body;

  try {
    await pedidoService.criarPedido(cliente_id, produto_id, quantidade);
    res.status(201).json({ mensagem: 'Pedido criado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar pedido.' });
  }
};

module.exports = {
  criarPedido,
};

