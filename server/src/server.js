import {startProxyServer, stopProxyServer} from './proxyServer';
import {
  getMockServer,
  getMockApp,
  startMockServer,
  stopMockServer,
  updateRoutes
} from './mockServer';

let proxyServer;
let mockServerConfig;
let mockServer;
export function init(proxy, mockConfig) {
  proxyServer = proxy;
  mockServerConfig = mockConfig;
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
    .then(() => mockServerWithRoutes(routes))
    .then((_mockServer) => {
      mockServer = _mockServer;
      startMockServer(mockServer)
    })
    .then(() => console.log("Mock server started"));
}

export function mockServerWithRoutes(routes) {
  const mockApp = getMockApp(routes);
  const mockServer = getMockServer(mockServerConfig, mockApp);
  return mockServer;
};

export function updateMockServerRoutes(routes) {
  console.log('Updating mock server routes');
  return Promise.resolve();
}
