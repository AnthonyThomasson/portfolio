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
        return getIndexedNodeList(nodes)
    }, [nodes])

    const getNode = useCallback(
        (id: number): ISystemNode => {
            return indexedNodes.get(id) as ISystemNode
        },
        [indexedNodes]
    )

    const getNodes = useCallback((): ISystemNode[] => {
        return getNodeStructure(indexedNodes)
    }, [nodes])

    return { loading, error, getNode, getNodes }
}

const getNodeStructure = (
    indexedNodes: Map<number, ISystemNode>
): ISystemNode[] => {
    const structure: ISystemNode[] = []

    indexedNodes.forEach((node: ISystemNode) => {
        if (node.parentId === 0 || node.parentId === null) {
            structure.push(node)
        } else {
            const parentFolder = indexedNodes.get(node.parentId) as IFolderNode
            parentFolder.children.push(node)
        }
    })
    return structure
}

const getIndexedNodeList = (nodes: ISystemNode[]): Map<number, ISystemNode> => {
    const dictionary = new Map<number, ISystemNode>()
    nodes.forEach((node: ISystemNode) => {
        setNodeDefaults(node)
        dictionary.set(node.id, node)
    })
    return dictionary
}

const setNodeDefaults = (node: ISystemNode): void => {
    if (node.type === NodeType.Folder) {
        const folder = node as IFolderNode
        folder.open = false
        folder.children = []
    } else if (node.type === NodeType.File) {
        const file = node as IFileNode
        file.selected = false
    }
}
