/**
 * A linked list is a linear data structure in which each element (often called a node) 
 * contains:
 * - Data: The value or information you want to store.
 * - Pointer/Reference: A link to the next node (and in some variations, a link 
 * to the previous node).
 */
// !!! Using a Standard (Non-Arrow) Function for a constructor-style function

function Node (value) {
    this.value = value;
    this.next = null;
}

function LinkedList () {
    this.start = null;
    this.tail = null;
}

/**
 * Check if there are no nodes in the list.
 * O(1)
 */
LinkedList.prototype.isEmpty = function () {
    return this.start === null;
}

/** Add a new node to the list. */
/** Prepend(value): nsert at the beginning of the list.
  * O(1)
  * */
LinkedList.prototype.prepend = function (value) {
    const newNode = new Node(value);

    newNode.next = this.start;
    this.start = newNode;
    if (this.tail === null) {
        this.tail = newNode;
    }
}

/**
 * Append(value): Insert at the end of the list.
 * O(1)
 */
LinkedList.prototype.append = function (value) {
    const newNode = new Node(value);

    if (this.tail === null) {
        this.start = newNode;
        this.tail = newNode;
        return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
}

/**
 * Insert(value, index): Insert at a specific position.
 * 0(n)
 */
LinkedList.prototype.insert = function (value, position) {
    // head
    if (position === 0) {
        this.prepend(value);
        return;
    }

    let currentNode = this.start, previousNode = null, currentPosition = 0;

    while (currentNode != null) {
        if (currentPosition === position) {
            const newNode = new Node(value);
            previousNode.next = newNode;
            newNode.next = currentNode;
            return;
        }

        previousNode = currentNode;
        currentNode = currentNode.next;
        currentPosition++;
    }


    // If we exit the loop, position >= the current length of the list
    // so we just append at the end:
    this.append(value);
} 

/**
 * Remove: Delete a node from the list.
 * Remove the first (head) node.
 * O(1)
 */
LinkedList.prototype.removeFirst = function () {
    if (this.isEmpty()) return;

    this.start = this.start.next;
    if (this.start === null) {
        this.tail = null;
    }
}

/**
 * Remove the last node.
 * O(n)
 */
LinkedList.prototype.removeLast = function () {
    if (this.isEmpty()) return;

    if (this.start === this.tail) {
        this.start = this.tail = null;
        return;
    }

    let currentNode  = this.start, previousNode = null;

    while (currentNode !== this.tail) {
        previousNode = currentNode;
        currentNode = currentNode.next;
    }

    previousNode.next = null;
    this.tail = previousNode;
}

/**
 * Remove the node at a given position.
 * O(n)
 */
LinkedList.prototype.removeAt = function (index) {
    if (index === 0) {
        this.removeFirst();
        return;
    }

    if (this.isEmpty()) return;


    let currentNode = this.start, currentPosition = 0, previousNode = null;

    while (currentNode !== null) {
        if (index === currentPosition) {
            previousNode.next = currentNode.next;
            if (currentNode === this.tail) {
                this.tail = previousNode;
            }
            return;
        }

        currentPosition++;
        previousNode = currentNode;
        currentNode = currentNode.next;
    }
}

/**
 * Remove the first node that matches a given value.
 * O(n)
 */
LinkedList.prototype.removeValue = function (value) {
    if (this.isEmpty()) return;

    let currentNode = this.start, previousNode = null;
    while (currentNode !== null) {
        if (value === currentNode.value) {
            if (currentNode === this.start) {
                this.removeFirst()
            } else if (currentNode === this.tail) {
                this.removeLast()
            } else {
                previousNode.next = currentNode.next;
            }
            return;
        }

        previousNode = currentNode;
        currentNode = currentNode.next;
    }
}

/**
 * Look at or return the first or last node without removing it.
 * Return the data in the head node.
 * O(1)
 */
LinkedList.prototype.getHead = function () {
    if (this.isEmpty()) return;

    return this.start.value;
}

/**
 * Return the data in the tail node.
 * O(1)
 */
LinkedList.prototype.getTail = function () {
    if (this.isEmpty()) return;
    
    return this.tail.value;
}

/**
 * Return how many nodes are in the list.
 * O(n)
 */
LinkedList.prototype.size = function () {
    if (this.isEmpty()) return 0;
    
    let currentNode = this.start, size = 0;
    while (currentNode !== null) {
        size++;
        currentNode = currentNode.next;
    }

    return size;
}

/**
 * Iterate through the list to process or display each node’s data.
 * Return string with all values divided by coma.
 * O(n)
 */
LinkedList.prototype.print = function () {
    if (this.isEmpty()) return "";

    let currentNode = this.start, result = [];
    while (currentNode !== null) {
        result.push(currentNode.value);
        currentNode = currentNode.next;
    }

    return result.join(",");
}

/**
 * Return true/false if the list contains a node with the given value.
 * O(n)
 */
LinkedList.prototype.contains = function (value) {
    if (this.isEmpty()) return false;

    let currentNode = this.start;
    while (currentNode !== null) {
        if (currentNode.value === value) {
            return true;
        }
        currentNode = currentNode.next;
    }
}

/**
 * Return the node (or its index) that has the given value.
 * O(n)
 */
LinkedList.prototype.find = function (value) {
    if (this.isEmpty()) return null;

    let currentNode = this.start;
    while (currentNode !== null) {
        if (currentNode.value === value) {
            return currentNode;
        }
        currentNode = currentNode.next;
    }
}

const test = () => {
    let linkedList = new LinkedList();
    console.log("Is empty:", linkedList.isEmpty());
    console.log("Append: 1, 2, 3, 1");
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(1);
    console.log("Print:");
    console.log(linkedList.print());
    console.log("Prepend: 8, 7, 5");
    linkedList.prepend(8);
    linkedList.prepend(7);
    linkedList.prepend(5);
    console.log("Print:");
    console.log(linkedList.print());
    console.log("Remove: 1");
    linkedList.removeValue(1);
    console.log("Remove: 10");
    linkedList.removeValue(10);
    console.log("Is empty:", linkedList.isEmpty());
    console.log("Print:");
    console.log(linkedList.print());
    console.log("Size:", linkedList.size());
    console.log("Find 8:", linkedList.find(8));
    console.log("Contains 8:", linkedList.contains(8));
    console.log("Head:", linkedList.getHead());
    console.log("Tail:", linkedList.getTail());
}

test();