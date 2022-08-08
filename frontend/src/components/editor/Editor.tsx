import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IFileNode, ISystemNode, NodeType } from "../../utilities/files/api";
import { getSystemNode } from "../../utilities/files/utilities";
import "./../../styles/Editor.css";
import FourOhFour from "./FourOhFour";
import Main from "./Main";
import SelectedFile from "./SelectedFile";
import Tabs from "./Tabs";


function Editor(props:{unknownPath?:boolean}) {
  
  let params = useParams()
  const [tabs,setTabs] = useState<IFileNode[]>([])
  const [selectedFileId,setSelectedFileId] = useState(0)
  
  useEffect(() => {
    if(params.fileId === undefined){
      return
    }
    
    getSystemNode(+params.fileId).then((systemNode:ISystemNode) => {
      
      if(systemNode.type === NodeType.Folder){
        console.log("Trying to select a folder")
        return
      }

      let file = systemNode as IFileNode
      if(tabs[file.id] === undefined){
        let newTabs = tabs.slice()
        newTabs[file.id] = file
        setTabs(newTabs)
        return
      }
      setSelectedFileId(file.id)
    }).catch(err => {
      console.log(err);
    })
    
  });

  if(props.unknownPath === true){
    return (
      <div className="editor">
        <Tabs />
        <FourOhFour />
      </div>
    );
  }

  if(params.fileId === undefined || tabs[selectedFileId] === undefined){
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
