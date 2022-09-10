import axios, { AxiosResponse } from 'axios'

export interface Technology {
    name: string
    icon: string
    experience: string
}

export async function fetchTechnologies(): Promise<AxiosResponse> {
    return await axios.get('/api/technologies')
}
