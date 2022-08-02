export const SIDEBAR_PAGE = {
  FILE_EXPLORER: "file-explorer",
  SEARCH: "search",
  CONTACT_ME: "contact-me",
  TECHNOLOGIES: "technologies",
  LOGIN: "login",
  SITE_INFO: "site-info",
}

function Modules(props: {activeButton:string, onModuleClick: (moduleName: string) => void}) {
  return (
    <div className="modules">
      <div className="top-modules">
        <button className={`module ${props.activeButton === SIDEBAR_PAGE.FILE_EXPLORER ? 'active' : ''}`} 
          onClick={() => props.onModuleClick(SIDEBAR_PAGE.FILE_EXPLORER)}>
            <span className="file-explorer-icon" />
        </button>
        <button className={`module ${props.activeButton === SIDEBAR_PAGE.SEARCH ? 'active' : ''}`}
          onClick={() => props.onModuleClick(SIDEBAR_PAGE.SEARCH)}>
          <span className="search-icon" />
        </button>
        <button className={`module ${props.activeButton === SIDEBAR_PAGE.CONTACT_ME ? 'active' : ''}`}
          onClick={() => props.onModuleClick(SIDEBAR_PAGE.CONTACT_ME)}>
          <span className="git-icon" />
        </button>
        <button className={`module ${props.activeButton === SIDEBAR_PAGE.TECHNOLOGIES ? 'active' : ''}`}
          onClick={() => props.onModuleClick(SIDEBAR_PAGE.TECHNOLOGIES)}>
          <span className="modules-icon" />
        </button>
      </div>
      <div className="bottom-modules">
        <button className={`module ${props.activeButton === SIDEBAR_PAGE.LOGIN ? 'active' : ''}`}
          onClick={() => props.onModuleClick(SIDEBAR_PAGE.LOGIN)}>
          <span className="profile-icon" />
        </button>
        <button className={`module ${props.activeButton === SIDEBAR_PAGE.SITE_INFO ? 'active' : ''}`}
          onClick={() => props.onModuleClick(SIDEBAR_PAGE.SITE_INFO)}>
          <span className="settings-icon" />
        </button>
      </div>
    </div>
  );
}

export default Modules;
