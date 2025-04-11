const validateName = (req, res, next) => {
    const { nome } = req.body;
  
    if (nome === undefined || nome.trim() === '') {
      return res.status(400).json({ message: 'O campo "nome" é obrigatório' });
    }
  
    next();
  };
  
  module.exports = { validateName };
  