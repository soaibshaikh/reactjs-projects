const useTraverseTree = () => {

    function insertNode(tree,folderId,item,isFolder){
        if(tree.id === folderId && tree.isFolder ){
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items:[]
            })
            return tree;
        }

        let latestNode = tree.items.map((ob)=> {
            return insertNode(ob, folderId, item, isFolder);
        });

        return {...tree,items:latestNode};
    }

    const deleteNode = (tree,folderId) => {
        if(tree.id === folderId ){
            return null;
        }
        // 2. If it has children, recursively filter and clean them up
    if (tree.items && tree.items.length > 0) {
        const updatedItems = tree.items
            .map((child) => deleteNode(child, folderId)) // Recursively check children
            .filter((child) => child !== null);          // Remove the deleted node
        return { ...tree, items: updatedItems };
    }

    // 3. Return node as-is if no changes happened inside it
    return tree;
    }

    const updateNode = (tree,folderId,item,isFolder) => {
        if(tree.id === folderId && tree.isFolder ){
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items:[]
            })
            return tree;
        }

        let latestNode = tree.items.map((ob)=> {
            return insertNode(ob, folderId, item, isFolder);
        });

        return {...tree,items:latestNode};
    }


    return { insertNode, deleteNode, updateNode }
}

export default useTraverseTree;