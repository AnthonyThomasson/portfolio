import { ISystemNode } from '../../utilities/hooks/useSystemNodes'
import SystemNode, { OnFileSelected, OnFolderSelected } from './SystemNode'

function FileTree(props: {
    structure: ISystemNode[]
    onFolderSelected: OnFolderSelected
    onFileSelected: OnFileSelected
    depth?: number
}): JSX.Element {
    const rootNodeItems = props.structure.map((node: ISystemNode) => (
        <li key={node.id}>
            <SystemNode
                node={node}
                depth={props.depth ?? 1}
                onFolderSelected={props.onFolderSelected}
                onFileSelected={props.onFileSelected}
            />
        </li>
    ))

    return <ul>{rootNodeItems}</ul>
}
export default FileTree
