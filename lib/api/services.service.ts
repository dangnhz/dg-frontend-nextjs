import http from './http';

export const fetchAllServices = async () => {
	const data = await http.get('/services');
	return data.data;
};

export const fetchService = async (id:string|string[]) => {
	const data = await http.get(`/service/${id}`);
	return data.data;
};

export const fetchServiceItem = async (id:string|string[], itemId:string|string[]) => {
	const data = await http.get(`/service/${id}/item/${itemId}`);
	return data.data;
};
