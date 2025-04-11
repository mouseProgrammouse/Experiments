/**
 * AVL trees
 * - In a balanced binary search tree (BST), the heights of the left and right subtrees 
 * of any node differ by at most 1.
 * 
 * - If the difference becomes greater than 1 after an insertion (or deletion), 
 * rotations are needed to rebalance.
 * 
 * Rotations are tree operations to fix the balance.
 * 
 * Right Rotation (single)	        Left subtree is too tall (Left-Left case)	        Rotate node to the right
 * Left Rotation (single)	        Right subtree is too tall (Right-Right case)	    Rotate node to the left
 * Left-Right Rotation (double)	    Left-Right case (left child is right-heavy)	        Left rotate the child, then right rotate the node
 * Right-Left Rotation (double)	    Right-Left case (right child is left-heavy)	        Right rotate the child, then left rotate the node
 */
class Node {
    constructor (value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class AVLTree {
    constructor () {
        this.root = null;
    }

    #height (root) {
        if (root === null) return 0;

        return 1 + Math.max(this.#height(root.left), this.#height(root.right));
    }

    /**
     * Method will return:
     * -1 till 1 - tree is balanced
     * < -1 - left subtree is greater 
     * > 1 - right subtree is greater
     */
    #isBalanced () {
        const rigthSubTreeHeight = this.#height(this.root.right);
        const leftSubTree = this.#height(this.root.left);

        return rigthSubTreeHeight - leftSubTree;
    }

    inOrderTraversal (currentNode) {
        if (currentNode === null) return;

        this.inOrderTraversal(currentNode.left);
        if (currentNode === this.root) console.log("|");
        console.log(currentNode.value);
        if (currentNode === this.root) console.log("|");
        this.inOrderTraversal(currentNode.right);
    }

    #insert (currentNode, value) {
        if (value > currentNode.value) {
            if (currentNode.right === null) {
                currentNode.right = new Node(value);
                return;
            }

            this.#insert(currentNode.right, value);
        } else {
            // equal or less
            if (currentNode.left === null) {
                currentNode.left = new Node(value);
                return;
            }

            this.#insert(currentNode.left, value);
        }
    }
    insert (value) {
        const newNode = new Node(value);

        // insert
        if (this.root == null) {
            this.root = newNode;
            return;
        }

        this.#insert(this.root, value);

        if (!this.#isBalanced()) {
            this.inOrderTraversal(this.root);
            console.log("-------");
        }
    }
}


const AVLTreeInst = new AVLTree();
AVLTreeInst.insert(10);
AVLTreeInst.insert(5);
AVLTreeInst.insert(3);
AVLTreeInst.insert(11);
AVLTreeInst.insert(9);
AVLTreeInst.insert(8);


