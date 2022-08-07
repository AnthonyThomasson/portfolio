import { useEffect, useState } from "react";
import "./../../styles/FileExplorer.css";
import "./../../styles/SystemNodeIcons.css";
import { IFolder } from "./files/api";
import { collapseFiles, getFileStructures, getSystemNodes, openFiles } from "./files/utilities";
import FileTree from "./FileTree";

function FileExplorer() {
  
  const [isOpen, setIsOpen] = useState(true);
  const [systemNodes, setSystemNodes] = useState([]);
  const [structure, setStructure] = useState(getFileStructures(systemNodes));

  useEffect(() => {
    getSystemNodes().then((systemNodes:any) => {
      setSystemNodes(systemNodes)
      setStructure(getFileStructures(systemNodes));
    }).catch(err => {
      console.log(err);
    })
  },[]);

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
              <button className="file-explorer-button" onClick={() =>{
                let newOpenStructure = systemNodes
                openFiles(newOpenStructure)
                setSystemNodes(newOpenStructure)
              }}>+</button>
            </li>
            <li>
              <button className="file-explorer-button" onClick={() => {
                let newCollapsedFiles = systemNodes
                collapseFiles(newCollapsedFiles)
                setSystemNodes(newCollapsedFiles)
              }}>-</button>
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
              onFolderSelected={(folderId) => {
                debugger;
                let newSystemNodes = systemNodes
                let selectedNode = newSystemNodes[folderId] as IFolder;
                selectedNode.open = !selectedNode.open
                setStructure(getFileStructures(newSystemNodes))
              }} 
              onFileSelected={(fileId:number) => {
                console.log(fileId);
              }}/>
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
