import http from './http'


export const fetchHomepageData = async () => {
    const data = await http.get('/homepage')
    return data.data
}
