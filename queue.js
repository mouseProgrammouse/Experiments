/**
 * A queue is a fundamental data structure in computer science that organizes 
 * elements in an ordered list, where the first element added (enqueued) is the 
 * first one that can be removed (dequeued). This behavior is summarized 
 * as FIFO (First In, First Out).
 * 
 * Basic Operations:
 * - Enqueue: Add an element to the “back” of the queue.
 * - Dequeue: Remove the element from the “front” of the queue and return it.
 * - Front (or Peek): Look at the element at the front without removing it.
 * - isEmpty: Check whether the queue has no elements.
 * 
 * All operations should be done in O(1) time.
 */
function Node (value) {
    this.value = value;
    this.next = null;
}

function Queue () {
    this.head = null;
    this.tail = null;
}

/**
 * isEmpty: Check whether the queue has no elements.
 * O(1)
 */
Queue.prototype.isEmpty = function () {
    return this.head === null;
}

/**
 * Enqueue: Add an element to the “back” of the queue.
 * O(1)
 */
Queue.prototype.enqueue = function (value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
        this.head = this.tail = newNode;
        return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
}

/**
 * Dequeue: Remove the element from the “front” of the queue and return it.
 * O(1))
 */

Queue.prototype.dequeue = function () {
    if (this.isEmpty()) {
        return;
    }

    const removedNode = this.head;
    if (this.head === this.tail) {
        this.head = this.tail = null;
        return removedNode;
    }

    this.head = this.head.next;
    removedNode.next = null;

    return removedNode;
}

/**
 * Front (or Peek): Look at the element at the front without removing it.
 */
Queue.prototype.peek = function () {
    if (this.isEmpty()) {
        return;
    }

    return this.head.value;
}

/**
 * Iterate through the queue to process or display each node’s data.
 * Return string with all values divided by coma.
 * O(n)
 */
Queue.prototype.print = function () {
    if (this.isEmpty()) return "";

    let currentNode = this.head, result = [];
    while (currentNode !== null) {
        result.push(currentNode.value);
        currentNode = currentNode.next;
    }

    return result.join(",");
}

function testEnqueueDequeue() {
    const queue = new Queue();
    console.log("=== testEnqueueDequeue ===");
    console.log("Is empty initially?", queue.isEmpty());
    console.log("Peek on empty:", queue.peek());
    console.log("Dequeue on empty:", queue.dequeue());
    queue.enqueue("A");
    queue.enqueue("B");
    queue.enqueue("C");
    console.log("After enqueues (A,B,C):", queue.print());
    console.log("Is empty now?", queue.isEmpty());
    console.log("Peek:", queue.peek());
    const removed1 = queue.dequeue();
    console.log("Dequeued:", removed1.value);
    console.log("Queue now:", queue.print());
    const removed2 = queue.dequeue();
    console.log("Dequeued:", removed2.value);
    console.log("Queue now:", queue.print());
    const removed3 = queue.dequeue();
    console.log("Dequeued:", removed3.value);
    console.log("Queue now:", queue.print());
    console.log("Is empty finally?", queue.isEmpty());
    console.log("\n");
}

function testMultipleOps() {
    const queue = new Queue();
    console.log("=== testMultipleOps ===");
    for (let i = 1; i <= 5; i++) {
        queue.enqueue(i);
    }
    console.log("Queue after enqueue 1..5:", queue.print());
    console.log("Dequeued:", queue.dequeue().value);
    console.log("Dequeued:", queue.dequeue().value);
    console.log("Queue now:", queue.print());
    queue.enqueue(6);
    queue.enqueue(7);
    console.log("Queue after enqueue 6,7:", queue.print());
    while (!queue.isEmpty()) {
        console.log("Dequeued:", queue.dequeue().value);
    }
    console.log("After dequeue all:", queue.print());
    console.log("Is empty?", queue.isEmpty()); 
    console.log("\n");
}

function testEdgeCases() {
    const queue = new Queue();
    console.log("=== testEdgeCases ===");
    console.log("Dequeue on empty:", queue.dequeue());
    console.log("Peek on empty:", queue.peek());
    queue.enqueue("X");
    queue.enqueue("Y");
    console.log("Queue after enqueues (X,Y):", queue.print());
    console.log("Dequeued:", queue.dequeue().value);
    console.log("Dequeued:", queue.dequeue().value);
    console.log("After removing all:", queue.print());
    console.log("Dequeue on empty again:", queue.dequeue());
    console.log("\n");
}


function runAllTests() {
    testEnqueueDequeue();
    testMultipleOps();
    testEdgeCases();
}

runAllTests();