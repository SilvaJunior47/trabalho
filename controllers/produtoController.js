const produtoService = require("../services/produtoService");

const save = async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    
    // Validações básicas
    if (!nome || nome.length < 3 || nome.length > 255) {
      return res.status(400).json({ error: "Nome deve ter entre 3 e 255 caracteres" });
    }
    
    if (!descricao || descricao.length < 3 || descricao.length > 255) {
      return res.status(400).json({ error: "Descrição deve ter entre 3 e 255 caracteres" });
    }

    const produto = await produtoService.save({ nome, descricao, preco });
    res.status(201).json(produto);
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const findAll = async (req, res) => {
  try {
    const produtos = await produtoService.findAll();
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await produtoService.findById(id);
    
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    
    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    
    const produto = await produtoService.update(id, { nome, descricao, preco });
    
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    
    res.json(produto);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await produtoService.remove(id);
    
    if (!success) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover produto:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// IMPORTANTE: Certifique-se de exportar todas as funções
module.exports = {
  save,
  findAll,
  findById,
  update,
  remove
};