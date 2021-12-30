import api from '@/api/index';

export default (id: String) => api.get('/position', {
  params: {
    id,
  },
}).then((response) => response.data.position);
