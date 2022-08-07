import axios from "axios";

export type SystemNode = {
  id:number,
  icon:string
  children:SystemNode[]
  parent:number
  open:boolean
  link:string
  selected:boolean
}

export function fetchFiles(){
  return axios.get("http://localhost:3001/files")
}