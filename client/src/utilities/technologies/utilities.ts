import { fetchTechnologies, Technology } from './api'

export async function getTechnologies(): Promise<Technology[]> {
    const response = await fetchTechnologies()
    return response.data as Technology[]
}
