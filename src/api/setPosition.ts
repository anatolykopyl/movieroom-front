import api from '@/api/index';

export default (id: String, position: number) => api.post('/position', {
  id,
  position,
}).then((response) => response.data);
