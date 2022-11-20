import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
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
    getNode: (nodeId: number) => E.Either<Error, ISystemNode>
    getNodes: () => ISystemNode[]
    select: (id: number) => E.Either<Error, ISystemNode>
    expandAll: () => ISystemNode[]
    collapseAll: () => ISystemNode[]
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
        (id: number): E.Either<Error, ISystemNode> =>
            pipe(
                indexedNodes.get(id),
                E.fromNullable(new Error(`Node with ID '${id}' not found`))
            ),
        [indexedNodes]
    )

    const getNodes = useCallback(
        (): ISystemNode[] => getNodeStructure(indexedNodes),
        [indexedNodes]
    )

    const select = useCallback(
        (id: number): E.Either<Error, ISystemNode> =>
            selectNode(id, indexedNodes),
        [indexedNodes]
    )
    const expandAll = useCallback(
        (): ISystemNode[] => expandNodes(indexedNodes),
        [indexedNodes]
    )
    const collapseAll = useCallback(
        (): ISystemNode[] => collapseNodes(indexedNodes),
        [indexedNodes]
    )

    return { loading, getNode, getNodes, select, expandAll, collapseAll }
}

const selectNode = (
    id: number,
    indexedNodes: Map<number, ISystemNode>
): E.Either<Error, ISystemNode> =>
    pipe(
        indexedNodes.get(id),
        E.fromNullable(new Error(`Node with ID '${id}' not found`)),
        E.chain((node: ISystemNode) => {
            if (node.type === NodeType.File) {
                const file = node as IFileNode
                file.selected = !file.selected
            } else if (node.type === NodeType.Folder) {
                const folder = node as IFolderNode
                folder.open = !folder.open
            } else {
                return E.left(
                    new Error(`Node with ID '${id}' is not a file or folder`)
                )
            }
            return E.of(node)
        })
    )

const expandNodes = (indexedNodes: Map<number, ISystemNode>): ISystemNode[] => {
    indexedNodes.forEach((node: ISystemNode) => {
        if (node.type === NodeType.Folder) {
            const folder = node as IFolderNode
            folder.open = true
        }
    })
    return getNodeStructure(indexedNodes)
}

const collapseNodes = (
    indexedNodes: Map<number, ISystemNode>
): ISystemNode[] => {
    indexedNodes.forEach((node: ISystemNode) => {
        if (node.type === NodeType.Folder) {
            const folder = node as IFolderNode
            folder.open = false
        }
    })
    return getNodeStructure(indexedNodes)
}

const getNodeStructure = (
    indexedNodes: Map<number, ISystemNode>
): ISystemNode[] =>
    pipe(
        E.of([] as ISystemNode[]),
        E.chain((structure) => {
            // unset all children from previous call
            indexedNodes.forEach((node: ISystemNode) => {
                if (node.type === NodeType.Folder) {
                    const folder = node as IFolderNode
                    folder.children = []
                }
            })
            indexedNodes.forEach((node: ISystemNode) =>
                pipe(
                    node.parentId,
                    O.fromNullable,
                    O.fold(
                        () => {
                            structure.push(node)
                        },
                        () => {
                            const parentFolder = indexedNodes.get(
                                node.parentId
                            ) as IFolderNode
                            parentFolder.children.push(node)
                        }
                    )
                )
            )
            return E.of(structure)
        }),
        E.match(
            () => [],
            (structure) => structure
        )
    )

const getIndexedNodeList = (nodes: ISystemNode[]): Map<number, ISystemNode> => {
    const dictionary = new Map<number, ISystemNode>()
    nodes.forEach((node: ISystemNode) => {
        setNodeDefaults(node)
        dictionary.set(node.id, node)
    })
    return dictionary
}

const setNodeDefaults = (node: ISystemNode): ISystemNode => {
    if (node.type === NodeType.Folder) {
        const folder = node as IFolderNode
        folder.open = false
        folder.children = []
    } else if (node.type === NodeType.File) {
        const file = node as IFileNode
        file.selected = false
    }
    return node
}
