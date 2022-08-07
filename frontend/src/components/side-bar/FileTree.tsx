import SystemNode, { IFile, IFolder, OnFileSelected } from "./SystemNode";

function FileTree(props:{structure:IFolder[]|IFile[], onFileSelected:OnFileSelected, depth?:number}) {

  const rootNodeItems = props.structure.map((node: IFolder|IFile) => (
    <li key={node.id}><SystemNode node={node} depth={ props.depth ?? 0} onFileSelected={props.onFileSelected}/></li>
  ));

  return (
    <ul>
      {rootNodeItems}
    </ul>
  )
}
export default FileTree;
