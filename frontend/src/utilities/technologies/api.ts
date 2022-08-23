import axios from "axios";

export type Technology = {
  name: string;
  icon: string;
  experience: string;
}

export function fetchTechnologies(){
  return axios.get("http://localhost:3000/api/technologies")
}