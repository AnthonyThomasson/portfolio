import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IFolderNode, ISystemNode } from "../../utilities/files/api";
import { collapseFolders, expandFolders, findAndSelect, getFileStructures, getSystemNodes } from "../../utilities/files/utilities";
import "./../../styles/FileExplorer.css";
import "./../../styles/SystemNodeIcons.css";
import FileTree from "./FileTree";

function FileExplorer() {
  
  const navigate = useNavigate()
  const params = useParams()

  const [isOpen, setIsOpen] = useState(true);
  const [systemNodes, setSystemNodes] = useState<ISystemNode[]>([]);
  const [, setSelectedFileId] = useState(0);

  const structure = useMemo(() => { 
    const structure = getFileStructures(systemNodes)
    return structure
  }, [systemNodes]);

  useEffect(() => {
    getSystemNodes().then((systemNodes:any) => {
      setSystemNodes(systemNodes)

      if(params.fileId !== undefined && +params.fileId > 0) {
        const structure = getFileStructures(systemNodes)
        findAndSelect(systemNodes,structure, +params.fileId)
      }
      
    }).catch(err => {
      console.log(err);
    })
  },[]);

  const onFolderSelected = (folderId:number) => {
    let newSystemNodes = systemNodes.slice()
    let selectedNode = newSystemNodes[folderId] as IFolderNode;
    selectedNode.open = !selectedNode.open
    setSystemNodes(newSystemNodes)
  }

  const onFileSelected = (fileId:number) => {
    const newSystemNodes = findAndSelect(systemNodes,structure, fileId)
    setSelectedFileId(fileId)
    setSystemNodes(newSystemNodes)
    navigate(`/file/${fileId}`)
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
