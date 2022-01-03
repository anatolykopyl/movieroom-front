import api from '@/api/index';

export default (movie: String | File) => {
  if (typeof movie === 'string') {
    return api.post('/roomMagnet', {
      magnet: movie,
    }).then((response) => response.data);
  }

  const formData = new FormData();
  formData.append('file', movie as Blob);

  return api.post('/roomFile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data);
};
