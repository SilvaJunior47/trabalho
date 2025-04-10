const validarSobrenome = (req, res, next) => {
    const { sobrenome } = req.body;

    if (!sobrenome || typeof sobrenome !== 'string' || sobrenome.length < 2) {
        return res.status(400).json({
            // eslint-disable-next-line max-len
            mensagem: 'Sobrenome inválido. Envie um sobrenome com pelo menos 2 letras.',
        });
    }

    next();
};

module.exports = validarSobrenome;
