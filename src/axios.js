import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://twitter-clone-server-euy1aq7jc-akifhaciyev.vercel.app',
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');
	return config;
});

export default instance;
