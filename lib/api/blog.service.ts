import http from './http'


export const fetchAllBlogPosts = async (page=0, category:string) => {
    const data = await http.get(`/blogs?page=${page}&category=${category}`)
    return data.data
}

export const fetchBlogPost = async (id:string) => {
    const data = await http.get(`/blog/${id}`)
    return data.data
}