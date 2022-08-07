import { useEffect, useState } from "react";
import "./../../styles/FileExplorer.css";
import "./../../styles/SystemNodeIcons.css";
import { getFileStructures } from "./FilesAPI";
import FileTree from "./FileTree";
import { IFile } from "./SystemNode";


function fileSelected(file: IFile) {
  console.log(file);
}

function FileExplorer() {
  
  const [isOpen, setIsOpen] = useState(true);
  const [structure, setStructure] = useState([]);

  useEffect(() => {
    getFileStructures().then((structure:any) => {
      setStructure(structure)
    }).catch(err => {
      console.log(err);
    })
  },[]);

  return (
    <div className="file-explorer">
      <div className="file-explorer-open">
        <div
          className="file-explorer-heading"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="file-explorer-title">
            <span
              className={`chevron fa-solid ${
                isOpen === true ? "fa-chevron-down" : "fa-chevron-right"
              }`}
            ></span>
            PORTFOLIO
          </div>
          <ul className="file-explorer-buttons">
            <li>
              <button className="file-explorer-button">+</button>
            </li>
            <li>
              <button className="file-explorer-button">-</button>
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

            <FileTree structure={structure} onFileSelected={fileSelected}/>
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
