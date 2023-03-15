import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://goldfish-app-dv7j2.ondigitalocean.app',
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');
	return config;
});

export default instance;
