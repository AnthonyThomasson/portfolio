import axios from "axios";
import { useEffect, useState } from "react";
import "./../../styles/FileExplorer.css";
import FileTree from "./FileTree";


function FileExplorer() {
  const [isOpen, setIsOpen] = useState(true);
  const [fileStructure, setFileStructure] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await axios.get("http://localhost:3001/file-structure")
        setFileStructure(response.data);
      }catch(error){
        console.log(error)
      }
    }
    fetchData();
  },[fileStructure]);

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
            
          <FileTree structure={fileStructure} />
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
