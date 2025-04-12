const validateAge = (req, res, next) => {
    const { idade } = req.body;
  
    if (idade === undefined || idade === "") {
      return res.status(400).json({ message: "O campo \"idade\" é obrigatório" });
    }
  
    const idadeInt = parseInt(idade);
    if (isNaN(idadeInt) || idadeInt < 0 || idadeInt > 130) {
      return res.status(400).json({
        message: "O campo \"idade\" deve ser um número válido entre 0 e 130",
      });
    }
  
    next();
  };
  
  module.exports = { validateAge };
  