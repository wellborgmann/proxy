const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL missing in query parameter');
  }

  const proxy = createProxyMiddleware({
    target: targetUrl,  // URL de destino
    changeOrigin: true,  // Mudar a origem do cabeçalho para o destino
    secure: false,       // Desabilitar a verificação SSL
    followRedirects: true,  // Seguir redirecionamentos
    onProxyRes: (proxyRes, req, res) => {
      // Manter os cabeçalhos de resposta do servidor de destino
      res.setHeader('Content-Type', proxyRes.headers['content-type']);
      res.setHeader('Content-Disposition', proxyRes.headers['content-disposition']);
    },
  });

  return proxy(req, res);
};
