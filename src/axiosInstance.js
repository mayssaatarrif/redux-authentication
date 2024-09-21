import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://my-notes-app-apis.onrender.com/api/',
});

// Function to set the Authorization header
export const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
