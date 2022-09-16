import http from './http'

export const fetchAllTeamMembers = async () => {
    const data = await http.get(`/members`)
    return data.data
}

export const fetchMember = async (id:string|string[]) => {
    const data = await http.get(`/member/${id}`)
    return data.data
}