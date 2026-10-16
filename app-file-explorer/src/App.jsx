import { useState } from "react";
import FolderTree from "./components/folder";
import explorer from './data/folderData';
import useTraverseTree from "./hooks/use-traverse-tree";

const App = () => {
  const [explorerData,setExplorerData] = useState(explorer);
  const {insertNode,deleteNode}= useTraverseTree(explorerData);
  const handleInsertNode = (folderId,item,isFolder)=> {
    const finalTree = insertNode(explorerData,folderId,item,isFolder);
    setExplorerData(finalTree);
  }

  const handleDeleteNode = (folderId,item,isFolder)=> {
    console.log('delete item','explorerData', explorerData,'folderId', folderId,'item',item,'isFolder',isFolder);
    const finalTree = deleteNode(explorerData,folderId);
    setExplorerData(finalTree);
  }
  return (
    <>
      <div className="div">
        <h2>Hey this is Reactjs App</h2>
        <FolderTree handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} explorer={explorerData}/>
      </div>
    </>
  );
};

export default App;
