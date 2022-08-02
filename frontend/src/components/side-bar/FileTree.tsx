import { File, Folder, IFile, IFolder } from "./SystemNode";



function FileTree(props:{structure:IFolder[]|IFile[]}) {

  const rootNodeItems = props.structure.map((node: IFolder|IFile) => (
    <li key={node.id}>{'children' in node ? <Folder node={node} /> : <File node={node} />}</li>
  ));

  return (
    <ul>
      {rootNodeItems}
    </ul>
  )
}
export default FileTree;
