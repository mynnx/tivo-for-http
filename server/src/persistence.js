import fs from 'fs';
import path from 'path';

const ROUTES_FILE = path.resolve(__dirname, '../routes.json');

export function persistRoutes(routes) {
  return new Promise((resolve, reject) => {
    fs.writeFile(ROUTES_FILE, JSON.stringify(routes), (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export function getPersistedRoutes() {
  let routes;
  try {
    routes = require(ROUTES_FILE);
  } catch (err) {
    routes = {};
  }
  return routes;
}

