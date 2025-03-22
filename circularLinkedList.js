/**
 * A Circular Linked List is a variation of a linked list where the last 
 * node points back to the first node — forming a circle 
 */
class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}


class CircularLinkedList {
    constructor () {
        this.tail = null;
        this.size = 0;
    }

    /**
     * Adds a node to the end of the list (tail points to head).
     * O(1)
     */
    append (value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.tail = newNode;
            newNode.next = newNode;
            this.size++;
            return;
        }

        newNode.next = this.tail.next;
        this.tail.next = newNode; 
        this.size++;
        this.tail = newNode;
    }

    /**
     * Adds a node to the beginning of the list. Updates tail's next.
     * O(1)
     */
    prepend (value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.tail = newNode;
            newNode.next = newNode;
            this.size++;
            return;
        }

        let head = this.tail.next;
        newNode.next = head;
        this.tail.next = newNode;
        this.size++;
    }

    /**
     * Insert (value, index)
     * O(n)
     */
    insert (value, index) {
        const newNode = new Node(value);

        if (this.isEmpty() && index === 0) {
            this.tail = newNode;
            newNode.next = newNode;
            this.size++;
            return;
        }

        let currentNode = this.tail.next, i = 0, prevNode = this.tail;
        while (currentNode !== this.tail) {
            if (i === index) {
                prevNode.next = newNode;
                newNode.next = currentNode;
                this.size++;
                return;
            }
            i++;
            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        // insert into tail
        if (i === this.size) {
            newNode.next = currentNode.next;
            currentNode.next = newNode;
            this.tail = newNode;
            this.size++;
        }
    }

    /**
     * Removes a node at a specific index.
     * O(n)
     */
    remove (index) {
        if (this.isEmpty()) return;

        if (this.size === 1 && index === 0) {
            this.tail = null;
            this.size--;
            return;
        }

        let currentNode = this.tail.next, i = 0, prevNode = this.tail;
        while (currentNode !== this.tail) {
            if (i === index) {
                prevNode.next = currentNode.next;
                this.size--;
                return;
            }
            i++;
            prevNode = prevNode.next;
            currentNode = currentNode.next;
        }

        if (i === index) {
            prevNode.next = this.tail.next;
            this.tail = prevNode;
            this.size--;
        }
    }

    /**
     * Checks if a value exists in the list.
     * O(n)
     */
    contains (value) {
        if (this.isEmpty()) return false;

        let currentNode = this.tail.next;
        while (currentNode !== this.tail) {
            if (currentNode.value === value) {
                return true;
            }
            currentNode = currentNode.next;
        }
        
        return this.tail.value === value;
    }

    /**
     * Returns the node with the given value.
     * O(n)
     */
    find (value) {
        if (this.isEmpty()) return null;

        let currentNode = this.tail.next;
        while (currentNode !== this.tail) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        
        return this.tail.value === value ? this.tail : null;
    }

    /**
     * Checks if the list is empty.
     * O(1)
     */
    isEmpty () {
        return this.tail === null;
    }

    /**
     * Returns the number of nodes in the list.
     * O(1)
     */
    getSize () {
        return this.size;
    }

    /**
     * Returns a string representation of the list.
     * O(n)
     */
    print () {
        if (this.isEmpty()) return "";

        let currentNode = this.tail.next;
        let output = [];

        while (currentNode !== this.tail) {
            output.push(currentNode.value);
            currentNode = currentNode.next;
        }
        // deal with tail;
        output.push(this.tail.value);

        return output.join(" -> ");
    }

    /**
     * Empties the entire list. 
     * O(1)
     */
    clear () {
        this.tail = null;
    }

    /**
     * Returns node at a specific index.
     * O(n)
     */
    get (index) {
        let currentNode = this.tail.next, i = 0;
        while (currentNode !== this.tail) {
            if (i === index) {
                return currentNode;
            }
            i++;
            currentNode = currentNode.next;
        }

        if (index === i) {
            return this.tail;
        }

        return null;
    }

    /**
     * Updates the value of the node at a given index.
     * O(n)
     */
    set (index, value) {
        let currentNode = this.tail.next, i = 0;
        while (currentNode !== this.tail) {
            if (i === index) {
                currentNode.value = value;
                return;
            }
            i++;
            currentNode = currentNode.next;
        }

        if (index === i) {
            return this.tail.value = value;
        }
    }

    /**
     * Reverses the list in place (trickier in circular structure).
     * O(n)
     */
    reverse () {
        if (this.size < 2) {
            return;
        }

        let prevNode = this.tail, currentNode = prevNode.next, nextNode = currentNode.next;
        for (let i = 0; i < this.size; i++) {
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = nextNode;
            nextNode = nextNode.next;
        }

        this.tail = currentNode;
        this.tail = this.tail.next;
    }
}

function testCircularLinkedList() {
    const cll = new CircularLinkedList();
    console.log("▶️ Initial state:");
    console.log("isEmpty:", cll.isEmpty());
    console.log("print:", cll.print());
    console.log("\nAppend values: 10, 20, 30");
    cll.append(10);
    cll.append(20);
    cll.append(30);
    console.log("print:", cll.print());
    console.log("\nPrepend value: 5");
    cll.prepend(5);
    console.log("print:", cll.print());
    console.log("\nInsert value 15 at index 2");
    cll.insert(15, 2);
    console.log("print:", cll.print());
    console.log("\nContains 20?", cll.contains(20));
    console.log("Contains 99?", cll.contains(99));
    console.log("\nFind 15:", cll.find(15));
    console.log("Find 99:", cll.find(99));
    console.log("\nGet index 3:", cll.get(3).value);
    console.log("Set index 3 to 200");
    cll.set(3, 200);
    console.log("print:", cll.print());
    console.log("\nRemove index 0 (head)");
    cll.remove(0);
    console.log("print:", cll.print());
    console.log("Remove last element (tail)");
    cll.remove(cll.size - 1);
    console.log("print:", cll.print());
    console.log("Remove middle element");
    cll.remove(1);
    console.log("print:", cll.print());
    console.log("\nReverse");
    cll.reverse();
    console.log("print:", cll.print());
    console.log("\nClear");
    cll.clear();
    console.log("isEmpty:", cll.isEmpty());
    console.log("print:", cll.print());
}

testCircularLinkedList();
