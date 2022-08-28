import { useState } from 'react'
import ContactMe from './ContactMe'
import FileExplorer from './FileExplorer'
import Login from './Login'
import Modules, { SIDEBAR_PAGE } from './Modules'
import Search from './Search'
import Technologies from './Technologies'

function Explorer() {
  const [activeContent, setActiveContent] = useState(SIDEBAR_PAGE.FILE_EXPLORER)

  return (
    <div className="side-bar">
      <Modules activeButton={activeContent} onModuleClick={setActiveContent} />
      <ul className="side-bar-content">
        <li
          className={`side-bar-item ${
            activeContent === SIDEBAR_PAGE.FILE_EXPLORER ? `side-bar-item-active` : ``
          }`}>
          <div className="side-bar-heading">EXPLORER</div>
          <FileExplorer />
        </li>
        <li
          className={`side-bar-item ${
            activeContent === SIDEBAR_PAGE.SEARCH ? `side-bar-item-active` : ``
          }`}>
          <div className="side-bar-heading">SEARCH</div>
          <Search />
        </li>
        <li
          className={`side-bar-item ${
            activeContent === SIDEBAR_PAGE.CONTACT_ME ? `side-bar-item-active` : ``
          }`}>
          <div className="side-bar-heading">CONTACT ME</div>
          <ContactMe />
        </li>
        <li
          className={`side-bar-item ${
            activeContent === SIDEBAR_PAGE.TECHNOLOGIES ? `side-bar-item-active` : ``
          }`}>
          <div className="side-bar-heading">TECHNOLOGIES</div>
          <Technologies />
        </li>
        <li
          className={`side-bar-item ${
            activeContent === SIDEBAR_PAGE.LOGIN ? `side-bar-item-active` : ``
          }`}>
          <div className="side-bar-heading">LOGIN</div>
          <Login />
        </li>
        <li
          className={`side-bar-item ${
            activeContent === SIDEBAR_PAGE.SITE_INFO ? `side-bar-item-active` : ``
          }`}>
          <div className="side-bar-heading">SETTINGS</div>
          <div>
            <Login />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Explorer
