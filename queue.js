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

const test = () => {
    const q = new Queue();

    console.log(q.isEmpty());
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    console.log(q.print());
    console.log("isEmpty", q.isEmpty());
    console.log(q.peek());
    console.log(q.dequeue());
    console.log(q.dequeue());
    console.log(q.print());
    console.log(q.peek()); 
    console.log(q.dequeue()); 
    console.log(q.dequeue());
    console.log(q.print());
    console.log("isEmpty", q.isEmpty()); 
}

test();