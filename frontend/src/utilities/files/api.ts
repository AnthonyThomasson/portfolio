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
  link: string;
  selected: boolean;
}

export interface IFile {
  id: number;
  name: string;
  content: string;
}

export function fetchFiles(){
  return axios.get("http://localhost:3001/files")
}

export function fetchFile(fileId:number){
  return axios.get(`http://localhost:3001/file/${fileId}`)
}