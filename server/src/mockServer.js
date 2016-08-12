var https = require('https');
var http = require('http');
var express = require('express');

export function getMockApp(routes) {
  const app = express();

  const responses = [];
  for (let path in routes) {
    let response;
    for (let requestHash in routes[path]) {
      let request = routes[path][requestHash];
      if (request.chosen) {
        response = request;
      }
    }
    if (response) responses.push({path, response});
  }

  responses.map(({path, response}) => {
    app.get(path, (req, res) => {
      res.json(JSON.parse(response.data))
    });
  });

  return app;
}

export function getMockServer({target, privateKey, certificate}, app) {
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
    if (!server) return reject(new Error('No server'));

    server.close((err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}
