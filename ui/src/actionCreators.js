export const keepRequest = (id) => ({
  type: 'REQUEST_KEEP',
  id,
  meta: { remote: true }
});

export const chooseRequest = (id) => ({
  type: 'REQUEST_CHOOSE',
  id,
  meta: { remote: true }
});

export const toggleRecording = () => ({
  type: 'RECORD_TOGGLE',
  meta: { remote: true }
});

export function setClientId(clientId) {
  return {
    type: 'SET_CLIENT_ID',
    clientId
  };
}

export function setConnectionState(state, connected) {
  return {
    type: 'SET_CONNECTION_STATE',
    state,
    connected
  };
}

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}
