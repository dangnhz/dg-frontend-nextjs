import http from './http'


export const fetchAllBlogPosts = async (page=0, category) => {
    const data = await http.get(`/blogs?page=${page}&category=${category}`)
    return data.data
}

export const fetchBlogPost = async (id) => {
    const data = await http.get(`/blog/${id}`)
    return data.data
}