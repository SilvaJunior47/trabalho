require("dotenv").config({ path: ".env" });
const NodeCache = require("node-cache");
const cache = new NodeCache();
beforeEach(() => cache.flushAll());

const request = require("supertest");
// Ajustar o caminho baseado na estrutura do projeto
const app = require("../../app"); // Para middlewares/tests/clientes.test.js
const jwt = require("jsonwebtoken");

// Usar uma chave secreta consistente com a aplicação
const SECRET_KEY = process.env.JWT_SECRET || "secreto";

// Gerar token único para cada execução
const generateToken = () => {
  return jwt.sign({ 
    usuario: "admin", 
    timestamp: Date.now() 
  }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

describe("Testes da rota /clientes", () => {
  let testToken;

  beforeAll(() => {
    testToken = generateToken();
  });

  // Fechar conexões após todos os testes
  afterAll(async () => {
    // Aguardar um pouco para garantir que todas as operações terminaram
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  it("deve retornar 200 com token válido", async () => {
    const res = await request(app)
      .get("/clientes")
      .set("Authorization", `Bearer ${testToken}`)
      .timeout(10000); // Aumentar timeout

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000); // 15 segundos de timeout

  it("deve retornar 401 sem token", async () => {
    const res = await request(app)
      .get("/clientes")
      .timeout(10000);
      
    expect(res.statusCode).toBe(401);
  }, 15000);

  it("deve retornar 401 com token inválido", async () => {
    const res = await request(app)
      .get("/clientes")
      .set("Authorization", "Bearer token_invalido")
      .timeout(10000);

    expect(res.statusCode).toBe(401);
  }, 15000);

  it("deve retornar 401 com token expirado", async () => {
    const expiredToken = jwt.sign({ 
      usuario: "admin",
      timestamp: Date.now() 
    }, SECRET_KEY, {
      expiresIn: "-1h", // Token já expirado
    });

    const res = await request(app)
      .get("/clientes")
      .set("Authorization", `Bearer ${expiredToken}`)
      .timeout(10000);

    expect(res.statusCode).toBe(401);
  }, 15000);

  it("deve retornar 401 com formato de Authorization incorreto", async () => {
    const res = await request(app)
      .get("/clientes")
      .set("Authorization", testToken) // Sem "Bearer "
      .timeout(10000);

    expect(res.statusCode).toBe(401);
  }, 15000);
});