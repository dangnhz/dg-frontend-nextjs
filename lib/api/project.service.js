import http from './http';

export const fetchAllProjects = async (page, category) => {
	const data = await http.get(`/projects?page=${page}&category=${category}`);
	return data.data;
};

export const fetchProject = async (id) => {
	const data = await http.get(`/project/${id}`);
	return data.data;
};

export const fetchGatedProject = async (id) => {
	const accessToken = localStorage.getItem('accessToken');
		const data = await http.get(`/gated-project/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return data.data;
};
