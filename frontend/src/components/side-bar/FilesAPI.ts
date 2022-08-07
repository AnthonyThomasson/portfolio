import axios from "axios";

function fetchFiles(){
    return axios.get("http://localhost:3001/files")
}

type File = {
  id:number,
  icon:string
  children:File[]
  parent:number
}

function createStructure(list: File[]) {
  let map = [], node, roots = [], i;
  
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent !== 0) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parent]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

export async function getFileStructures() {
  const response = await fetchFiles();
  return createStructure(response.data);
}

