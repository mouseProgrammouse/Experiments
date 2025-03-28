/**
 * Merge sort is a divide-and-conquer algorithm that sorts a list by:
 * 
 * Divide: Split the list into two halves, recursively, until you have lists of size 1 or 0 (which are already sorted).
 * Conquer (Sort): Sort these small lists—though if they’re of size 1, they’re already sorted.
 * Merge: Combine the sorted sublists by comparing elements one by one and building a merged, sorted list.
 * 
 * This process repeats until all sublists come back together into one fully sorted list. It runs in:
 * O(nlogn) time on average and in the worst case, and typically uses additional.
 * O(n) space for merging.
 */
const merge = (leftArr, rightArr) => {
    const result = [];
    let r = 0, l = 0;

    while (l < leftArr.length && r < rightArr.length) {
        if (leftArr[l] <= rightArr[r]) {
            result.push(leftArr[l]);
            l++;
        } else {
            result.push(rightArr[r]);
            r++;
        }
    }

    return l < leftArr.length ? [...result, ...leftArr.slice(l)] : [...result, ...rightArr.slice(r)];
}

const mergeSort = (arr) => {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);

    const leftArr = mergeSort(arr.slice(0, mid));
    const rightArr = mergeSort(arr.slice(mid));

    return merge(leftArr, rightArr);
}

function runMergeSortTest(name, input, expected) {
    console.log(`=== ${name} ===`);
    const arr = [...input];  // clone to avoid mutating the original input
    const sorted = mergeSort(arr);

    console.log("Input:    ", input);
    console.log("Expected: ", expected);
    console.log("Actual:   ", sorted);

    // Compare the stringified outputs for simplicity
    const pass = JSON.stringify(sorted) === JSON.stringify(expected);
    console.log("Pass?     ", pass);
    console.log("");
}

// Basic test cases
function testMergeSortBasicCases() {
    runMergeSortTest("Empty array", [], []);
    runMergeSortTest("Single element", [1], [1]);
    runMergeSortTest("Already sorted", [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);
    runMergeSortTest("Reverse sorted", [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]);
    runMergeSortTest("Random order", [4, 2, 7, 1, 9, 3], [1, 2, 3, 4, 7, 9]);
}

// Edge test cases
function testMergeSortEdgeCases() {
    runMergeSortTest("All same values", [3, 3, 3, 3], [3, 3, 3, 3]);
    runMergeSortTest("With negative numbers", [0, -3, 2, -8, 7, 1], [-8, -3, 0, 1, 2, 7]);
    runMergeSortTest("Duplicates and negatives", [5, -1, 4, -1, 0, 5], [-1, -1, 0, 4, 5, 5]);
}

// Execute all tests
function runAllMergeSortTests() {
    testMergeSortBasicCases();
    testMergeSortEdgeCases();
}

runAllMergeSortTests();