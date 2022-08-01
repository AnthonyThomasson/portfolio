import './../../styles/FileExplorer.css';

function FileExplorer() {
  return (
    <div className="file-explorer">
      <div className="file-explorer-open">
        <div className="file-explorer-heading">
          <div className="file-explorer-title">
            <span className="chevron fa-solid fa-chevron-down"></span>PORTFOLIO
          </div>
          <ul className="file-explorer-buttons">
            <li><button className='file-explorer-button'>+</button></li>
            <li><button className='file-explorer-button'>-</button></li>
            <li><button className='file-explorer-button'>0</button></li>
          </ul>
        </div>
        <div className="file-explorer-content">
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
