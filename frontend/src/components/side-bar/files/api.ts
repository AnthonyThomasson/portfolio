import axios from "axios";

export enum NodeType {
  Folder = "folder",
  File = "file"
}
export interface ISystemNode {
  id:number,
  icon:string
  name:string
  parent:number
  type:string
}
export interface IFolder extends ISystemNode {
  children: ISystemNode[];
  open: boolean;
}
export interface IFile extends ISystemNode {
  link: string;
  selected: boolean;
}

export function fetchFiles(){
  return axios.get("http://localhost:3001/files")
}