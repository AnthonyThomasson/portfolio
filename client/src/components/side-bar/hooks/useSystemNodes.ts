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

export function useSystemNodes(initialSystemNodes: ISystemNode[]): {
    nodes: ISystemNode[]
} {
    return { nodes: initialSystemNodes }
}
