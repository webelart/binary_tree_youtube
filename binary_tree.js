// https://towardsdatascience.com/4-types-of-tree-traversal-algorithms-d56328450846
// http://blog.benoitvallon.com/data-structures-in-javascript/the-binary-search-tree-data-structure/

// const myBinaryT = {
//     root: {
//         value: 8,
//         right: {
//             value: 9,
//             left: null, 
//             right: null,
//         },
//         left: {
//             value: 7,
//             left: null, 
//             right: null,
//         }
//     }
// }

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    add(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while(currentNode) {
            if (newNode.value < currentNode.value) {
                if(!currentNode.left) {
                    currentNode.left = newNode;
                    return;
                }

                currentNode = currentNode.left;
            } else {
                if(!currentNode.right) {
                    currentNode.right = newNode;
                    return;
                }

                currentNode = currentNode.right;
            }
        }
    }

    inOrderDFS(node, callback) {
        if(!node) {
            return;
        }

        this.inOrderDFS(node.left, callback);
        if (callback) {
            callback(node);
        }
        this.inOrderDFS(node.right, callback);
    }

    preOrderDFS(node, callback) {
        if(!node) {
            return;
        }

        if (callback) {
            callback(node);
        }
        this.preOrderDFS(node.left, callback);
        this.preOrderDFS(node.right, callback);
    }

    postOrderDFS(node, callback) {
        if(!node) {
            return;
        }

        this.postOrderDFS(node.left, callback);
        this.postOrderDFS(node.right, callback);
        if (callback) {
            callback(node);
        }
    }

    traverseDFS(method, callback) {
        const currentNode = this.root;

        if(method === 'inOrder') {
            return this.inOrderDFS(currentNode, callback);
        }

        if(method === 'preOrder') {
            return this.preOrderDFS(currentNode, callback);
        }

        return this.postOrderDFS(currentNode, callback);

    }

    traverseBFS(callback) {
        const queue = [this.root];

        while(queue.length) {
            const currentNode = queue.shift();
            if (callback) {
                callback(currentNode);
            }

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right)
            }
        }
    }
}

const myBinaryTree = new BinaryTree();
myBinaryTree.add(8);
myBinaryTree.add(7);
myBinaryTree.add(5);
myBinaryTree.add(2);
myBinaryTree.add(6);
myBinaryTree.add(9);
myBinaryTree.add(10);
myBinaryTree.add(20);
myBinaryTree.add(11);

//        8
//     7     9
//   5          10
// 2    6           20
//              11

// preOrder [ 8, 7, 5, 2, 6, 9, 10, 20, 11 ]
// inOrder [ 2, 5, 6, 7, 8, 9, 10, 11, 20 ]
// postOrder [ 2, 6, 5, 7, 11, 20, 10, 9, 8 ]
myBinaryTree.traverseBFS((node) => {
    console.log(node.value);
});

