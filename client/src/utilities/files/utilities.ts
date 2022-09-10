import {
    fetchSystemNode,
    fetchSystemNodes,
    IFileNode,
    IFolderNode,
    ISystemNode,
    NodeType,
} from './api'

export function removeSelection(
    list: ISystemNode[],
    structure: ISystemNode[]
): [ISystemNode[], ISystemNode[]] {
    let newList = list.slice()
    const newStructure = structure.slice()

    newStructure.map((node) => {
        const nodeCopy = { ...node }
        if (nodeCopy.type === NodeType.File) {
            const file = newList[nodeCopy.id] as IFileNode
            file.selected = false
        } else if (nodeCopy.type === NodeType.Folder) {
            const folder = nodeCopy as IFolderNode
            if (folder.children.length > 0) {
                ;[newList, folder.children] = removeSelection(
                    newList,
                    folder.children
                )
            }
        }
        return nodeCopy
    })

    return [newList, newStructure]
}

export async function getSystemNodes(): Promise<ISystemNode[]> {
    const response = await fetchSystemNodes()
    console.log('DATA::: ', response.data)

    const files: ISystemNode[] = []
    response.data.forEach((node: ISystemNode) => {
        files[node.id] = node
        if (node.type === NodeType.Folder) {
            const folder = node as IFolderNode
            folder.open = false
            folder.children = []
        } else if (node.type === NodeType.File) {
            const file = node as IFileNode
            file.selected = false
        }
    })
    console.log('Files', files)
    return files
}

export async function getSystemNode(nodeId: number): Promise<ISystemNode> {
    const response = await fetchSystemNode(nodeId)
    const node: ISystemNode = response.data
    return node
}

export function getFileStructures(nodes: ISystemNode[]): ISystemNode[] {
    const refList: ISystemNode[] = []
    nodes.forEach((node) => {
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
}

export function collapseFolders(
    list: ISystemNode[],
    structure: ISystemNode[]
): [ISystemNode[], ISystemNode[]] {
    let newList = list.slice()
    const newStructure = structure.slice()

    newStructure.map((node) => {
        const nodeCopy = { ...node }
        if (nodeCopy.type === NodeType.Folder) {
            const structureFolder = nodeCopy as IFolderNode
            const rootFolder = newList[nodeCopy.id] as IFolderNode
            rootFolder.open = false
            if (structureFolder.children.length > 0) {
                const [subList, subStructure] = expandFolders(
                    newList,
                    structureFolder.children
                )
                structureFolder.children = subStructure
                newList = subList
            }
        }
        return nodeCopy
    })

    return [newList, newStructure]
}

export function expandFolders(
    list: ISystemNode[],
    structure: ISystemNode[]
): [ISystemNode[], ISystemNode[]] {
    let newList = list.slice()
    const newStructure = structure.slice()

    newStructure.map((node) => {
        const nodeCopy = { ...node }
        if (nodeCopy.type === NodeType.Folder) {
            const structureFolder = nodeCopy as IFolderNode
            const rootFolder = newList[nodeCopy.id] as IFolderNode
            rootFolder.open = true
            if (structureFolder.children.length > 0) {
                const [subList, subStructure] = expandFolders(
                    newList,
                    structureFolder.children
                )
                structureFolder.children = subStructure
                newList = subList
            }
        }
        return nodeCopy
    })

    return [newList, newStructure]
}

export function findAndSelect(
    list: ISystemNode[],
    structure: ISystemNode[],
    selectedFileId: number
): ISystemNode[] {
    let [newList, newStructure] = removeSelection(list, structure) as [
        ISystemNode[],
        ISystemNode[]
    ]

    const recurseAndSelect = (
        newStructure: ISystemNode[],
        foundSelection: boolean,
        isRoot: boolean
    ): [ISystemNode[], boolean] => {
        const newStructureCopy = newStructure.slice()

        newStructureCopy.forEach((node) => {
            const nodeCopy = { ...node }
            if (nodeCopy.type === NodeType.Folder) {
                const folder = nodeCopy as IFolderNode
                if (folder.children.length > 0) {
                    ;[folder.children, foundSelection] = recurseAndSelect(
                        folder.children,
                        foundSelection,
                        false
                    ) as [ISystemNode[], boolean]
                }
                if (foundSelection) {
                    const listNode = newList[folder.id] as IFolderNode
                    listNode.open = true
                    if (isRoot) {
                        foundSelection = false
                    }
                }
            } else if (nodeCopy.type === NodeType.File) {
                const file = nodeCopy as IFileNode
                if (file.id === selectedFileId) {
                    const listNode = newList[file.id] as IFileNode
                    listNode.selected = true
                    foundSelection = true
                }
            }
        })
        return [newList, foundSelection]
    }

    ;[newStructure] = recurseAndSelect(newStructure, false, true) as [
        ISystemNode[],
        boolean
    ]
    return newStructure
}
