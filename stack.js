/**
 * LIFO structure, can be implemented with an array or linked list.
 */
/** LIFO with array */
const stackWithArray = function () {
    this.stack = new Array();
    this.size = 0;
}

/**
 * Is empty? Returns true if the stack is empty, otherwise false.
 * O(1)
 */
stackWithArray.prototype.isEmpty = function () {
    return this.size === 0;
}

/**
 * Size. Returns the number of elements in the stack.
 * O(1)
 */
stackWithArray.prototype.sizeOf = function () {
    return this.size;
}

/**
 * Push. Adds an element to the top of the stack.
 * O(n)
 */
stackWithArray.prototype.push = function (value) {
    this.stack.push(value);
    this.size++;
}

/**
 * Pop. Removes and returns the top element. Throws an error if the stack is empty.
 * O(n)
 */
stackWithArray.prototype.pop = function () {
    if (this.isEmpty()) return;

    this.size--;
    return this.stack.pop();
}

/**
 * Peek. Returns the top element without removing it.
 * O(n)
 */
stackWithArray.prototype.peek = function () {
    if (this.isEmpty()) return;
    
    return this.stack[this.size - 1];
}


/**
 * Clear. Removes all elements from the stack.
 * O(1)
 */
stackWithArray.prototype.clear = function () {
    this.stack = [];
    this.size = 0;
}

/**
 * Print.
 * O(n)
 */
stackWithArray.prototype.print = function () {
    return this.stack.join(" -> ");
}

/**
 * Contains. Checks if a given value exists in the stack.
 * O(n)
 */
stackWithArray.prototype.contains = function (value) {
    return this.stack.includes(value);
}

/**
 * Reverses the order of elements in the stack.
 * O(n)
 */
stackWithArray.prototype.reverse = function () {
    let result = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
        result[this.size - i - 1] = this.stack[i];
    }

    this.stack = result;
}

/**
 * 
 */
/** LIFO with linked list */
const Node = function (value) {
    this.value = value;
    this.next = null;
}

const stackWithLinkedList = function () {
    this.head = null;
    this.size = 0;
}

/**
 * Is empty. Returns true if the stack is empty, otherwise false.
 * O(1)
 */
stackWithLinkedList.prototype.isEmpty = function () {
    return this.size === 0;
}

/**
 * Size. Returns the number of elements in the stack.
 * O(1)
 */
stackWithLinkedList.prototype.size = function () {
    return this.size;
}

/**
 * Peek. Returns the top element without removing it.
 * O(1)
 */
stackWithLinkedList.prototype.peek = function () {
    return this.isEmpty() ? undefined : this.head.value;
}

/**
 * Pop. Removes and returns the top element. Throws an error if the stack is empty.
 * O(1)
 */
stackWithLinkedList.prototype.pop = function () {
    if (this.isEmpty()) return;

    const removedNode = this.head;
    this.head = this.head.next;
    removedNode.next = null;
    this.size--;

    return removedNode;
}

/**
 * Push. Adds an element to the top of the stack.
 * O(1)
 */
stackWithLinkedList.prototype.push = function (value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
        this.head = newNode;
        this.size++;
        return;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.size++;
}

/**
 * Сlear. Removes all element from stack.
 * O(1)
 */
stackWithLinkedList.prototype.clear = function () {
    this.head = null;
    this.size = 0;
}

/**
 * Contains. Checks if a given value exists in the stack.
 * O(n)
 */
stackWithLinkedList.prototype.contains = function (value) {
    let currentNode = this.head;

    while (currentNode !== null) {
        if (currentNode.value === value) return true;
        currentNode = currentNode.next;
    }

    return false;
}

/**
 * Print. Returns the stack as a list (for debugging or visualization).
 * O(n)
 */
stackWithLinkedList.prototype.print = function () {
    let currentNode = this.head, output = [];
    while (currentNode !== null) {
        output.push(currentNode.value);
        currentNode = currentNode.next;
    }

    return output.join(" -> ")
}

/**
 * Reverse. Reverses the order of elements in the stack.
 * O(n)
 */
stackWithLinkedList.prototype.reverse = function () {
    let currentNode = this.head, reversedStack = new stackWithLinkedList();
    while (currentNode !== null) {
        reversedStack.push(currentNode.value)
        currentNode = currentNode.next;
    }

    this.head = reversedStack.head;
    this.size = reversedStack.size;
}

function testStacks() {
    const sArray = new stackWithArray();
    const sList = new stackWithLinkedList();

    const stacks = [sArray, sList];
    
    stacks.forEach((stack, i) => {
        console.log(`\n--- Testing stack ${i === 0 ? "Array" : "LinkedList"} ---`);

        stack.push(1);
        stack.push(2);
        stack.push(3);
        console.log("Print:", stack.print ? stack.print() : "not implemented");
        console.log("Peek:", stack.peek());
        console.log("Size:", stack.sizeOf ? stack.sizeOf() : stack.size);
        console.log("Contains 2:", stack.contains(2));
        console.log("Pop:", stack.pop());
        console.log("After pop:", stack.print ? stack.print() : "not implemented");
        stack.reverse();
        console.log("After reverse:", stack.print ? stack.print() : "not implemented");
        stack.clear();
        console.log("Is empty after clear:", stack.isEmpty());
    });
}

testStacks();
