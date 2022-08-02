
interface ISystemNode {
  id: number;
  icon: string;
  name: string;
}
export interface IFolder extends ISystemNode {
  children: IFolder[]|IFile[];
}
export interface IFile extends ISystemNode {}


export function Folder(props: { node: IFolder, depth?: number, open?: boolean }) {

  let depth = props.depth || 0;
  let open = props.depth || false;

  const nodeItems = props.node.children.map((node: IFolder|IFile) => (
    <li key={node.id}>{'children' in node 
      ? <Folder node={node} depth={depth++} /> 
      : <File node={node} depth={depth++} />}</li>
  ));

  return (
    <div className="folder" style={{
      paddingLeft: `${depth * 10}px`
    }}>
      <span className="folder-icon"></span>
      <span className="folder-name">{props.node.name}</span>
      <ul>{nodeItems}</ul>
    </div>
  );
}

export function File(props: { node: IFile, depth?: number, open?: boolean }) {
  
  let depth = props.depth || 0;
  let open = props.depth || false;

  return (
    <div className="file" style={{
      paddingLeft: `${depth * 10}px`
    }}>
      <span className="file-icon"></span>
      <span className="file-name">{props.node.name}</span>
    </div>
  );
}