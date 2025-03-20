/**
 * Doubly linked lists store references to both the previous and next nodes, 
 * allowing efficient insertion and removal at the head and tail in O(1) time.
 */
function Node (value) {
    this.value = value;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList () {
    this.head = this.tail = null;
}

/**
 * Is empty
 * 0(1)
 */
DoublyLinkedList.prototype.isEmpty = function () {
    return this.head === null;
}

/**
 * Insert (at head, at tail, after a given node)
 */
/**
 * Prepend: Insert value at head.
 * O(1)
 */
DoublyLinkedList.prototype.prepend = function (value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
        this.head = this.tail = newNode;
        return;
    }

    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
}
/**
 * Append: Insert at tail
 * O(1)
 */
DoublyLinkedList.prototype.append = function (value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
        this.head = this.tail = newNode;
        return;
    }

    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
}
/**
 * Insert after a given node. 
 * If node doesn't exist do nothing.
 * O(n)
 */
DoublyLinkedList.prototype.insert = function (node, value) {
    if (node === this.tail) {
        this.append(value);
        return;
    }

    const newNode = new Node(value);
    let currentNode = this.head;

    while (currentNode !== null) {
        if (currentNode === node) {
            newNode.next = currentNode.next;
            newNode.prev = currentNode;
            currentNode.next.prev = newNode;
            currentNode.next = newNode;
            return;
        }
        currentNode = currentNode.next;
    }
}

/**
 * Delete (head, tail, or by value)
 */
/**
 * Pop front: Delete head
 * O(1)
 */
DoublyLinkedList.prototype.popFront = function () {
    if (this.isEmpty()) {
        return null;
    }

    const removedHead = this.head;
    if (this.head === this.tail) {
        this.head = this.tail = null;
        return removedHead;
    }

    this.head = this.head.next;
    this.head.prev = null;
    removedHead.next = null;
    return removedHead;
}

/**
 * Pop back: Delete tail
 * O(1)
 */
DoublyLinkedList.prototype.popBack = function () {
    if (this.isEmpty()) {
        return null;
    }

    const removedTail = this.tail;
    if (this.head === this.tail) {
        this.head = this.tail = null;
        return removedTail;
    }

    this.tail = this.tail.prev;
    this.tail.next = null;
    removedTail.prev = null;
    return removedTail;
}
/**
 * Delete by value.
 * O(n)
 */
DoublyLinkedList.prototype.remove = function (value) {

    let currentNode = this.head;
    while (currentNode !== null) {
        if (currentNode.value === value) {
            if (currentNode === this.head) {
                return this.popFront();
            } else if (currentNode === this.tail) {
                return this.popBack();
            } else {
                currentNode.prev.next = currentNode.next;
                currentNode.next.prev = currentNode.prev;
                currentNode.next = currentNode.prev = null;
                return currentNode;
            }
        }
        currentNode = currentNode.next;
    }

    return null;
}
/**
 * Search by value.
 * O(n)
 */
DoublyLinkedList.prototype.search = function (value) {
    let currentNode = this.head;
    while (currentNode !== null) {
        if (currentNode.value === value) return currentNode;
        currentNode = currentNode.next;
    }

    return null;
}

/**
 * Get size.
 * 0(n)
 */
DoublyLinkedList.prototype.size = function () {
    let currentNode = this.head, counter = 0;
    while (currentNode !== null) {
        counter++;
        currentNode = currentNode.next;
    }

    return counter;
}

/**
 * Traversals.
 */
/**
 * Forward traversal. Will return string with values divided by coma.
 * O(n)
 */
DoublyLinkedList.prototype.traverseForward = function () {
    let result = [], currentNode = this.head;

    while (currentNode !== null) {
        result.push(currentNode.value);
        currentNode = currentNode.next;
    }

    return result.join(",");
}

/**
 * Backward traversal. Will return string with values divided by coma.
 * O(n)
 */
DoublyLinkedList.prototype.traverseBackward = function () {
    let result = [], currentNode = this.tail;

    while (currentNode !== null) {
        result.push(currentNode.value);
        currentNode = currentNode.prev;
    }
    return result.join(",");
}

/**
 * Clear (remove all nodes).
 * O(n)
 */
DoublyLinkedList.prototype.clear = function () {
    let currentNode = this.head;
    while (currentNode !== null) {
        this.head = currentNode.next;
        currentNode.next = null;
        if (this.head !== null) {
            this.head.prev = null;
        }
        currentNode = this.head;
    }

    this.tail = null;
}


/**
 * Clear (remove all nodes).
 * 
 * !!! In JavaScript, once no references remain to a node, the garbage 
 * collector can free that memory.
 * O(1)
 */
DoublyLinkedList.prototype.clearSimplerVersion = function () {
    this.head = this.tail = null;
}


function testInsertAndTraverse() {
    const list = new DoublyLinkedList();
    console.log("Is empty initially?", list.isEmpty());
    console.log("Prepend: 10, 20, 30");
    list.prepend(10);
    list.append(20);
    list.append(30);
    console.log("List forward:", list.traverseForward());
    console.log("List backward:", list.traverseBackward());
    console.log("Is empty now?", list.isEmpty());
    console.log("Size:", list.size());
}

function testPopFrontAndPopBack() {
    const list = new DoublyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    console.log("Before pops:", list.traverseForward());
    console.log("popFront() =>", list.popFront().value);
    console.log("After popFront:", list.traverseForward());
    console.log("popBack() =>", list.popBack().value);
    console.log("After popBack:", list.traverseForward());
    console.log("popBack() =>", list.popBack().value);
    console.log("After last pop:", list.traverseForward());
    console.log("popFront() on empty =>", list.popFront());
}

function testRemoveAndSearch() {
    const list = new DoublyLinkedList();
    list.append("apple");
    list.append("banana");
    list.append("cherry");
    list.append("date");

    console.log("List forward:", list.traverseForward());
    console.log("search('cherry') =>", list.search("cherry"));
    console.log("remove('banana') =>", list.remove("banana"));
    console.log("remove('xyz') =>", list.remove("xyz"));
    console.log("After remove:", list.traverseForward());
}

function testInsertAfterNode() {
    const list = new DoublyLinkedList();
    list.prepend("A");
    list.append("B");
    list.append("C");
    const nodeA = list.search("A"); 
    list.insert(nodeA, "X");

    console.log("After insert(A, X):", list.traverseForward());

    list.insert(list.tail, "Tail+1");
    console.log("After insert(tail, Tail+1):", list.traverseForward()); 
}

function testClearMethods() {
    const list = new DoublyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    console.log("Before clear:", list.traverseForward());

    list.clear();
    console.log("After clear:", list.traverseForward());
    console.log("Size after clear:", list.size());

    list.append(4);
    list.append(5);
    console.log("Before clearSimplerVersion:", list.traverseForward());
    
    list.clearSimplerVersion();
    console.log("After clearSimplerVersion:", list.traverseForward());
}

function runAllTests() {
    console.log("=== testInsertAndTraverse ===");
    testInsertAndTraverse();

    console.log("\n=== testPopFrontAndPopBack ===");
    testPopFrontAndPopBack();

    console.log("\n=== testRemoveAndSearch ===");
    testRemoveAndSearch();

    console.log("\n=== testInsertAfterNode ===");
    testInsertAfterNode();

    console.log("\n=== testClearMethods ===");
    testClearMethods();
}

runAllTests();
