import { fetchSystemNode, fetchSystemNodes, IFileNode, IFolderNode, ISystemNode, NodeType } from "./api";

function removeSelection(list: ISystemNode[],structure:ISystemNode[] ){

  let newList = list.slice()
  let newStructure = structure.slice()

  newStructure.map(node => {  
    let nodeCopy = {...node}
    if(nodeCopy.type === NodeType.File){
      let file = newList[nodeCopy.id] as IFileNode
      file.selected = false
    }else if(nodeCopy.type === NodeType.Folder){
      let folder = nodeCopy as IFolderNode
      if(folder.children.length > 0){
        [newList,folder.children] = removeSelection(newList,folder.children)
      }
    }
    return nodeCopy
  })
  
  return [newList,newStructure];
}

export async function getSystemNodes() {

    const response = await fetchSystemNodes();

    let files:ISystemNode[] = []
    response.data.forEach((node:ISystemNode) => {
      files[node.id] = node
      if(node.type === NodeType.Folder){
        let folder = node as IFolderNode
        folder.open = false
      }else if(node.type === NodeType.File){
        let file = node as IFileNode
        file.selected = false
      }
    });
  return files;
}

export async function getSystemNode(nodeId:number) {

  const response = await fetchSystemNode(nodeId);
  const node:ISystemNode = response.data; 
  return node;
}

export function getFileStructures(nodes:ISystemNode[]) {

  let refList:ISystemNode[] = []
  nodes.forEach(node => {
    let nodeCopy = {...node}
    refList[node.id] = nodeCopy
    if(node.type === NodeType.Folder){
      let folder = nodeCopy as IFolderNode
      folder.children = []
    }
  });

  let structure:ISystemNode[] = []
  refList.forEach(node => {
    if (node.parent === 0) {
      structure.push(node)
    } else {
      let parentFolder = refList[node.parent] as IFolderNode
      parentFolder.children.push(node)
    }
  });
  return structure;
}

export function collapseFolders(list: ISystemNode[]){

  let newList = list.slice()

  newList.map(node => {  
    let nodeCopy = {...node}
    if(nodeCopy.type === NodeType.Folder){
      let folder = nodeCopy as IFolderNode
      folder.open = false
      if (folder.children.length > 0) {
        collapseFolders(folder.children)
      }
    }
    return nodeCopy
  })

  return newList
}

export function expandFolders(list: ISystemNode[]){

  let newList = list.slice()

  newList.map(node => {  
    let nodeCopy = {...node}
    if(nodeCopy.type === NodeType.Folder){
      let folder = nodeCopy as IFolderNode
      folder.open = true
      if (folder.children.length > 0) {
        expandFolders(folder.children)
      }
    }
    return nodeCopy
  })
  
  return newList;
}

export function findAndSelect(list: ISystemNode[],structure:ISystemNode[] ,selectedFileId:number) {

  let [newList,newStructure] = removeSelection(list,structure) as [ISystemNode[],ISystemNode[]]

  const recurseAndSelect = (newStructure:ISystemNode[],foundSelection:boolean) => {
    newStructure.forEach(node => {
      let nodeCopy = {...node}
      if(nodeCopy.type === NodeType.Folder){
        let folder = nodeCopy as IFolderNode
        if (folder.children.length > 0) {
          if(foundSelection){
            let listNode = newList[folder.id] as IFolderNode
            listNode.open = true
          }
          recurseAndSelect(folder.children,foundSelection)
        }
      }else if(nodeCopy.type === NodeType.File){
        let file = nodeCopy as IFileNode
        if(file.id === selectedFileId){
          let listNode = newList[file.id] as IFileNode
          listNode.selected = true
          foundSelection = true
        }
      }
    })
    return newList
  }
  
  return recurseAndSelect(newStructure,false);
}