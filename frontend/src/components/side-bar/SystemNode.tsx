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
  let iconClass = props.node.icon
  let nodeItems = null
  let folderGuide = null
  if('children' in props.node){
    nodeItems = props.node.children.map((node: IFolder|IFile) => (
      <li key={node.id}>
        <SystemNode node={node} depth={depth + 1} /> 
      </li>
    ));
    nodeItems = <ul style={open === false ? { display: 'none '} : {}}>{nodeItems}</ul>
    chevron = <span className={`chevron fa-solid ${open ? 'fa-chevron-down' : 'fa-chevron-right'}`}></span>
    iconClass += open === true ? '-open' : '-closed'
    folderGuide = <div className="folder-guide" style={open === false ? { display: 'none '} : {
      left: (depth * 7) + 23 + 'px',
    }} />
  }

  return (
    <div className="system-node">
      {folderGuide}
      <div className="system-node-content" >
        <div className="system-node-name" style={{
            paddingLeft: type === 'folder' ? `${(depth * 9) + 20}px` :  `${(depth * 15) + 20}px`
          }}
          onClick={() => onClick()}>
          {chevron}
          <span className={iconClass}></span>
          <span className={`${type}-name`}>{props.node.name}</span>
        </div>
        {nodeItems}
      </div>
    </div>
  );
}

export default SystemNode;