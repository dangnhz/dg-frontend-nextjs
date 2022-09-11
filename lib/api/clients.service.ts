import http from './http'


export const fetchAllClients = async () => {
    const data = await http.get('/clients')
    return data.data
}
