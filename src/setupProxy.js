// Configure proxy for development server since:
// - our node service routes are not prefixed by 'api'
// - but CRA requires a prefix to distinguish from react-router routes
// - and when setting 'proxy' in package.json we don't have the option to rewrite the path
// We rely on the advanced proxy option provided by CRA.
// https://medium.com/@Pavan_/set-up-proxy-to-work-with-multiple-apis-in-create-react-app-be595a713eb2
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:8080',
    pathRewrite: { '^/api': '' },
    secure: false
  }))
}
