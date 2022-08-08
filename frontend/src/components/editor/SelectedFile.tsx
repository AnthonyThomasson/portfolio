import { IFile } from "../../utilities/files/api";

function SelectedFile(props:{file:IFile}) {

  return (
    <div className="selected-file">
		  <h1>{props.file.name}</h1>
      <p>{props.file.content}</p>
    </div>
  );
}

export default SelectedFile;
