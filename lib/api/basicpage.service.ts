import http from './http'

export const fetchBasicPage = async (id:string|string[]) => {
    const data = await http.get(`/page/${id}`)
    return data.data
}
