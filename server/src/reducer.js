import {List, Map, fromJS} from 'immutable';
import {loop, Effects} from 'redux-loop';
import toggleServer from './server';

function toggleServerEffect(which) {
  console.log("going to toggle...");
  return toggleServer(which)
    .then(() => {console.log("success!"); return {type: 'TOGGLE_SERVER_SUCCESS'}})
    .catch((err) => {console.log("error!", err); return {type: 'TOGGLE_SERVER_FAILURE', err}});
    // .then(() => ({type: 'TOGGLE_SERVER_SUCCESS'}))
    // .catch((err) => ({type: 'TOGGLE_SERVER_FAILURE', err}));
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
    return state.updateIn(['routes', action.path], (requests) => {
      return requests.map((request) => {
        if (request.get('id') === action.id) {
          return request.set('chosen', true)
                        .set('keeping', true)
        }
        return request.set('chosen', false);
      });
    });
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
                Effects.promise(toggleServerEffect, !isRecording));
    return state;
  default:
    return state;
  }
}

// {
//   routes: {
//     '/users/me/referrals': {
//       'o2338hf33123': {
//         id: 'o2338hf33123',
//         headers: {}
//       }
//     }
//   }
// }
