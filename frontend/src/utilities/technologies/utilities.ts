import { fetchTechnologies } from './api';

export async function getTechnologies() {
  const response = await fetchTechnologies();
  return response.data;
}
