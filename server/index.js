import fs from 'fs';
import makeStore from './src/store';
import {startUIServer} from './src/uiServer';
import {getProxyServer} from './src/proxyServer';
import {getMockServer} from './src/mockServer';
import startServer, {init as serverInit} from './src/server';

import {bindActionCreators} from 'redux';
import {addRequest} from './src/actionCreators';

const privateKey = fs.readFileSync('localhost.key').toString();
const certificate = fs.readFileSync('localhost.crt').toString();

const config = {
  proxy: {
    target: 'https://0.0.0.0:3000/',
    port: 3001,
    privateKey,
    certificate
  },
  mock: {

  },
};

export const store = makeStore();

startUIServer(store);
const proxyServer = getProxyServer(
  config.proxy,
  bindActionCreators(addRequest, store.dispatch)
);

const mockServer = getMockServer(config.mock);
serverInit(proxyServer, mockServer);
startServer(true); //'proxy');

store.dispatch({
  type: 'SET_ROUTES',
  routes: {}
});
