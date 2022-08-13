import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IFileNode, ISystemNode, NodeType } from "../../utilities/files/api";
import { getSystemNode } from "../../utilities/files/utilities";
import "./../../styles/Editor.css";
import FourOhFour from "./FourOhFour";
import Home from "./Home";
import SelectedFile from "./SelectedFile";
import Tabs from "./Tabs";

function Editor(props:{unknownPath?:boolean}) {
  
  let navigate = useNavigate()
  let params = useParams()
  const [tabs,setTabs] = useState<IFileNode[]>([])
  const [selectedFileId,setSelectedFileId] = useState(0)
  const [selectedHistory,setSelectedHistory] = useState<number[]>([])
  
  // const onTabRemove = (id:number) => {
    
  //   let newTabs = tabs.filter(tab => tab.id !== id)

  //   let newSelectedFileId = 0
  //   if(id === selectedFileId) {
  //     if(selectedHistory.length === 0 || newTabs.length > 0) {
  //       let firstTab = newTabs.values().next().value as IFileNode
  //       newSelectedFileId = firstTab.id
  //     }else if(selectedHistory.length > 0) {
  //       let lastSelectedId = selectedHistory.pop() as number
  //       newSelectedFileId = lastSelectedId
  //       setSelectedHistory([...selectedHistory])
  //     }
  //     setSelectedFileId(newSelectedFileId)
  //   }
    
    
  //   setTabs((prev) => prev.filter(tab => tab.id !== id))

  //   if(selectedFileId > 0) {
  //     navigate(`/file/${selectedFileId}`)
  //   }else{
  //     navigate(`/`)
  //   }
  // }

  // useEffect(() => {
    if(params.fileId === undefined || +params.fileId === 0){
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
      
      setSelectedHistory([...selectedHistory,selectedFileId])

      setSelectedFileId(file.id)
    }).catch(err => {
      console.log(err);
    })
    
  // });

  if(props.unknownPath === true){
    return (
      <div className="editor">
        <Tabs onTabRemove={() => {}} />
        <FourOhFour />
      </div>
    );
  }

  if(params.fileId === undefined || tabs[selectedFileId] === undefined){
    return (
      <div className="editor">
        <Tabs onTabRemove={() => {}} />
        <Home />
      </div>
    )
  }

  return (
    <div className="editor">
      <Tabs onTabRemove={() => {}} selectedFileId={selectedFileId} tabs={tabs} />
      {params.fileId ? <SelectedFile file={tabs[selectedFileId]} /> : <Home />}
    </div>
  );
}

export default Editor;
