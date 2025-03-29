/**
 * Binary Tree:
 * 
 *              (Root)
 *             /      \
 *           /          \
 *       (Left)       (Right)
 *       /   \         /  \
 *     ...   ...     ...   ...
 * 
 *
 * Node - is an individual element of a binary tree that typically contains some data
 * and references to its child nodes.
 * 
 * Every node can have 0, 1, or 2 children.
 * 0 children → the node is called a leaf.
 * 1 child → the node has one empty (null) link.
 * 2 children → a fully linked node in the binary tree.
 * 
 * Root. The topmost node in a binary tree is called the root.
 * 
 * Left and Right Subtrees. These subtrees themselves are also binary trees.
 * 
 * Height (or Depth): The “height” of a node is how far that node is from the bottom 
 * of the tree (i.e., its longest downward path).
 * 
 * Levels. 
 * The level of a node is its distance from the root. 
 * The root is at level 0 (or level 1, depending on the convention), 
 * its children are at the next level, and so forth.
 * 
 * (!) Efficient Lookup (In Certain Types of Binary Trees).
 * (!) Hierarchical Data Representation.
 */

class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor () {
        this.root = null;
        this.size = 0;
    }

    /**
     * Inserts a new node with the specified value into the binary tree
     * */
    insert (value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            this.size++;
            return;
        }

        let currentNode = this.root, prevNode = null;;

        while (currentNode !== null) {
            if (currentNode.value === value) return; // we will not store duplicated values (but it can depends on requirements)

            prevNode = currentNode;
            currentNode = value > currentNode.value ? currentNode.right : currentNode.left;
        }

        if (value > prevNode.value) {
            prevNode.right = newNode;
        } else {
            prevNode.left = newNode;
        }
        this.size++;
    }

    /**
     * Inserts multiple values from array.
     * 
     */
    bulkInsert (values) {
        for (let i = 0; i < values.length; i++) {
            this.insert(values[i]);
        }
    }

    /**
     * Traverses the tree in “left → node → right” order and typically processes 
     * or returns a list of node values in ascending order.
     * 
     * O(n)
     */
    #inOrderTraversal (currentNode) {
        if (currentNode === null) return;

        this.#inOrderTraversal(currentNode.left);
        console.log(currentNode.value);
        this.#inOrderTraversal(currentNode.right);
    }
    inOrderTraversal () {
        this.#inOrderTraversal(this.root);
    }

    /**
     * Traverses in “node → left → right” order.
     * 
     * O(n)
     */
    #preOrderTraversal (currentNode) {
        if (currentNode === null) return;

        console.log(currentNode.value);
        this.#preOrderTraversal(currentNode.left);
        this.#preOrderTraversal(currentNode.right);
    }
    preOrderTraversal () {
        this.#preOrderTraversal(this.root);
    }

    /** Traverses in “left → right → node” order.
     * 
     * O(n)
    */
    #postOrderTraversal (currentNode) {
        if (currentNode === null) return;

        this.#postOrderTraversal(currentNode.left);
        this.#postOrderTraversal(currentNode.right);
        console.log(currentNode.value);
    }
    postOrderTraversal () {
        this.#postOrderTraversal(this.root);
    }

    /**
     * Traverses the tree level by level (from the root, then its children, then grandchildren, etc.).
     * 
     * O(n)
     */
    breadthFirstTraversal () {
        const queue = [this.root]

        while (queue.length !== 0) {
            const currentNode = queue.shift();
            console.log(currentNode.value);
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
    }

    /**
     * Returns true if the tree has no nodes; otherwise false.
     * 
     * O(1)
     */
    isEmpty () {
        return this.root === null;
    }

    /**
     * Returns the total number of nodes in the tree. Storing size as class field.
     * 
     * O(1)
     */
    size () {
        return this.size;
    }

    /**
     * Alternative method to get size, without storing the size as class field.
     * 
     * O(n)
    */
    #getSize (currentNode) {
        if (currentNode === null) return 0;
        return 1 + this.#getSize(currentNode.right) + this.#getSize(currentNode.left);
    }
    getSize () {
        return this.#getSize(this.root);
    }

    /**
     * Returns the maximum depth (or height) of the tree (i.e., the length 
     * of the longest path from the root to a leaf).
     * 
     * O(n)
     */
    #height (currentNode) {
        if (currentNode === null) return 0;

        return 1 + Math.max(this.#height(currentNode.right), this.#height(currentNode.left));
    }
    height () {
        return this.#height(this.root);
    }

    /**
     * Returns the node (or the value) with the minimum value in the tree (e.g., in a BST, 
     * you follow left pointers until reaching the leftmost node).
     * 
     * best case: O(log(n))
     * worst: O(n)
     */
    #findMin (currentNode) {
        if (currentNode.left === null) return currentNode.value;

        return this.#findMin(currentNode.left);
    }
    findMin () {
        if (this.isEmpty()) return;

        return this.#findMin(this.root);
    }

    /**
     * Returns the node (or the value) with the maximum value in the tree 
     * (e.g., in a BST, you follow right pointers until reaching the rightmost node).
     * 
     * best case: O(log(n))
     * worst: O(n)
     */
    #findMax (currentNode) {
        if (currentNode.right === null) return currentNode.value;

        return this.#findMax(currentNode.right);
    }
    findMax () {
        if (this.isEmpty()) return;

        return this.#findMax(this.root);
    }

    /**
     * Removes all nodes from the tree (makes it empty).
     */
    clear () {
        this.root = null;
    }

    /**
     * Returns an array (or list) of all the tree’s values, often in a specified traversal order.
     */
    #toArray (currentNode, result) {
        if (currentNode === null) return result;

        this.#toArray(currentNode.right, result);
        result.unshift(currentNode.value);
        this.#toArray(currentNode.left, result);
        return result;
    }
    toArray () {
        if (this.isEmpty()) return [];

        return this.#toArray(this.root, []);
    }

    /**
     * Checks if the tree is “balanced,” meaning no subtree is unreasonably deeper than any other. 
     * (Exact definition can vary depending on balancing rules.)
     */
    isBalanced () {
        if (this.isEmpty()) return true;

        let rightSubtreeHeight = this.#height(this.root.right);
        let leftSubtreeHeight = this.#height(this.root.left);

        return Math.abs(rightSubtreeHeight - leftSubtreeHeight) > 1 ? false : true;

    }
}

// ================== BST Test Code ======================

/**
 * Helper function to run a test on the BST.
 *   name: string describing the test
 *   input: array of values to insert into the BST
 *   expectedArray: what we expect from bst.toArray() after insertion
 *   expectedMin: the minimum value we expect in the BST
 *   expectedMax: the maximum value we expect in the BST
 */
function runBSTTest(name, input, expectedArray, expectedMin, expectedMax) {
    console.log(`=== ${name} ===`);
    
    // Create a new BST and bulk insert all input values
    const bst = new BinarySearchTree();
    bst.bulkInsert(input);

    // Collect actual results
    const actualArray = bst.toArray();  // in-order array
    const actualMin = bst.findMin();
    const actualMax = bst.findMax();

    // Print input
    console.log("Input:         ", input);

    // Print expected vs actual for toArray
    console.log("Expected array:", expectedArray);
    console.log("Actual array:  ", actualArray);
    console.log("Pass array?    ", 
        JSON.stringify(actualArray) === JSON.stringify(expectedArray)
    );

    // Print expected vs actual for min
    console.log("Expected min:  ", expectedMin);
    console.log("Actual min:    ", actualMin);
    console.log("Pass min?      ", actualMin === expectedMin);

    // Print expected vs actual for max
    console.log("Expected max:  ", expectedMax);
    console.log("Actual max:    ", actualMax);
    console.log("Pass max?      ", actualMax === expectedMax);

    console.log("\n");
}

/**
 * Test basic insertion scenarios.
 */
function testBSTBasicCases() {
    // Empty
    runBSTTest(
        "Empty array",
        [],      // input
        [],      // expected in-order array
        undefined, // expectedMin
        undefined  // expectedMax
    );

    // Single
    runBSTTest(
        "Single element",
        [5],
        [5],
        5,
        5
    );

    // Already sorted
    runBSTTest(
        "Already sorted",
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        1,
        5
    );

    // Reverse sorted
    runBSTTest(
        "Reverse sorted",
        [5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5],
        1,
        5
    );

    // Random order
    runBSTTest(
        "Random order",
        [4, 2, 7, 1, 9, 3],
        [1, 2, 3, 4, 7, 9],
        1,
        9
    );
}

/**
 * Test various edge/corner cases.
 */
function testBSTEdgeCases() {
    // All same values — duplicates ignored by your BST
    // We expect only a single '3' to remain.
    runBSTTest(
        "All same values",
        [3, 3, 3, 3],
        [3],
        3,
        3
    );

    // Negative numbers
    runBSTTest(
        "With negatives",
        [0, -3, 2, -8, 7, 1],
        [-8, -3, 0, 1, 2, 7],
        -8,
        7
    );

    // Duplicates + negatives
    // The BST insert code ignores duplicates, so -1 will appear only once, 5 only once.
    runBSTTest(
        "Duplicates and negatives",
        [5, -1, 4, -1, 0, 5],
        [-1, 0, 4, 5],
        -1,
        5
    );
}

/**
 * Runs all BST tests.
 */
function runAllBSTTests() {
    testBSTBasicCases();
    testBSTEdgeCases();
}

// Finally, call the function to run everything.
runAllBSTTests();