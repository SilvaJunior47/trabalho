const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

const token = jwt.sign({ usuario: "admin" }, "secreto", { expiresIn: "1h" });

describe("Endpoints de Clientes", () => {
  it("GET /clientes com token válido", async () => {
    const res = await request(app)
      .get("/clientes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
