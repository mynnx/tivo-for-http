import {startProxyServer, stopProxyServer} from './proxyServer';
import {updateRoutes, startMockServer, stopMockServer} from './mockServer';
import store from './store';

// export const PROXY_SERVER = true;
// export const MOCK_SERVER = false;

let proxyServer;
let mockServer;
export function init(proxy, mock) {
  proxyServer = proxy;
  mockServer = mock;
}

export default function startServer(proxyOrMock) {
  if (proxyOrMock) {
  // if (proxyOrMock === 'proxy') {
    return stopMockServer(mockServer)
      .then(() => startProxyServer(proxyServer));

  return stopProxyServer(proxyServer)
    .then(() => startMockServer(proxyServer));
  }
}

export function updateMockServerRoutes(routes) {
  return updateRoutes(mockServer, routes);
};
