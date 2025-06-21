const validatePrice = (req, res, next) => {
  const { preco } = req.body;
  if (preco <= 0) {
    return res.status(400).json({ error: "O preço deve ser positivo" });
  }
  next();
};

module.exports = { validatePrice };
