import http from './http';

export const requestLogin = async (payload) => {
	const data = await http.post(`/request-login`, { ...payload });
	return data.data;
};

export const login = async (uid, timestamp, hash) => {
	const data = await http.post(`/login`, { uid: uid, timestamp: timestamp, hash: hash });
	return data.data;
};

export const refreshToken = async () => {
	const token = localStorage.getItem('refreshToken');

	try {
		if (token) {
			const response = await http.post('/token/refresh', {refresh_token: token});

			// console.log('request token sent ');

			const { access_token, refresh_token, expires_in } = response.data;

			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('refreshToken', refresh_token);

			setTimeout(() => {
				refreshToken();
			}, expires_in * 1000 - 1000);
		}
	} catch (error) {
		// console.log(error)
		if (error.response.data.error === 'invalid_request') {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
		}
		// console.log(error.response.data.message);
	}
};
