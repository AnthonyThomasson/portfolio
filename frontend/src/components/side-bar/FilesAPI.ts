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
  
  let listRef:File[] = []
  list.forEach(file => {
    listRef[file.id] = file
    file.children = []
  });


  let structure:File[] = []
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

