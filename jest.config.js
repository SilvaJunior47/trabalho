module.exports = {
  testEnvironment: "node",
  testTimeout: 30000, // 30 segundos para todos os testes
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: [
    "**/tests/**/*.test.js",
    "**/middlewares/tests/**/*.test.js"
  ],
  collectCoverageFrom: [
    "controllers/**/*.js",
    "services/**/*.js",
    "middlewares/**/*.js",
    "!node_modules/**",
    "!tests/**",
    "!jest.setup.js"
  ],
  forceExit: true, // Força a saída do Jest
  detectOpenHandles: true, // Detecta handles abertos
  verbose: true
};