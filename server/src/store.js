import {createStore} from 'redux';
import {combineReducers, install} from 'redux-loop';
import {Map} from 'immutable';
import reducer, {INITIAL_STATE} from './reducer';

export default function makeStore() {
  return createStore(reducer, install());
}
