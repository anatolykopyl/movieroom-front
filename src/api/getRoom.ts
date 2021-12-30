import api from '@/api/index';

export default (id:String) => api.get('/room', {
  params: {
    id,
  },
}).then((response) => response.data);
