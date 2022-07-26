import Modules from "./Modules";
import "./SideBar.css";

function Explorer() {
  return (
    <div className="side-bar">
      <Modules />
      <div className="file-explorer">
        <div className="heading"></div>
        <div className="sub-heading"></div>
      </div>
    </div>
  );
}

export default Explorer;
