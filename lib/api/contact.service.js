import http from './http'

export const fetchContactInfo = async () => {
    const data = await http.get(`/contact`)
    return data.data
}

export const sendContactDetail = async (data) => {
    const res = await http.post(`/contact`, data)
    return res.data
}