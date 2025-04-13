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
}


/**
 * Helper function to run a test on the AVLTree.
 *   name: string describing the test
 *   input: array of values to insert
 *   expectedArray: what we expect from inOrder traversal
 *   expectedMin: minimum value
 *   expectedMax: maximum value
 */
function runAVLInsertTest(name, inputValues, expectedInOrder) {
    console.log(`=== ${name} ===`);

    const tree = new AVLTree();

    inputValues.forEach(value => tree.insert(value));

    const actualInOrder = tree.inOrderArray();

    console.log("Inserted values:    ", inputValues);
    console.log("Expected in-order:  ", expectedInOrder);
    console.log("Actual in-order:    ", actualInOrder);

    const passed = JSON.stringify(actualInOrder) === JSON.stringify(expectedInOrder);
    console.log("Pass in-order?      ", passed ? "✅" : "❌");
    console.log("\n");
}

function testAVLInsertBalancing() {
    // Single insertion
    runAVLInsertTest(
        "Single insert",
        [10],
        [10]
    );

    // Insert sorted ascending (Right-heavy) => should rotate
    runAVLInsertTest(
        "Sorted ascending (Right-heavy)",
        [1, 2, 3],
        [1, 2, 3]
    );

    // Insert sorted descending (Left-heavy) => should rotate
    runAVLInsertTest(
        "Sorted descending (Left-heavy)",
        [3, 2, 1],
        [1, 2, 3]
    );

    // Left-Right (LR) case
    runAVLInsertTest(
        "Left-Right (LR case)",
        [30, 10, 20],
        [10, 20, 30]
    );

    // Right-Left (RL) case
    runAVLInsertTest(
        "Right-Left (RL case)",
        [10, 30, 20],
        [10, 20, 30]
    );

    // Random insertions
    runAVLInsertTest(
        "Random insertion",
        [5, 2, 8, 1, 4, 7, 9],
        [1, 2, 4, 5, 7, 8, 9]
    );

    // Complex unbalanced input
    runAVLInsertTest(
        "Complex unbalanced input",
        [50, 20, 70, 10, 30, 60, 80, 5],
        [5, 10, 20, 30, 50, 60, 70, 80]
    );
}

// Run the tests
testAVLInsertBalancing();
