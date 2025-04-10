const validarNome = (req, res, next) => {
    const { nome } = req.body;

    if (!nome || typeof nome !== 'string' || nome.length < 2) {
        return res
            .status(400)
            // eslint-disable-next-line max-len
            .json({ mensagem: 'Nome inválido. Envie um nome com pelo menos 2 letras.' });
    }

    next();
};

module.exports = validarNome;
