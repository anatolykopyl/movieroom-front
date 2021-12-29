import api from '@/api/index';

export default (id: String) => api.get('/status', {
  params: {
    id,
  },
}).then((response) => response.data);
