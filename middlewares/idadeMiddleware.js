const validarIdade = (req, res, next) => {
    const { idade } = req.body;

    if (!idade || isNaN(idade) || idade < 0 || idade > 120) {
        return res
            .status(400)
            .json({ mensagem: 'Idade inválida. Envie uma idade válida.' });
    }

    next();
};

module.exports = validarIdade;
