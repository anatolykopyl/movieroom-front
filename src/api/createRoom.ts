import api from '@/api/index';

export default (magnet:String) => api.post('/room', {
  magnet,
}).then((response) => response.data);
