var https = require('https');
var httpProxy = require('http-proxy');
var zlib = require('zlib')


let server = null;

export function startProxyServer({target, privateKey, certificate}, requestCallback) {
  server = httpProxy.createServer({
    ssl: {
      key: privateKey,
      cert: certificate
    },
    target: target,
    secure: false
  });

  server.on('proxyRes', intercept.bind(null, requestCallback));
  server.listen(3001);
  return server;
}

export function stopProxyServer() {
  return new Promise((resolve, reject) => {
    if (!server) resolve();
    server.close((err) => {
      console.log(err || 'done');
      resolve({'type': 'DONE'})
    });
  })
  .catch((err) => {console.log(err)});
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
      callback(req.url, prettyBody);
  });
}

