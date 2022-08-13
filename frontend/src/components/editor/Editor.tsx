import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IFileNode, ISystemNode, NodeType } from "../../utilities/files/api";
import { getSystemNode } from "../../utilities/files/utilities";
import "./../../styles/Editor.css";
import Home from "./Home";
import SelectedFile from "./SelectedFile";
import Tabs from "./Tabs";

function Editor(props:{unknownPath?:boolean}) {
  
  let params = useParams()
  const fileId = params.fileId !== undefined ? +params.fileId : 0

  const [tabs,setTabs] = useState<{[id:number]: IFileNode}>({})
  const [selectedFileId,setSelectedFileId] = useState(fileId)
  const [selectedHistory,setSelectedHistory] = useState<number[]>([])
  
  console.log("tab rendered")
  
  useEffect(() => {
    console.log("use effect")
    if (fileId > 0){
      getSystemNode(fileId).then((node:ISystemNode) => {
        if(node.type === NodeType.File){
          
          let file = node as IFileNode
          if(selectedFileId > 0){
            const history = [selectedFileId,...selectedHistory]
            setSelectedHistory(history)
          }
          
          if(tabs[file.id] === undefined){
            setTabs({...tabs, [file.id]: file})
          }
          
          setSelectedFileId(file.id)
        }      
      })
    }
  }, [fileId])

  console.log(tabs)

  const contentHTML = tabs[selectedFileId] !== undefined ? <SelectedFile file={tabs[selectedFileId]} /> : <Home />

  return (
    <div className="editor">
      <Tabs onTabRemove={() => {}} selectedFileId={selectedFileId} tabs={tabs} />
      {contentHTML}
    </div>
  );
}

export default Editor;
