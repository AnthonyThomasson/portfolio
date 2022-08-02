import File from "./File";
import Folder from "./Folder";

function FileTree(props:{structure:any}) {

  return (
    <ul>
      <li><Folder /></li>
      <li><Folder /></li>
      <li><File /></li>
    </ul>
  )
}
export default FileTree;
