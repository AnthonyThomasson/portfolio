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
export interface IFolderNode extends ISystemNode {
  children: ISystemNode[];
  open: boolean;
}
export interface IFileNode extends ISystemNode {
  selected: boolean;
  content: string;
}

export function fetchSystemNodes(){
  return axios.get("http://localhost:3000/api/files")
}

export function fetchSystemNode(fileId:number){
  return axios.get(`http://localhost:3000/api/files/${fileId}`)
}