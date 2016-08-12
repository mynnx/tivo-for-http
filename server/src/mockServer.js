var https = require('https');
var http = require('http');
var express = require('express');

export function getMockServer({target, privateKey, certificate}) {
  const app = express();

  app.get('/users/me', function(req, res) {
    res.json({first_name: "Whackadoodle", last_name: "the Clown"});
  });

  const server = http.createServer(app);
  // const server = https.createServer({
  //   ssl: {
  //     key: privateKey,
  //     cert: certificate
  //   },
  //   secure: false
  // }, app);

  return server;
}

export function startMockServer(server) {
  return new Promise((resolve, reject) => {
    server.listen(3001, (err, msg) => {
      if (err) return reject(err);
      return resolve(msg);
    });
  });
}

export function stopMockServer(server) {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export function updateRoutes(server, routes) {
  return Promise.resolve();
}
