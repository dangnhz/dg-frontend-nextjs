import http from './http'

export const fetchSearch = async (query, page) => {
    const data = await http.get(`/search?key=${query}&page=${page}`)
    return data.data
}
