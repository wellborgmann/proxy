// api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  const url = req.query.url;
  if(!url)return
  const proxy = createProxyMiddleware({
    target: url, // Substitua pelo domínio de destino
    changeOrigin: true,                    // Altera a origem da requisição para o domínio de destino
    secure: false,                         // Desabilita a validação de SSL (útil para desenvolvimento)
    pathRewrite: {
      '^/api/proxy': '',                   // Opcional: remova '/api/proxy' do caminho da URL
    },
  });

  return proxy(req, res);  // Executa o proxy
}

