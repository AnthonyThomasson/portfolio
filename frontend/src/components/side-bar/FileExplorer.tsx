import { useState } from 'react';
import './../../styles/FileExplorer.css';

function FileExplorer() {

  const [isOpen,setIsOpen] = useState(true)

  return (
    <div className="file-explorer">
      <div className="file-explorer-open">
        <div className="file-explorer-heading" onClick={() => setIsOpen(!isOpen)}>
          <div className="file-explorer-title">
            <span className={`chevron fa-solid ${isOpen === true ? 'fa-chevron-down' : 'fa-chevron-right'}`}></span>PORTFOLIO
          </div>
          <ul className="file-explorer-buttons">
            <li><button className='file-explorer-button'>+</button></li>
            <li><button className='file-explorer-button'>-</button></li>
            <li><button className='file-explorer-button'>0</button></li>
          </ul>
        </div>
        <div className={`file-explorer-content ${isOpen === true ? 'file-explorer-content-active' : ''}`}>
          Stuff Here
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
