const validateFamilyName = (req, res, next) => {
    const { sobrenome } = req.body;
  
    if (sobrenome === undefined || sobrenome.trim() === '') {
      return res.status(400).json({ message: 'O campo "sobrenome" é obrigatório' });
    }
  
    next();
  };
  
  module.exports = { validateFamilyName };
  