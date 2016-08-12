import {List, Map, fromJS} from 'immutable';
//import {useProxy, useMockServer} from './mockServer';

export const INITIAL_STATE = Map({
  routes: Map(),
  recording: false,
});

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ROUTES':
    return state.set('routes', fromJS(action.routes));
  case 'TOGGLE_CHOOSE_ROUTE':
    // return state.updateIn(['routes', action.route, )
    return state;
  case 'ADD_ROUTE':
    const newRouteData = {
      chosen: false,
      data: action.data
    };

    return state.updateIn(
      ['routes', action.path], List(),
      route => route.push(newRouteData)
    );

  case 'TOGGLE_RECORDING':
    // if recording, useProxy
    // else, useMockServer
    return INITIAL_STATE;
  }
  return state;
}
