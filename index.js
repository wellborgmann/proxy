// api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  const proxy = createProxyMiddleware({
    target: 'https://proxy-lake-three.vercel.app',
    changeOrigin: true,
    secure: false,  // Desabilitar validação SSL (útil em ambientes de desenvolvimento)
  });
  return proxy(req, res);
}
