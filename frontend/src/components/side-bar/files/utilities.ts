import { fetchFiles, IFile, IFolder, ISystemNode, NodeType } from "./api";

export async function getSystemNodes() {

    const response = await fetchFiles();

    let files:ISystemNode[] = []
    response.data.forEach((node:ISystemNode) => {
      files[node.id] = node
      if(node.type === NodeType.Folder){
        let folder = node as IFolder
        folder.open = false
      }else if(node.type === NodeType.File){
        let file = node as IFile
        file.selected = false
      }
    });
  return files;
}

export function getFileStructures(nodes:ISystemNode[]) {

  let ref:ISystemNode[] = []
  nodes.forEach(node => {
    ref[node.id] = node
    if(node.type === NodeType.Folder){
      let folder = node as IFolder
      folder.children = []
    }
  });

  let structure:ISystemNode[] = []
  nodes.forEach(node => {
    if (node.parent === 0) {
      structure.push(node)
    } else {
      let parentFolder = ref[node.parent] as IFolder
      parentFolder.children.push(node)
    }
  });
  return structure;
}

export function collapseFolders(list: ISystemNode[]){
  list.map(node => {  
    if(node.type === NodeType.Folder){
      let folder = node as IFolder
      folder.open = false
      if (folder.children.length > 0) {
        collapseFolders(folder.children)
      }
    }
    return node
  })
}

export function expandFolders(list: ISystemNode[]){
  list.map(node => {  
    if(node.type === NodeType.Folder){
      let folder = node as IFolder
      folder.open = true
      if (folder.children.length > 0) {
        expandFolders(folder.children)
      }
    }
    return node
  })
}