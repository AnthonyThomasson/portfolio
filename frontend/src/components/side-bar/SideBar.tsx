import { useState } from "react";
import FileExplorer from "./FileExplorer";
import Modules, { SIDEBAR_PAGE } from "./Modules";
import Search from "./Search";

function Explorer() {

  const [activeContent,setActiveContent] = useState(SIDEBAR_PAGE.FILE_EXPLORER);

  return (
    <div className="side-bar">
      <Modules activeButton={activeContent} onModuleClick={setActiveContent}/>
      <ul className="side-bar-content">
        <li className={`side-bar-item ${activeContent === SIDEBAR_PAGE.FILE_EXPLORER ? `side-bar-item-active` : ``}`}>
          <div className="side-bar-heading">EXPLORER</div>
          <FileExplorer />
        </li>
        <li className={`side-bar-item ${activeContent === SIDEBAR_PAGE.SEARCH ? `side-bar-item-active` : ``}`}>
          <div className="side-bar-heading">SEARCH</div>
          <Search />
        </li>
        <li className={`side-bar-item ${activeContent === SIDEBAR_PAGE.CONTACT_ME ? `side-bar-item-active` : ``}`}>
          <div className="side-bar-heading">SOURCE CONTROL</div>
          <div>
            <p style={{padding: '20px'}}>This is CONTACT_ME content</p>
          </div>
        </li>
        <li className={`side-bar-item ${activeContent === SIDEBAR_PAGE.TECHNOLOGIES ? `side-bar-item-active` : ``}`}>
          <div className="side-bar-heading">MODULES</div>
          <div>
            <p style={{padding: '20px'}}>This is TECHNOLOGIES content</p>
          </div>
        </li>
        <li className={`side-bar-item ${activeContent === SIDEBAR_PAGE.LOGIN ? `side-bar-item-active` : ``}`}>
          <div className="side-bar-heading">LOGIN</div>
          <div>
            <p style={{padding: '20px'}}>This is LOGIN content</p>
          </div>
        </li>
        <li className={`side-bar-item ${activeContent === SIDEBAR_PAGE.SITE_INFO ? `side-bar-item-active` : ``}`}>
          <div className="side-bar-heading">SETTINGS</div>
          <div>
            <p style={{padding: '20px'}}>This is SETTINGS content</p>
          </div>
        </li>
      </ul>
    </div>
  );
}


export default Explorer;
