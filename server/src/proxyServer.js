var https = require('https');
var httpProxy = require('http-proxy');
var zlib = require('zlib')

export function getProxyServer({target, privateKey, certificate}, requestCallback) {
  const server = httpProxy.createServer({
    ssl: {
      key: privateKey,
      cert: certificate
    },
    target: target,
    secure: false
  });

  server.on('proxyRes', intercept.bind(null, requestCallback));
  return server;
}

export function startProxyServer(server) {
  return new Promise((resolve, reject) => {
    server.listen(3001, (err, msg) => {
      if (err) return reject(err);
      return resolve(msg);
    });
  });
}

export function stopProxyServer(server) {
  return new Promise((resolve, reject) => {
    server.close((err, msg) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

function intercept(callback, proxyRes, req, res) {
  console.log(`request for ${req.url}`);

  let body = '';
  const gz = zlib.createGunzip();
  proxyRes.pipe(gz);
  gz.on('error', (err) => console.error(err))
    .on('data', (chunk) => body += chunk)
    .on('end', () => {
      console.log("response body", body);
      const prettyBody = JSON.stringify(JSON.parse(body), null, 2)
      callback(req.url, prettyBody, req.headers);
  });
}

