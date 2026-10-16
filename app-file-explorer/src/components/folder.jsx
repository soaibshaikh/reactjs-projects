import { useState } from "react";

const FolderTree = ({ handleInsertNode,handleDeleteNode, explorer }) => {
  const [showFolders, setShowFolders] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowFolders(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleDelete = (id,name, isFolder) => {
    handleDeleteNode(id,name,isFolder);
  }

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // logic
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div
        className=""
        style={{
          padding: "3px",
        }}
      >
        <div
          style={{
            width: "200px",
            backgroundColor: "#f39999",
            display: "flex",
            // marginBottom:"1px"
          }}
          className=""
        >
          <span
            style={{
              cursor: "pointer",
              backgroundColor: "#a486a462",
              padding: "2px",
              display: "flex",
              minWidth: "200px",
              border: "1px solid #d18dff",
            }}
            onClick={() => setShowFolders(!showFolders)}
          >
            📁 {explorer.name}
          </span>

          <button
            style={{
              backgroundColor: "#3f3f3f",
              fontSize: "14px",
              padding: "5px",
              minWidth: "100px",
              border: "1px solid #e94545",
              textAlign: "center",
            }}
            onClick={(e) => handleNewFolder(e, true)}
          >
            folder +
          </button>

          <button
            style={{
              backgroundColor: "#3f3f3f",
              fontSize: "14px",
              padding: "5px",
              minWidth: "100px",
              border: "1px solid #e94545",
              textAlign: "center",
            }}
            onClick={(e) => handleNewFolder(e, false)}
          >
            file +
          </button>

          <button
            style={{
              backgroundColor: "#ff8585",
              fontSize: "14px",
              padding: "5px",
              minWidth: "200px",
              border: "1px solid #e94545",
              textAlign: "center",
            }}
            onClick={(e) => handleDelete(explorer.id,explorer.name, false)}
          >
            delete folder 🗑️
          </button>
        </div>
        <div
          className=""
          style={{
            display: showFolders ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              {showInput.isFolder ? "📁" : "📄"}
              <input
                onKeyDown={(e) => onAddFolder(e)}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
                type="text"
              />
            </div>
          )}
          {explorer.items.map((exp, index) => {
            return (
              <FolderTree
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                key={exp.name + index}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div 
      style={{
        display: 'flex',
        border: '1px solid #fff'
      }}
      className="file">
        <span
        style={{
            display: 'flex',
        border: '1px solid #fff'
        }}
        >📄 {explorer.name}</span>
        <button
          style={{
            backgroundColor: "#ff8585",
            fontSize: "10px",
            padding: "5px",
            minWidth: "30px",
            border: "1px solid #e94545",
            textAlign: "center",
          }}
          onClick={(e) => handleDelete(e,explorer.name, false)}
        >
          delete file 🗑️
        </button>
      </div>
    );
  }
};

export default FolderTree;
