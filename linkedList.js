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

function testInsertAndPrint() {
    const list = new LinkedList();
    console.log("=== testInsertAndPrint ===");
    console.log("Initially empty?", list.isEmpty());
    list.prepend("X");
    console.log("After prepend('X'):", list.print());
    list.append("Y");
    list.append("Z");
    console.log("After append('Y') & append('Z'):", list.print());
    console.log("Is empty now?", list.isEmpty());
    list.insert("NewHead", 0);
    console.log("After insert('NewHead', 0):", list.print());
    list.insert("Mid", 2);
    console.log("After insert('Mid', 2):", list.print());
    list.insert("BeyondEnd", 999);
    console.log("After insert('BeyondEnd', 999):", list.print());
    console.log("Size:", list.size());
    console.log("Head:", list.getHead());
    console.log("Tail:", list.getTail());
    console.log("\n");
}

function testRemoveFirstAndLast() {
    const list = new LinkedList();
    console.log("=== testRemoveFirstAndLast ===");
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    console.log("Initial list:", list.print());
    list.removeFirst();
    console.log("After removeFirst:", list.print());
    list.removeLast();
    console.log("After removeLast:", list.print());
    list.removeLast();
    list.removeLast();
    console.log("After removing everything:", list.print());
    list.removeFirst(); 
    console.log("removeFirst on empty:", list.print());
    console.log("\n");
}

function testRemoveAtAndRemoveValue() {
    const list = new LinkedList();
    console.log("=== testRemoveAtAndRemoveValue ===");
    list.append("A");
    list.append("B");
    list.append("C");
    list.append("D");
    list.append("E");
    console.log("Initial list:", list.print());
    list.removeAt(2);
    console.log("After removeAt(2):", list.print());
    list.removeValue("B");
    console.log("After removeValue('B'):", list.print());
    list.removeValue("XYZ");
    console.log("After removeValue('XYZ'):", list.print());
    list.removeAt(999);
    console.log("After removeAt(999):", list.print());
    console.log("\n");
}

function testGettersAndSearch() {
    const list = new LinkedList();
    console.log("=== testGettersAndSearch ===");

    list.append(10);
    list.append(20);
    list.append(30);
    console.log("List:", list.print());
    console.log("Head:", list.getHead());
    console.log("Tail:", list.getTail());
    console.log("Contains(20)?", list.contains(20));
    console.log("Contains(99)?", list.contains(99));
    const foundNode = list.find(20);
    console.log("find(20) => node with value:", foundNode ? foundNode.value : null);
    console.log("\n");
}

function testEdgeCases() {
    const list = new LinkedList();
    console.log("=== testEdgeCases ===");
    list.removeFirst();
    list.removeLast();
    list.removeAt(0);
    list.removeValue("nothing");
    console.log("After removals on empty list:", list.print());
    list.insert("FirstInsert", 0);
    console.log("After insert('FirstInsert', 0):", list.print());
    list.insert("Appended", 999);
    console.log("After insert('Appended', 999):", list.print());
    console.log("\n");
}

function runAllTests() {
    testInsertAndPrint();
    testRemoveFirstAndLast();
    testRemoveAtAndRemoveValue();
    testGettersAndSearch();
    testEdgeCases();
}

runAllTests();
