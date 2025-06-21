const request = require("supertest");
const app = require("../app");

describe("Testes para clientes", () => {
  it("GET /clientes deve retornar 200", async () => {
    const res = await request(app).get("/clientes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
