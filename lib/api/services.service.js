import http from './http';

export const fetchAllServices = async () => {
	const data = await http.get('/services');
	return data.data;
};

export const fetchService = async (id) => {
	const data = await http.get(`/service/${id}`);
	return data.data;
};

export const fetchServiceItem = async (id, itemId) => {
	const data = await http.get(`/service/${id}/item/${itemId}`);
	return data.data;
};
