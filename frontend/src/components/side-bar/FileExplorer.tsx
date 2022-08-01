
function FileExplorer() {
  return (
    <div className="file-explorer">
      <div className="section section-open">
        <div className="section-heading">
          <div className="section-title">
            <span className="chevron fa-solid fa-chevron-down"></span>PORTFOLIO
          </div>
          <ul className="sectionButtons">
            <li><button>+</button></li>
            <li><button>-</button></li>
            <li><button>0</button></li>
          </ul>
        </div>
        <div className="section-content">
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
