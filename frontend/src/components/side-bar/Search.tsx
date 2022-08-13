import { useState } from "react";
import { IFileNode, NodeType } from "../../utilities/files/api";
import { getSystemNodes } from "../../utilities/files/utilities";
import "./../../styles/Search.css";


function Search() {

  const [systemNodes,setSystemNodes] = useState<IFileNode[]>([]);
  const [searchResults,setSearchResults] = useState<IFileNode[]>([]);

  if(systemNodes.length === 0) {
    getSystemNodes().then((systemNodes:any) => {
      setSystemNodes(systemNodes)
    }).catch(err => {
      console.log(err);
    })
  }

  const onSearch = (searchTerm:string) => {
    if(searchTerm === "") {
      setSearchResults([])
    }else{
      const results = systemNodes.filter(node => 
        node.name.toLowerCase().includes(searchTerm.toLowerCase())
        && node.type === NodeType.File)
      setSearchResults(results)
    }
  }

  const searchResultsHTML = searchResults.map((node:IFileNode) => {
    return (<li key={node.id}>
        <div className={`system-node-name ${node.selected === true ? 'system-node-name-selected' : ''}`}
              onClick={() => {}} />
          <span className={node.icon}></span>
          <span className='folder-name'>{node.name}</span>
    </li>)
  })

  return (
    <div className="search-content">
      <input type="text" placeholder="Search" onChange={(e) => onSearch(e.target.value)}/>
      <ul className="search-results">
        {searchResultsHTML}
      </ul>
    </div>
  );
  
}


export default Search;
