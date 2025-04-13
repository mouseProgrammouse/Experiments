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
     * in range -1 to 1 - tree is balanced
     * If BF is +2, it means left-heavy
     * If BF is -2, it means right-heavy
     */
    #isBalanced () {
        const rigthSubTreeHeight = this.#height(this.root.right);
        const leftSubTreeHeight = this.#height(this.root.left);

        return leftSubTreeHeight - rigthSubTreeHeight;
    }

    #rightRotate (nodeToRotate) {
        const leftChild = nodeToRotate.left;
        const tempChild = leftChild.right;

        leftChild.right = nodeToRotate;
        nodeToRotate.left = tempChild;
        return leftChild;
    }

    #leftRotate (nodeToRotate) {
        const rightChild = nodeToRotate.right;
        const tempChild = rightChild.left;

        rightChild.left = nodeToRotate;
        nodeToRotate.right = tempChild;

        return rightChild;
    }

    inOrderTraversal (currentNode) {
        if (currentNode === null) return;

        this.inOrderTraversal(currentNode.left);
        if (currentNode === this.root) console.log("|");
        console.log(currentNode.value);
        if (currentNode === this.root) console.log("|");
        this.inOrderTraversal(currentNode.right);
    }

    #inOrderArray (currentNode, result) {
        if (currentNode === null) return;

        this.#inOrderArray(currentNode.left, result);
        result.push(currentNode.value);
        this.#inOrderArray(currentNode.right, result);
    }
    inOrderArray () {
        const result = [];
        this.#inOrderArray(this.root, result);
        return result;
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
        const balanceFactor = this.#isBalanced();
        console.log(this.inOrderArray());
        console.log(this.#isBalanced());
        console.log(this.root.value);

        // check imbalanced rules
        if (balanceFactor > 1) { // left heavy
            // LL - rotation
            const leftHeight = this.#height(this.root.left.left);
            const rightHeight = this.#height(this.root.left.right);
            if (rightHeight > leftHeight) {
                // LR -rotation
                this.root = this.#leftRotate(this.root.left);
            }
            // LL - case
            this.root = this.#rightRotate(this.root);
        } else if (balanceFactor < -1) { // right heavy
            const leftHeight = this.#height(this.root.right.left);
            const rightHeight = this.#height(this.root.right.right);
            if (leftHeight > rightHeight) {
                // RL - case
                this.root = this.#rightRotate(this.root.right);
            }
            // RR - case
            this.root = this.#leftRotate(this.root);
        }
    }

    #smallest (currentNode) {
        if (currentNode === null) return null;
        if (currentNode.left === null) return currentNode.value;

        return this.#smallest(currentNode.left);
    }
    #delete (prevNode, currentNode, value) {
        if (currentNode === null) return null;

        if (currentNode.value === value) {
            // leaf -> we can delete it
            if (currentNode.right === null && currentNode.left === null) {
                // delete , we have to keep parent
                if (currentNode === this.root) {
                    this.root = null;
                } else {
                    prevNode[prevNode.right === currentNode ? "right" : "left"] = null;
                }
            } else {
                // we have to find a smallest in right
                if (currentNode.right && currentNode.left) {
                    const smallestValue = this.#smallest(currentNode.right);
                    currentNode.value = smallestValue !== null ? smallestValue : this.#smallest(currentNode.left);
                    this.#delete(currentNode, currentNode.right, smallestValue);
                } else {
                    prevNode[prevNode.right === currentNode ? "right" : "left"] = currentNode.right !== null ? currentNode.right : currentNode.left;
                }
            }
        } else if (value > currentNode.value) {
            this.#delete(currentNode, currentNode.right, value);
        } else {
            this.#delete(currentNode, currentNode.left, value);
        }
    }
    delete (value) {
        this.#delete(null, this.root, value);

        // check balance
        const balanceFactor = this.#isBalanced();

        if (balanceFactor < -1) { // right heavy
            const rightHeight = this.#height(this.root.right.right); 
            const leftHeight = this.#height(this.root.right.left);

            if (leftHeight > rightHeight) {
                this.root = this.#leftRotate(this.root.right);
            }
            this.root = this.#rightRotate(this.root);
        }

        if (balanceFactor > 1) { //left heavy
            const rightHeight = this.#height(this.root.left.right);
            const leftHeight = this.#height(this.root.left);

            if (rightHeight > leftHeight) {
                this.root = this.#rightRotate(this.root.left);
            }
            this.root = this.#leftRotate(this.root);
        }
    }
}


/**
 * Helper function to run a test on the AVLTree with deletes.
 *   name: string describing the test
 *   inputValues: array of values to insert
 *   deleteValues: array of values to delete
 *   expectedInOrder: final expected in-order array
 */
function runAVLInsertDeleteTest(name, inputValues, deleteValues, expectedInOrder) {
    console.log(`=== ${name} ===`);

    const tree = new AVLTree();

    inputValues.forEach(value => tree.insert(value));
    deleteValues.forEach(value => tree.delete(value));

    const actualInOrder = tree.inOrderArray();

    console.log("Inserted values:    ", inputValues);
    console.log("Deleted values:     ", deleteValues);
    console.log("Expected in-order:  ", expectedInOrder);
    console.log("Actual in-order:    ", actualInOrder);

    const passed = JSON.stringify(actualInOrder) === JSON.stringify(expectedInOrder);
    console.log("Pass in-order?      ", passed ? "✅" : "❌");
    console.log("\n");
}

function testAVLInsertDeleteBalancing() {
    // Delete leaf node
    runAVLInsertDeleteTest(
        "Delete leaf node",
        [10, 5, 15],
        [5],
        [10, 15]
    );

    // Delete node with one child
    runAVLInsertDeleteTest(
        "Delete node with one child",
        [10, 5, 15, 12],
        [15],
        [5, 10, 12]
    );

    // Delete node with two children
    runAVLInsertDeleteTest(
        "Delete node with two children",
        [10, 5, 20, 15, 30],
        [10],
        [5, 15, 20, 30]
    );

    // Delete root node
    runAVLInsertDeleteTest(
        "Delete root node",
        [10, 5, 15],
        [10],
        [5, 15]
    );

    // Multiple deletions
    runAVLInsertDeleteTest(
        "Multiple deletions",
        [50, 20, 70, 10, 30, 60, 80, 5],
        [20, 70],
        [5, 10, 30, 50, 60, 80]
    );

    // Insert sorted, then delete middle
    runAVLInsertDeleteTest(
        "Insert sorted ascending then delete middle",
        [1, 2, 3],
        [2],
        [1, 3]
    );

    // Complex deletes and balancing
    runAVLInsertDeleteTest(
        "Complex unbalanced delete",
        [40, 20, 60, 10, 30, 50, 70, 5, 15, 25, 35],
        [20, 60, 40],
        [5, 10, 15, 25, 30, 35, 50, 70]
    );
}


// Run the tests
testAVLInsertDeleteBalancing();
