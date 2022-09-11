import http from './http'


export const fetchAllPosts = async (page=0) => {
    const data = await http.get(`/jobs?page=${page}`)
    return data.data
}

export const fetchPost = async (id:string) => {
    const data = await http.get(`/job/${id}`)
    return data.data
}