import axios from 'axios'

export type Technology = {
  name: string
  icon: string
  experience: string
}

export function fetchTechnologies() {
  return axios.get('/api/technologies')
}
