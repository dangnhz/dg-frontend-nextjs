import http from './http'

export const fetchBasicPage = async (id:any) => {
    const data = await http.get(`/page/${id}`)
    return data.data
}
