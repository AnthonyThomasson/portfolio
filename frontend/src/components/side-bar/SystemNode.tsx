import { IFile, IFolder, ISystemNode, NodeType } from "./files/api";
import FileTree from "./FileTree";

type Props = {
  node: ISystemNode,
  depth: number,
  onFolderSelected: OnFolderSelected,
  onFileSelected: OnFileSelected
}

function file(props:Props) {

  const node = props.node as IFile;

  const filePadding = (props.depth * 17) + 20;

  return (
    <div className="system-node">
      <div className="system-node-content" >
        <div className={`system-node-name ${node.selected === true ? 'system-node-name-selected' : ''}`} style={{
            paddingLeft: `${filePadding}px`
          }}
          onClick={() => props.onFileSelected(node.id)}>
          <span className={node.icon}></span>
          <span className='folder-name'>{node.name}</span>
        </div>
      </div>
    </div>
  );
}

function folder(props:Props) {
  
  const node = props.node as IFolder;

  const folderPadding = (props.depth * 9) + 20;
  const folderGuideLeftPosition = (props.depth * 7) + 23;
  

  return (
    <div className="system-node">
      <div className="folder-guide" style={node.open === false ? { display: 'none '} : {
        left: `${folderGuideLeftPosition}px`,
      }} />
      <div className="system-node-content" >
        <div className="system-node-name" style={{
            paddingLeft: `${folderPadding}px`
          }}
          onClick={() => props.onFolderSelected(node.id)}>
          <span className={`chevron fa-solid ${node.open ? 'fa-chevron-down' : 'fa-chevron-right'}`}></span>
          <span className={`${node.icon}${node.open === true ? '-open' : '-closed'}`}></span>
          <span className='folder-name'>{node.name}</span>
        </div>
        {node.open === true ? <FileTree structure={node.children} depth={props.depth+1} onFolderSelected={props.onFolderSelected} onFileSelected={props.onFileSelected}/> : ''}
      </div>
    </div>
  );
}

function SystemNode(props: { node: ISystemNode, depth: number, onFolderSelected: OnFolderSelected, onFileSelected: OnFileSelected }) {

  if (props.node.type === NodeType.Folder) {
    return folder(props);
  }
  return file(props);
}


export type OnFileSelected = (fileId:number) => void;
export type OnFolderSelected = (folderId:number) => void;

export default SystemNode;