import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8002/', // Your Django URL
});
// 1. Request Interceptor: Attach Access Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Response Interceptor: Catch 401s and refresh the token
api.interceptors.response.use(
  (response) => response, // If request succeeds, just return it
  async (error) => {
    // Handle network errors or cases where error.response is undefined
    if (!error.response) {
      console.error('Network error or server unavailable:', error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // Check if error response exists and is 401, and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark to prevent infinite loops

      try {
        const refreshToken = localStorage.getItem('refresh_token');

        // Only attempt refresh if we have a refresh token
        if (!refreshToken) {
          console.warn('No refresh token available, redirecting to login');
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Call your Django refresh endpoint
        const res = await axios.post('http://localhost:8002/api/token/refresh/', {
          refresh: refreshToken,
        });

        if (res.status === 200) {
          // 1. Save new access token
          localStorage.setItem('access_token', res.data.access);

          // 2. Update the header of the original failed request
          api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;

          // 3. Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token is also expired, log the user out
        console.error('Token refresh failed:', refreshError.message);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;