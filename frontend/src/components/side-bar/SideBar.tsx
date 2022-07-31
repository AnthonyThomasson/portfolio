import React from "react";
import FileExplorer from "./FileExplorer";
import Modules from "./Modules";

class Explorer extends React.Component<{}, {active: string}> {

  constructor(props: {}) {
    super(props);
    this.state = {
      active: 'search'
    }
  }

  render() {
    return (
      <div className="side-bar">
        <Modules />
        <ul className="side-bar-content">
          <li className={`side-bar-item ${this.state.active === 'file-explorer' ? `side-bar-item-active` : ``}`}>
            <div className="search-bar-heading">EXPLORER</div>
            <FileExplorer />
          </li>
          <li className={`side-bar-item ${this.state.active === 'search' ? `side-bar-item-active` : ``}`}>
          <div className="search-bar-heading">SEARCH</div>
            <div>
              <p>This is some content</p>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Explorer;
