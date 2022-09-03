import http from './http'

export const fetchBasicPage = async (id) => {
    const data = await http.get(`/page/${id}`)
    return data.data
}
