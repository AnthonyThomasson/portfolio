import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IFile } from "../../utilities/files/api";
import FourOhFour from "./FourOhFour";
import Main from "./Main";
import SelectedFile from "./SelectedFile";
import Tabs from "./Tabs";

function Editor(props:{unknownPath?:boolean}) {

  let params = useParams()
  const [tabs,setTabs] = useState<IFile[]>([])
  const [selectedFileId,setSelectedFileId] = useState(0)
  
  useEffect(() => {
    let tabs = []
    let file:IFile = {
      id: 0,
      name: "index.html",
      content: "<h1>Hello World</h1>"
    }
    tabs[file.id] = file
    setTabs(tabs)
  },[]);

  if(props.unknownPath === true){
    return (
      <div className="editor">
        <Tabs />
        <FourOhFour />
      </div>
    );
  }

  if(params.fileId === undefined){
    return (
      <div className="editor">
        <Tabs />
        <Main />
      </div>
    )
  }

  return (
    <div className="editor">
      <Tabs />
      {params.fileId ? <SelectedFile file={tabs[selectedFileId]} /> : <Main />}
    </div>
  );
}

export default Editor;
