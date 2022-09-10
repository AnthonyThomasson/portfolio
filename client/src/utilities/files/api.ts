import axios, { AxiosResponse } from 'axios'

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

export async function fetchSystemNodes(): Promise<AxiosResponse> {
    return await axios.get('/api/files')
}

export async function fetchSystemNode(fileId: number): Promise<AxiosResponse> {
    return await axios.get(`/api/files/${fileId}`)
}
