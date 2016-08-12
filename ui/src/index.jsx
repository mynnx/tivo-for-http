import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import io from 'socket.io-client';
import {setClientId, setState, setConnectionState} from './actionCreators';
import getClientId from './client_id';
import remoteActionMiddleware from './remote_action_middleware';

import App from './components/App';
import reducer from './reducer';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state =>
  store.dispatch(setState(state))
);

[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
);

const middlewares = applyMiddleware(remoteActionMiddleware(socket));
const devTools = window.devToolsExtension ? [window.devToolsExtension()] : [];
const enhancers = [middlewares, ...devTools];

const store = createStore(reducer, compose(...enhancers));

store.dispatch(setClientId(getClientId()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
