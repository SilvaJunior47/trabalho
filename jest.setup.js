const mysql = require("mysql2/promise");

// Configuração do banco de teste
const testDbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME_TEST || "test_database" // Use um banco separado para testes
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
      // Limpar tabela de clientes antes de cada teste
        await testConnection.execute
            ("DELETE FROM clientes WHERE email LIKE \"%teste%\" OR email LIKE \"%exemplo%\"");
      
      // Reset auto increment (opcional)
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
      // Limpeza final
        await testConnection.execute
            ("DELETE FROM clientes WHERE email LIKE \"%teste%\" OR email LIKE \"%exemplo%\"");
      await testConnection.end();
      console.log("Conexão com banco de teste fechada!");
    } catch (error) {
      console.warn("Erro ao fechar conexão de teste:", error.message);
    }
  }
  
  // Aguardar um pouco para garantir limpeza
  await new Promise(resolve => setTimeout(resolve, 1000));
});

// Configurar timeouts globais
jest.setTimeout(30000);