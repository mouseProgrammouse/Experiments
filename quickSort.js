/**
 * Quick sort is a divide-and-conquer algorithm. 
 * It works by choosing a pivot element and then organizing (or partitioning)
 * the rest of the elements into two groups:
 *  - Elements less than the pivot
 *  - Elements greater than the pivot
 * Then it recursively repeats this process for the two groups.
 * 
 * Average Time Complexity: O(nlogn)
 * Best-Case Time Complexity: O(nlogn)
 * Worst-Case Time Complexity: O(n^2)
 */
const quickSort = (arr, start, end) => {
    // Base case: if the segment is empty or has one element, no need to sort
    if (start >= end) return;

    // Choose the last element as the pivot
    let pivot = end;
    // 'i' will iterate from 'start' to just before 'pivot'
    let i = start;

    // Partition the array around the pivot
    while (i < pivot) {
        // If current element is greater than or equal to the pivot's value
        if (arr[i] >= arr[pivot]) {

            // If pivot and current element are next to each other, just swap them
            if (pivot - i === 1) {
                const temp = arr[pivot];
                arr[pivot] = arr[i];
                arr[i] = temp;
            }

            // Otherwise, rotate three elements: 
            // the pivot moves to the position pivot-1, 
            // the element at pivot-1 moves to pivot, 
            // and arr[i] is swapped with the old pivot's value.
            const temp = arr[pivot - 1];
            arr[pivot - 1] = arr[pivot];
            arr[pivot] = arr[i];
            arr[i] = temp;

            // Decrement pivot to account for the newly placed element
            pivot--;
            continue;
        }

        // Move to the next element if current is smaller than pivot's value
        i++;
    }

    // Recursively sort the elements before and after the pivot
    quickSort(arr, start, pivot - 1);
    quickSort(arr, pivot + 1, end);
};

function runQuickSortTest(name, input, expected) {
    console.log(`=== ${name} ===`);
    const arr = [...input]; // clone to avoid mutation
    quickSort(arr, 0, arr.length - 1);
    console.log("Input:    ", input);
    console.log("Expected: ", expected);
    console.log("Actual:   ", arr);
    console.log("Pass?     ", JSON.stringify(arr) === JSON.stringify(expected));
    console.log("\n");
}

function testQuickSortBasicCases() {
    runQuickSortTest("Empty array", [], []);
    runQuickSortTest("Single element", [1], [1]);
    runQuickSortTest("Already sorted", [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);
    runQuickSortTest("Reverse sorted", [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]);
    runQuickSortTest("Random order", [4, 2, 7, 1, 9, 3], [1, 2, 3, 4, 7, 9]);
}

function testQuickSortEdgeCases() {
    runQuickSortTest("All same values", [3, 3, 3, 3], [3, 3, 3, 3]);
    runQuickSortTest("With negative numbers", [0, -3, 2, -8, 7, 1], [-8, -3, 0, 1, 2, 7]);
    runQuickSortTest("Duplicates and negatives", [5, -1, 4, -1, 0, 5], [-1, -1, 0, 4, 5, 5]);
}

function runAllQuickSortTests() {
    testQuickSortBasicCases();
    testQuickSortEdgeCases();
}

runAllQuickSortTests();