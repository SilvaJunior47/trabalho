const express = require('express');
require('dotenv').config(); // puxa variáveis do .env
const path = require('path');

const app = express();

// Importando rotas
const clientesRoutes = require('./routes/clientesRoutes');

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// Rotas
app.use('/clientes', clientesRoutes);

// Inicializando servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
