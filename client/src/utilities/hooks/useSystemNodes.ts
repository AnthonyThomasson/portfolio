import { useCallback, useMemo } from 'react'
import { useFetch } from './useFetch'

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

interface UseDependencies {
    loading: Boolean
    error: Error | null
    getNode: (nodeId: number) => ISystemNode
    getNodes: () => ISystemNode[]
}

export const useSystemNodes = (): UseDependencies => {
    const [nodes, loading, error] = useFetch('/api/systemNodes', [])
    const indexedNodes = useMemo(() => {
        const indexedNodes: { [key: number]: ISystemNode } = {}
        nodes.forEach((node: ISystemNode) => {
            if (node.type === NodeType.Folder) {
                const folder = node as IFolderNode
                folder.open = false
                folder.children = []
            } else if (node.type === NodeType.File) {
                const file = node as IFileNode
                file.selected = false
            }
            indexedNodes[node.id] = node
        })
        return indexedNodes
    }, [nodes])

    const getNode = useCallback(
        (id: number): ISystemNode => {
            return indexedNodes[id]
        },
        [indexedNodes]
    )

    const getNodes = useCallback((): ISystemNode[] => {
        const refList: ISystemNode[] = []
        nodes.forEach((node: ISystemNode) => {
            const nodeCopy = { ...node }
            refList[node.id] = nodeCopy
            if (node.type === NodeType.Folder) {
                const folder = nodeCopy as IFolderNode
                folder.children = []
            }
        })

        const structure: ISystemNode[] = []
        refList.forEach((node) => {
            if (node.parentId === 0 || node.parentId === null) {
                structure.push(node)
            } else {
                const parentFolder = refList[node.parentId] as IFolderNode
                parentFolder.children.push(node)
            }
        })
        return structure
    }, [nodes])

    return { loading, error, getNode, getNodes }
}
