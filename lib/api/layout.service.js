import http from './http'

export const fetchLayoutData = async () => {
    const data = await http.get(`/layout`)
    return data.data
}
