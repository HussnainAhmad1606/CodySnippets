import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (token) {
      const { exp } = JSON.parse(atob(token.split('.')[1]));

      if (Date.now() >= exp * 1000) {
        // Token has expired, refresh it
        if (refreshToken) {
          try {
            const response = await axios.post('/api/refresh', { refreshToken });
            token = response.data.token;
            localStorage.setItem('studymate_token', token);
          } catch (error) {
            console.error('Failed to refresh token:', error);
          }
        }
      }

      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;