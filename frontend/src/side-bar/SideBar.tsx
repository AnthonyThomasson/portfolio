import "./ModuleIcons.css";
import Modules from "./Modules";
import "./SideBar.css";

function Explorer() {
  return (
    <div className="side-bar">
      <Modules />
      <div className="file-explorer">
        <div className="heading"></div>
        <div className="section section-open">
          <div className="section-heading">
          </div>
          <div className="section-content">
          </div>
        </div>
        <div className="section">
          <div className="section-heading">
          </div>
          <div className="section-content">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explorer;
