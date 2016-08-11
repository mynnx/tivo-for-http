import {List, Map} from 'immutable';
//import {useProxy, useMockServer} from './mockServer';

export const INITIAL_STATE = Map();
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ROUTES':
    return state.set('routes', action.routes);
  case 'TOGGLE_CHOOSE_ROUTE':
    return INITIAL_STATE;
  case 'ADD_ROUTE':
    // return;
    return INITIAL_STATE;
  case 'TOGGLE_RECORDING':
    // if recording, useProxy
    // else, useMockServer
    return INITIAL_STATE;
  }
  return state;
}
