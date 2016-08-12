import fs from 'fs';
import makeStore from './src/store';
import {bindActionCreators} from 'redux';
import {startUIServer} from './src/uiServer';
import startProxyServer from './src/proxyServer';

const addRoute = (path, data) => ({
  type: 'ADD_ROUTE',
  path,
  data
})

const config = {
  target: 'https://0.0.0.0:3000/',
  privateKey: fs.readFileSync('localhost.key').toString(),
  certificate: fs.readFileSync('localhost.crt').toString()
};

export const store = makeStore();
startProxyServer(config, bindActionCreators(addRoute, store.dispatch));

startUIServer(store);
store.dispatch({
  type: 'SET_ROUTES',
  routes: {}//require('./routes.json')
});
