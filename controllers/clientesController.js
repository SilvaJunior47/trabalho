const clienteService = require('../services/clienteService');

const findAll = async (req, res) => {
    const clientes = await clienteService.findAll();
    return res.status(200).json(clientes);
};

const save = async (req, res) => {
    const result = await clienteService.save(req.body);
    return result ?
        res.status(200).json({ message: 'Cliente salvo com sucesso' }) :
        res.status(400).json({ error: 'Erro ao salvar cliente' });
};

const update = async (req, res) => {
    const result = await clienteService.update(req.body);
    return result ?
        res.status(200).json({ message: 'Cliente atualizado com sucesso' }) :
        res.status(400).json({ error: 'Erro ao atualizar cliente' });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const result = await clienteService.remove(id);
    return result ?
        res.status(200).json({ message: 'Cliente removido com sucesso' }) :
        res.status(400).json({ error: 'Erro ao remover cliente' });
};

module.exports = { findAll, save, update, remove };
