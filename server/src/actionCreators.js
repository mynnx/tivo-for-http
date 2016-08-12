import md5 from 'md5';

export const addRequest = (path, data) => ({
  type: 'ADD_REQUEST',
  path,
  data,
  hash: md5(path + data)
});
