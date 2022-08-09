import { IFileNode } from "../../utilities/files/api";

function Tabs(props:{ onTabRemove:OnTabRemove, selectedFileId?:number,tabs?:IFileNode[]}) {

  let selectedFileId = props.selectedFileId ?? 0 
  let tabs = props.tabs ?? []

  const tabsHTML = tabs.map((tab: IFileNode) => (
    <li key={selectedFileId === tab.id ? -tab.id :tab.id} className={`tab ${selectedFileId === tab.id ? 'tab-active' : ''}`}>
      <span className={`${tab.icon}`} />
      <span className="tab-name">{tab.name}</span>
      <button className="tab-close" onClick={() => props.onTabRemove(tab.id)}>X</button>
    </li>
  ));

  return (
    <ul className="tabs">{tabsHTML}</ul>
  );
}

export type OnTabRemove = (id:number) => void
export type OnTabSelected = (id:number) => void

export default Tabs;
