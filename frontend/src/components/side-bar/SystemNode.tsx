import { useState } from "react";

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


function SystemNode(props: { node: IFolder|IFile, depth?: number, open?: boolean }) {

  const [open,setOpen] = useState(props.open || false);

  const depth = props.depth || 0;
  const type = 'children' in props.node ? 'folder' : 'file';
  let onClick = type === 'folder' ? () => setOpen(!open) : () => {};

  let chevron = null
  let nodeItems = null
  if('children' in props.node){
    nodeItems = props.node.children.map((node: IFolder|IFile) => (
      <li key={node.id}>
        <SystemNode node={node} depth={depth + 1} /> 
      </li>
    ));
    nodeItems = <ul>{nodeItems}</ul>
    chevron = <span className={`chevron fa-solid ${open ? 'fa-chevron-down' : 'fa-chevron-right'}`}></span>
  }

  return (
    <div className={type}
      onClick={() => onClick()}
      style={{
        paddingLeft: `${depth * 10}px`
      }}>
      {chevron}
      <span className={`${type}-icon ${open === true ? `${type}-icon-open` : ``}`}></span>
      <span className={`${type}-name`}>{props.node.name}</span>
      {nodeItems}
    </div>
  );
}

export default SystemNode;