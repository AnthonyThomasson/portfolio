import * as E from 'fp-ts/lib/Either'
import { Either, fromNullable } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
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
    getNode: (nodeId: number) => Either<Error, ISystemNode>
    getNodes: () => ISystemNode[]
}

export const useSystemNodes = (): UseDependencies => {
    const [nodes, loading] = useFetch('/api/systemNodes', [])
    const indexedNodes = useMemo(
        () =>
            pipe(
                nodes,
                E.fold(
                    () => new Map<number, ISystemNode>(),
                    (nodes: ISystemNode[]) => getIndexedNodeList(nodes)
                )
            ),
        [nodes]
    )

    const getNode = useCallback(
        (id: number): Either<Error, ISystemNode> =>
            pipe(
                indexedNodes.get(id),
                fromNullable(new Error(`Node with ID '${id}' not found`))
            ),
        [indexedNodes]
    )

    const getNodes = useCallback(
        (): ISystemNode[] => getNodeStructure(indexedNodes),
        [indexedNodes]
    )

    return { loading, getNode, getNodes }
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
