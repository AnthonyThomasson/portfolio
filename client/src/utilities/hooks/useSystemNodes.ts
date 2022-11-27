import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
    breadcrumbs: string[]
}

interface UseDependencies {
    nodes: E.Either<Error, ISystemNode[]>
    structure: E.Either<Error, ISystemNode[]>
    loading: Boolean
    unselect: () => void
    expand: (folderId: number) => void
    select: (fileId: number) => E.Either<Error, ISystemNode>
    expandAll: () => void
    collapseAll: () => void
}

export const useSystemNodes = (): UseDependencies => {
    const [nodes, loading] = useFetch<ISystemNode[]>('/api/system-nodes', [])
    const [structure, setStructure] = useState<E.Either<Error, ISystemNode[]>>(
        E.of([])
    )
    const indexedNodes = useMemo(
        () =>
            pipe(
                nodes,
                E.map((nodes: ISystemNode[]) => getIndexedNodeList(nodes)),
                E.getOrElse(() => new Map())
            ),
        [nodes]
    )

    useEffect(() => {
        setStructure(E.of([...pipe(indexedNodes, getNodeStructure)]))
    }, [nodes])

    const select = useCallback(
        (id: number): E.Either<Error, ISystemNode> =>
            pipe(
                indexedNodes.get(id),
                E.fromNullable(new Error(`Node with ID '${id}' not found`)),
                E.chain((node: ISystemNode) => {
                    if (node.type === NodeType.File) {
                        findAndSelect(
                            id,
                            unselectNodes(indexedNodes),
                            indexedNodes
                        )
                    } else if (node.type === NodeType.Folder) {
                        const folder = indexedNodes.get(id) as IFolderNode
                        folder.open = !folder.open
                    } else {
                        return E.left(
                            new Error(
                                `Node with ID '${id}' is not a file or folder`
                            )
                        )
                    }

                    setStructure(
                        E.of([...pipe(indexedNodes, getNodeStructure)])
                    )
                    return E.of(node)
                })
            ),
        [indexedNodes]
    )

    const unselect = useCallback(
        (): void => setStructure(E.of([...pipe(indexedNodes, unselectNodes)])),
        [indexedNodes]
    )

    const expand = useCallback((folderId: number): void => {}, [indexedNodes])

    const expandAll = useCallback((): void => {
        setStructure(E.of([...pipe(indexedNodes, expandNodes)]))
    }, [indexedNodes])

    const collapseAll = useCallback(
        (): void => setStructure(E.of([...pipe(indexedNodes, collapseNodes)])),
        [indexedNodes]
    )

    return {
        nodes,
        structure,
        loading,
        select,
        unselect,
        expand,
        expandAll,
        collapseAll,
    }
}

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

const unselectNodes = (
    indexedNodes: Map<number, ISystemNode>
): ISystemNode[] => {
    indexedNodes.forEach((node: ISystemNode) => {
        if (node.type === NodeType.File) {
            const file = node as IFileNode
            file.selected = false
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
                            structure.push({ ...node })
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

export function findAndSelect(
    selectedFileId: number,
    structure: ISystemNode[],
    indexedNodes: Map<number, ISystemNode>
): ISystemNode[] {
    const recurseAndSelect = (
        newStructure: ISystemNode[],
        foundSelection: boolean,
        isRoot: boolean,

        breadcrumbs: string[] = []
    ): [ISystemNode[], boolean] => {
        newStructure.forEach((node) => {
            if (node.type === NodeType.Folder) {
                const folder = node as IFolderNode
                breadcrumbs.push(folder.name)
                if (folder.children.length > 0) {
                    ;[folder.children, foundSelection] = recurseAndSelect(
                        folder.children,
                        foundSelection,
                        false,
                        breadcrumbs
                    ) as [ISystemNode[], boolean]
                }
                if (foundSelection) {
                    const listNode = indexedNodes.get(folder.id) as IFolderNode
                    listNode.open = true
                    if (isRoot) {
                        foundSelection = false
                    }
                }
            } else if (node.type === NodeType.File) {
                const file = node as IFileNode
                if (file.id === selectedFileId) {
                    const listNode = indexedNodes.get(file.id) as IFileNode
                    listNode.selected = true
                    listNode.breadcrumbs = [...breadcrumbs]
                    foundSelection = true
                }
            }
        })
        breadcrumbs.pop()
        return [newStructure, foundSelection]
    }

    ;[structure] = recurseAndSelect(structure, false, true) as [
        ISystemNode[],
        boolean
    ]
    return getNodeStructure(indexedNodes)
}
