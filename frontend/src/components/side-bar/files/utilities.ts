import { fetchFiles, IFile, IFolder, ISystemNode, NodeType } from "./api";

export async function getSystemNodes() {

    const response = await fetchFiles();

    let files:ISystemNode[] = []
    response.data.forEach((node:ISystemNode) => {
      files[node.id] = node
      if(node.type === NodeType.Folder){
        let folder = node as IFolder
        folder.children = []
        folder.open = false
      }else if(node.type === NodeType.File){
        let file = node as IFile
        file.selected = false
      }
    });
  return files;
}

export function getFileStructures(files:ISystemNode[]) {
  let ref:ISystemNode[] = []
  files.forEach(file => {
    ref[file.id] = file
  });

  let structure:ISystemNode[] = []
  files.forEach(file => {
    if (file.parent === 0) {
      structure.push(file)
    } else {
      let parentFolder = ref[file.parent] as IFolder
      parentFolder.children.push(file)
    }
  });
  return structure;
}

export function collapseFiles(list: ISystemNode[]){
  list.map(node => {  
    if(node.type === NodeType.Folder){
      let folder = node as IFolder
      folder.open = false
      if (folder.children.length > 0) {
        collapseFiles(folder.children)
      }
    }
    return node
  })
}

export function openFiles(list: ISystemNode[]){
  list.map(node => {  
    if(node.type === NodeType.Folder){
      let folder = node as IFolder
      folder.open = true
      if (folder.children.length > 0) {
        openFiles(folder.children)
      }
    }
    return node
  })
}