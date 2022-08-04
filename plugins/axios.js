export default function ({ $axios }, inject) {
  
  const token = localStorage.getItem('crstore-api-token') || '';

  const api = $axios.create({
    headers: {
      common: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  api.onResponse(response => response.data);

  api.setBaseURL('http://localhost:3333')

  inject('api', api)
}