import { useEffect, useMemo, useState } from "react";
import "./../../styles/FileExplorer.css";
import "./../../styles/SystemNodeIcons.css";
import { IFile, IFolder, ISystemNode } from "./files/api";
import { collapseFolders, expandFolders, getFileStructures, getSystemNodes } from "./files/utilities";
import FileTree from "./FileTree";

function FileExplorer() {
  
  const [isOpen, setIsOpen] = useState(true);
  const [systemNodes, setSystemNodes] = useState<ISystemNode[]>([]);
  const [selectedFileId, setSelectedFileId] = useState(0);
  const structure = useMemo(() => { 
    return getFileStructures(systemNodes)
  }, [systemNodes]);

  useEffect(() => {
    getSystemNodes().then((systemNodes:any) => {
      setSystemNodes(systemNodes)
    }).catch(err => {
      console.log(err);
    })
  },[]);

  const onFolderSelected = (folderId:number) => {
    let newSystemNodes = systemNodes.slice()
    let selectedNode = newSystemNodes[folderId] as IFolder;
    selectedNode.open = !selectedNode.open
    setSystemNodes(newSystemNodes)
  }

  const onFileSelected = (fileId:number) => {
    let newSystemNodes = systemNodes.slice()
    if(selectedFileId > 0){
      let prevSelectedNode = newSystemNodes[selectedFileId] as IFile;
      prevSelectedNode.selected = false;
    }
    let selectedNode = newSystemNodes[fileId] as IFile;
    selectedNode.selected = true;
    setSelectedFileId(fileId)
    setSystemNodes(newSystemNodes)
  }

  const onExpandAll = () =>{
    setSystemNodes(expandFolders(systemNodes))
  }

  const onCollapseAll = () => {
    setSystemNodes(collapseFolders(systemNodes))
  }

  return (
    <div className="file-explorer">
      <div className="file-explorer-open">
        <div className="file-explorer-heading">
          <div className="file-explorer-title" onClick={() => setIsOpen(!isOpen) }>
            <span
              className={`chevron fa-solid ${
                isOpen === true ? "fa-chevron-down" : "fa-chevron-right"
              }`}
            ></span>
            PORTFOLIO
          </div>
          <ul className="file-explorer-buttons">
            <li>
              <button className="file-explorer-button" onClick={onExpandAll}>+</button>
            </li>
            <li>
              <button className="file-explorer-button" onClick={onCollapseAll}>-</button>
            </li>
            <li>
              <button className="file-explorer-button">0</button>
            </li>
          </ul>
        </div>
        <div
          className={`file-explorer-content ${
            isOpen === true ? "file-explorer-content-active" : ""
          }`}>

            <FileTree structure={structure} 
              onFolderSelected={onFolderSelected} 
              onFileSelected={onFileSelected}/>
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
