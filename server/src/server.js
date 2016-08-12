import {startProxyServer, stopProxyServer} from './proxyServer';
import {updateRoutes, startMockServer, stopMockServer} from './mockServer';
import store from './store';

let proxyServer;
let mockServer;
export function init(proxy, mock) {
  proxyServer = proxy;
  mockServer = mock;
}

export default function toggleServer(proxyOrMock) {
  if (proxyOrMock) {
    return stopMockServer(mockServer)
      .catch((err) => console.log(err))
      .then(() => console.log("Mock server stopped"))
      .then(() => startProxyServer(proxyServer))
      .then(() => console.log("Proxy server started"));
  }

  return stopProxyServer(proxyServer)
    .catch((err) => console.log(err))
    .then(() => console.log("Proxy server stopped"))
    .then(() => startMockServer(mockServer))
    .then(() => console.log("Mock server started"));
}

export function updateMockServerRoutes(routes) {
  return updateRoutes(mockServer, routes);
};
