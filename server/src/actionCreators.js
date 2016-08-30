import md5 from 'md5';

export const addRequest = (path, data, headers) => ({
  type: 'ADD_REQUEST',
  path,
  data,
  headers,
  hash: md5(path + data)
});

export const setRoutes = (routes) => ({
  type: 'SET_ROUTES',
  routes: {}
});
