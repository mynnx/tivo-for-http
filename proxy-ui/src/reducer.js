const initialState = {
  clientId: null,
  connection: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
  case 'SET_CLIENT_ID':
    return {...state, clientId: action.clientId};
  case 'SET_CONNECTION_STATE':
    return {
      ...state,
      connection: {
        state: action.connectionState,
        connected: action.connected
      }
    }
  case 'SET_STATE':
    return {
      clientId: state.clientId,
      connection: state.connection,
      ...action.state
    }
  }
  return state;
}
