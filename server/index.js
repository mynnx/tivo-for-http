import fs from 'fs';
import makeStore from './src/store';
import {startUIServer} from './src/uiServer';
import {getProxyServer} from './src/proxyServer';
import {getMockServer, getMockApp} from './src/mockServer';
import toggleServer, {init as serverInit} from './src/server';
import {getPersistedRoutes} from './src/persistence';

import {bindActionCreators} from 'redux';
import {addRequest, setRoutes} from './src/actionCreators';

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
    privateKey,
    certificate
  },
};

export const store = makeStore();

const proxyServer = getProxyServer(
  config.proxy,
  bindActionCreators(addRequest, store.dispatch)
);
serverInit(proxyServer, config.mock);

startUIServer(store);
toggleServer(true)
    .then(() => store.dispatch(setRoutes(getPersistedRoutes())))
    .catch((err) => console.error(err));

