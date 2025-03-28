/**
 * Quick sort is a divide-and-conquer algorithm. 
 * It works by choosing a pivot element and then organizing (or partitioning)
 * the rest of the elements into two groups:
 *  - Elements less than the pivot
 *  - Elements greater than the pivot
 * Then it recursively repeats this process for the two groups.
 */
const quickSort = (arr, start, end) => {
    if (start >= end) return;

    let pivot = end, i = start;
    while (i < pivot) {
        if (arr[i] >= arr[pivot]) {
            if (pivot - i === 1) {
                // just swap
                const temp = arr[pivot];
                arr[pivot] = arr[i];
                arr[i] = temp;
            }
            const temp = arr[pivot - 1];
            arr[pivot - 1] = arr[pivot];
            arr[pivot] = arr[i];
            arr[i] = temp;
            pivot--;
            continue;
        }
        i++;
    }
    // partitioning
    quickSort(arr, start, pivot - 1);
    quickSort(arr, pivot + 1, end);
}

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