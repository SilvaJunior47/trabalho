const validatePrice = (req, res, next) => {
  const { preco } = req.body;
  
  // Verifica se o preço foi fornecido
  if (preco === undefined || preco === null) {
    return res.status(400).json({ 
      error: "Preço é obrigatório" 
    });
  }

  // Converte para número se for string
  const precoNum = parseFloat(preco);
  
  // Verifica se é um número válido
  if (isNaN(precoNum)) {
    return res.status(400).json({ 
      error: "Preço deve ser um número válido" 
    });
  }

  // Verifica se é positivo
  if (precoNum <= 0) {
    return res.status(400).json({ 
      error: "Preço deve ser maior que zero" 
    });
  }

  // Atualiza o preço no body com o valor numérico
  req.body.preco = precoNum;
  
  next();
};

module.exports = { validatePrice };