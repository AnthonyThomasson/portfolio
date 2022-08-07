import { fetchFiles } from "./api";

export type SystemNode = {
  id:number,
  icon:string
  children:SystemNode[]
  parent:number
  open:boolean
  link:string
}

function createStructure(list: SystemNode[]) {
  
  let listRef:SystemNode[] = []
  list.forEach(file => {
    listRef[file.id] = file
    file.children = []
    file.open = false
  });


  let structure:SystemNode[] = []
  list.forEach(file => {
    if (file.parent === 0) {
      structure.push(file)
    } else {
      listRef[file.parent].children.push(file)
    }
  });
  return structure;
}

export async function getFileStructures() {
  const response = await fetchFiles();
  return createStructure(response.data);
}

export function collapseStructure(list: SystemNode[]){
  list.map(file => {  
    file.open = false
    if (file.children.length > 0) {
      collapseStructure(file.children)
    }
    return file
  })
}

export function openStructure(list: SystemNode[]){
  list.map(file => {  
    file.open = true
    if (file.children.length > 0) {
      collapseStructure(file.children)
    }
    return file
  })
}