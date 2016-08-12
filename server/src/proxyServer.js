var https = require('https');
var httpProxy = require('http-proxy');
var zlib = require('zlib')

function startProxyServer({target, privateKey, certificate}, requestCallback) {
  const server = httpProxy.createServer({
    ssl: {
      key: privateKey,
      cert: certificate
    },
    target: target,
    secure: false
  });

  server.on('proxyRes', intercept.bind(null, requestCallback));
  server.listen(3001);
}

function intercept(callback, proxyRes, req, res) {
  console.log("got one!");
  console.log(`request for ${req.url}`);
  console.log("response headers", proxyRes.headers);

  let body = '';
  const gz = zlib.createGunzip();
  proxyRes.pipe(gz);
  gz.on('error', (err) => console.error(err))
    .on('data', (chunk) => body += chunk)
    .on('end', () => {
      console.log("response body", body);
      const prettyBody = JSON.stringify(JSON.parse(body), null, 2)
      callback(req.url, prettyBody);
  });
}

export default startProxyServer;
