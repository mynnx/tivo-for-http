import {startProxyServer, stopProxyServer} from './proxyServer';
import {startMockServer,
  stopMockServer,
  updateRoutes} from './mockServer';
import store from './store';

let proxyServer;
let mockServer;
let mockServerApp;
export function init(proxy, mock, app) {
  proxyServer = proxy;
  mockServer = mock;
  mockServerApp = app;
}

export default function toggleServer(proxyOrMock, routes) {
  if (proxyOrMock) {
    return stopMockServer(mockServer)
      .catch((err) => console.log(err))
      .then(() => console.log("Mock server stopped"))
      .then(() => startProxyServer(proxyServer))
      .then(() => console.log("Proxy server started"));
  }

  console.log("proxy -> mock");
  return stopProxyServer(proxyServer)
    .catch((err) => console.log(err))
    .then(() => console.log("Proxy server stopped"))
    .then(() => updateMockServerRoutes(routes))
    .then(() => startMockServer(mockServer))
    .then(() => console.log("Mock server started"));
}

export function updateMockServerRoutes(routes) {
  return updateRoutes(mockServerApp, routes);
};
