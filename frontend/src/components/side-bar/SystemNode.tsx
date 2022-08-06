import { useState } from "react";
import FileTree from "./FileTree";

interface ISystemNode {
  id: number;
  icon: string;
  name: string;
}
export interface IFolder extends ISystemNode {
  children: IFolder[]|IFile[];
}
export interface IFile extends ISystemNode {
  link: string;
}

function file(node: IFile, depth: number) {

  const filePadding = (depth * 17) + 20;

  return (
    <div className="system-node">
      <div className="system-node-content" >
        <div className="system-node-name" style={{
            paddingLeft: `${filePadding}px`
          }}
          onClick={() => {}}>
          <span className={node.icon}></span>
          <span className='folder-name'>{node.name}</span>
        </div>
      </div>
    </div>
  );
}

function folder(node: IFolder, depth: number, open: boolean, setOpen: (open: boolean) => void) {
  
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
          onClick={() => setOpen(!open)}>
          <span className={`chevron fa-solid ${open ? 'fa-chevron-down' : 'fa-chevron-right'}`}></span>
          <span className={`${node.icon}${open === true ? '-open' : '-closed'}`}></span>
          <span className='folder-name'>{node.name}</span>
        </div>
        {open === true ? <FileTree structure={node.children} depth={depth+1}/> : ''}
      </div>
    </div>
  );
}

function SystemNode(props: { node: IFolder|IFile, depth: number, open?: boolean }) {

  const [open,setOpen] = useState(props.open || false);

  if ("children" in props.node) {
    return folder(props.node, props.depth, open, setOpen);
  }
  return file(props.node, props.depth);
}

export default SystemNode;