// Arquivo de configura��o do banco de dados 
const produtoService = require('../services/produtoService');

const findAll = async (req, res) => {
    const produtos = await produtoService.findAll();
    return res.status(200).json(produtos);
};

const save = async (req, res) => {
    const result = await produtoService.save(req.body);
    return result
        ? res.status(200).json({ message: 'Produto salvo com sucesso!' })
        : res.status(400).json({ error: 'Erro ao salvar produto' });
};

const update = async (req, res) => {
    const result = await produtoService.update(req.body);
    return result
        ? res.status(200).json({ message: 'Produto atualizado com sucesso!' })
        : res.status(400).json({ error: 'Erro ao atualizar produto' });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const result = await produtoService.remove(id);
    return result
        ? res.status(200).json({ message: 'Produto removido com sucesso!' })
        : res.status(400).json({ error: 'Erro ao remover produto' });
};

module.exports = { findAll, save, update, remove };
