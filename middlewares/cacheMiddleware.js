const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 30 }); // TTL = 30 segundos

const cacheMiddleware = (req, res, next) => {
  const key = "clientes_cache";
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log("[CACHE] Resultado retornado do cache");
    return res.status(200).json(cachedData);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    console.log("[CACHE] Resultado vindo do banco. Cacheando...");
    cache.set(key, body);
    res.sendResponse(body);
  };

  next();
};

const invalidateCache = () => {
  console.log("[CACHE] Cache invalidado");
  cache.del("clientes_cache");
};

module.exports = { cacheMiddleware, invalidateCache };
