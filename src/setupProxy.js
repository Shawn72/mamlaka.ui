const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://oriented-quality-ibex.ngrok-free.app",
      secure:false,
      changeOrigin: true,
    })
  );

  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://localhost:7124/",
      secure:false,
      changeOrigin: true,
    })
  );
};