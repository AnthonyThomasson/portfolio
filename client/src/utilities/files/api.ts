import axios from 'axios'

export enum NodeType {
    Folder = 'FOLDER',
    File = 'FILE',
}
export interface ISystemNode {
    id: number
    icon: string
    name: string
    parentId: number
    type: string
}
export interface IFolderNode extends ISystemNode {
    children: ISystemNode[]
    open: boolean
}
export interface IFileNode extends ISystemNode {
    selected: boolean
    content: string
}

export function fetchSystemNodes() {
    return axios.get('api/files')
}

export function fetchSystemNode(fileId: number) {
    return axios.get(`api/files/${fileId}`)
}
