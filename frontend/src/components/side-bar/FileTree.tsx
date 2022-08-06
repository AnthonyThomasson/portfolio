import SystemNode, { IFile, IFolder } from "./SystemNode";

function FileTree(props:{structure:IFolder[]|IFile[], depth?:number}) {

  const rootNodeItems = props.structure.map((node: IFolder|IFile) => (
    <li key={node.id}><SystemNode node={node} depth={ props.depth ?? 0} /></li>
  ));

  return (
    <ul>
      {rootNodeItems}
    </ul>
  )
}
export default FileTree;
