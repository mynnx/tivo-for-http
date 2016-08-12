 /*
  * The state tree looks like this:
  * {
  *   routes: {
  *     '/users/me/referrals': {
  *       'o2338hf33123': {
  *         id: 'o2338hf33123',
  *         data: "{}",
  *         chosen: true,
  *         keeping: true,
  *       }
  *     }
  *   }
  * }
  */

import {List, Map, fromJS} from 'immutable';
import {loop, Effects} from 'redux-loop';
import toggleServer, {updateMockServerRoutes} from './server';

function refreshRoutes(mockServerRunning, routes) {
  if (!mockServerRunning) return Promise.resolve({type: 'REFRESH_ROUTES_SUCCESS'});

  return updateMockServerRoutes(routes)
    .then(() => {console.log("refreshed."); return {type: 'REFRESH_ROUTES_SUCCESS'}})
    .catch((err) => {console.log("refresh error!", err); return {type: 'REFRESH_ROUTES_FAILURE', err}});
}

function toggleServerEffect(which, routes) {
  return toggleServer(which, routes)
    .then(() => {console.log("toggle success."); return {type: 'TOGGLE_SERVER_SUCCESS'}})
    .catch((err) => {console.log("toggle error!", err); return {type: 'TOGGLE_SERVER_FAILURE', err}});
}

export const INITIAL_STATE = Map({
  routes: Map(),
  isRecording: true,
});

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ROUTES':
    return state.set('routes', fromJS(action.routes));
  case 'REQUEST_CHOOSE':
    const newState = state.updateIn(['routes', action.path], (requests) => {
      return requests.map((request) => {
        if (request.get('id') === action.id) {
          return request.set('chosen', true)
                        .set('keeping', true)
        }
        return request.set('chosen', false);
      });
    });
    return loop(newState,
                Effects.promise(
                  refreshRoutes,
                  !state.get('isRecording'),
                  state.get('routes').toJS()));
  case 'REQUEST_KEEP':
    return state.updateIn(['routes', action.path, action.id], (request) => {
      if (!request) return;

      const curValue = request.get('keeping');
      return request.set('keeping', !curValue);
    });
  case 'ADD_REQUEST':
    const newRequestData = {
      id: action.hash,
      chosen: false,
      keeping: false,
      data: action.data
    };

    return state.setIn(
      ['routes', action.path, action.hash],
      Map(newRequestData)
    );
  case 'RECORD_TOGGLE':
    const isRecording = state.get('isRecording');
    return loop(state.set('isRecording', !isRecording),
                Effects.promise(toggleServerEffect, !isRecording, state.get('routes').toJS()));
    return state;
  default:
    return state;
  }
}

