import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IFileNode, ISystemNode, NodeType } from "../../utilities/files/api";
import { getSystemNode } from "../../utilities/files/utilities";
import "./../../styles/Editor.css";
import Home from "./Home";
import SelectedFile from "./SelectedFile";
import Tabs from "./Tabs";

function Editor(props:{unknownPath?:boolean}) {
  
  let navigator = useNavigate()
  let params = useParams()
  const fileId = params.fileId !== undefined ? +params.fileId : 0

  const [tabs,setTabs] = useState<{[id:number]: IFileNode}>({})
  const [selectedHistory,setSelectedHistory] = useState<number[]>([])
  
  useEffect(() => {

    if (fileId > 0){
      getSystemNode(fileId).then((node:ISystemNode) => {
        if(node.type === NodeType.File){
          
          let file = node as IFileNode
          if(file.id > 0){
            const history = [file.id,...selectedHistory]
            setSelectedHistory(history)
          }
          
          if(tabs[file.id] === undefined){
            setTabs({...tabs, [file.id]: file})
          }
        }      
      })
    }
  }, [fileId])

  console.log(tabs)

  const contentHTML = tabs[fileId] !== undefined ? <SelectedFile file={tabs[fileId]} /> : <Home />

  return (
    <div className="editor">
      <Tabs 
        tabs={tabs}
        selectedFileId={fileId}
        onTabRemove={(id:number) => {console.log("Removing: ",id); let newTabs = {...tabs}; delete newTabs[id]; setTabs(newTabs)}} 
        onTabSelected={(id:number) => { console.log("Moving: ",id); navigator(`/file/${id}`); }}
      />
      {contentHTML}
    </div>
  );
}

export default Editor;
