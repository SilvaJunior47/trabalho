const mysql = require("mysql2/promise");

// Força o Jest a carregar o .env principal
require("dotenv").config({ path: ".env" });

// Configuração do banco que será usado nos testes (mesmo banco de desenvolvimento)
const testDbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "Imund#$O.120",
  database: process.env.MYSQL_DB || "desafio",
  port: process.env.MYSQL_PORT || 3306,
};

let testConnection;

// Setup antes de todos os testes
beforeAll(async () => {
  try {
    testConnection = await mysql.createConnection(testDbConfig);
    console.log("Conectado ao banco de teste!");
  } catch (error) {
    console.warn("Não foi possível conectar ao banco de teste:", error.message);
  }
});

// Limpeza antes de cada teste
beforeEach(async () => {
  if (testConnection) {
    try {
      await testConnection.execute(
        "DELETE FROM clientes WHERE email LIKE \"%teste%\" OR email LIKE \"%exemplo%\""
      );
      await testConnection.execute("ALTER TABLE clientes AUTO_INCREMENT = 1");
    } catch (error) {
      console.warn("Erro ao limpar banco de teste:", error.message);
    }
  }
});

// Limpeza após todos os testes
afterAll(async () => {
  if (testConnection) {
    try {
      await testConnection.execute(
        "DELETE FROM clientes WHERE email LIKE \"%teste%\" OR email LIKE \"%exemplo%\""
      );
      await testConnection.end();
      console.log("Conexão com banco de teste fechada!");
    } catch (error) {
      console.warn("Erro ao fechar conexão de teste:", error.message);
    }
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
});

// Configurar timeouts globais
jest.setTimeout(30000);
