import makeStore from './src/store';
import {startUIServer} from './src/uiServer';

export const store = makeStore();
startUIServer(store);
store.dispatch({
  type: 'SET_ROUTES',
  routes: require('./routes.json')
});


