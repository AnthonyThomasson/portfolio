import SystemNode, { IFile, IFolder } from "./SystemNode";

function FileTree(props:{structure:IFolder[]|IFile[]}) {

  const rootNodeItems = props.structure.map((node: IFolder|IFile) => (
    <li key={node.id}><SystemNode node={node} /></li>
  ));

  return (
    <ul>
      {rootNodeItems}
    </ul>
  )
}
export default FileTree;
