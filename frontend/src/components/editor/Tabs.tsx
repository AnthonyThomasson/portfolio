import { IFileNode } from "../../utilities/files/api";

function Tabs(props:{ onTabRemove:OnTabRemove, selectedFileId?:number,tabs?:{[id:number]: IFileNode}}) {

  const selectedFileId = props.selectedFileId ?? 0 
  const tabs = props.tabs ?? []

  const tabsHTML = Object.entries(tabs).map((tab) => {
    
    let file = tab[1] as IFileNode
  
    return (
      <li key={selectedFileId === file.id ? -file.id :file.id} className={`tab ${selectedFileId === file.id ? 'tab-active' : ''}`}>
        <span className={`${file.icon}`} />
        <span className="tab-name">{file.name}</span>
        <button className="tab-close" onClick={() => props.onTabRemove(file.id)}>X</button>
      </li>
    )
  })

  return (
    <ul className="tabs">{tabsHTML}</ul>
  );
}

export type OnTabRemove = (id:number) => void
export type OnTabSelected = (id:number) => void

export default Tabs;
