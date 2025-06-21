const cache = {};

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;

  if (cache[key]) {
    return res.status(200).json(cache[key]);
  }

  const originalSend = res.json;
  res.json = (body) => {
    cache[key] = body;
    originalSend.call(res, body);
  };

  next();
}

module.exports = cacheMiddleware;
