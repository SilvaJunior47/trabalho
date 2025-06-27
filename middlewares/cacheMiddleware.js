// middlewares/cacheMiddleware.js
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 30 });

function cacheMiddleware(req, res, next) {
  if (req.method !== "GET" || !req.originalUrl.includes("/clientes")) {
    return next();
  }

  const key = req.originalUrl;
  const cached = cache.get(key);
  if (cached) {
    console.log("[CACHE] Servido do cache:", key);
    return res.status(200).json(cached);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    console.log("[CACHE] Servido do banco e armazenado:", key);
    res.sendResponse(body);
  };

  next();
}

module.exports = cacheMiddleware; // ✅ exporta direto a função
