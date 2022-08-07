import axios from "axios";

export function fetchFiles(){
  return axios.get("http://localhost:3001/files")
}