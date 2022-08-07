import { useState } from "react";
import FileTree from "./FileTree";

interface ISystemNode {
  id: number;
  icon: string;
  name: string;
}

export type OnFileSelected = (file: IFile) => void;

export interface IFolder extends ISystemNode {
  children: IFolder[]|IFile[];
  open: boolean;
}
export interface IFile extends ISystemNode {
  link: string;
  selected: boolean;
}

function file(node: IFile, depth: number,onFileSelected: OnFileSelected) {

  const filePadding = (depth * 17) + 20;

  return (
    <div className="system-node">
      <div className="system-node-content" >
        <div className={`system-node-name ${node.selected === true ? 'system-node-name-selected' : ''}`} style={{
            paddingLeft: `${filePadding}px`
          }}
          onClick={() => onFileSelected(node)}>
          <span className={node.icon}></span>
          <span className='folder-name'>{node.name}</span>
        </div>
      </div>
    </div>
  );
}

function folder(node: IFolder, depth: number,onFileSelected: OnFileSelected,open:boolean, setOpen: (open: boolean) => void) {
  
  const folderPadding = (depth * 9) + 20;
  const folderGuideLeftPosition = (depth * 7) + 23;
  
  return (
    <div className="system-node">
      <div className="folder-guide" style={open === false ? { display: 'none '} : {
        left: `${folderGuideLeftPosition}px`,
      }} />
      <div className="system-node-content" >
        <div className="system-node-name" style={{
            paddingLeft: `${folderPadding}px`
          }}
          onClick={() => { setOpen(!open) }}>
          <span className={`chevron fa-solid ${open ? 'fa-chevron-down' : 'fa-chevron-right'}`}></span>
          <span className={`${node.icon}${open === true ? '-open' : '-closed'}`}></span>
          <span className='folder-name'>{node.name}</span>
        </div>
        {open === true ? <FileTree structure={node.children} depth={depth+1} onFileSelected={onFileSelected}/> : ''}
      </div>
    </div>
  );
}

function SystemNode(props: { node: IFolder|IFile, depth: number, onFileSelected: OnFileSelected }) {

  const [open,setOpen] = useState("open" in props.node ? props.node.open : false);

  if ("children" in props.node) {
    return folder(props.node, props.depth,props.onFileSelected, open,setOpen);
  }
  return file(props.node, props.depth,props.onFileSelected);
}

export default SystemNode;