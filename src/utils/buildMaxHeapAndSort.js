import { buildMaxHeap, maxHeapify } from './buildMaxHeap';

function buildMaxHeapAndSortHelper(array, stepsToSolve) {
  for(let i = array.length - 1 ; i >= 1 ; i--) {
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    stepsToSolve.push({
      array: [...array],
      swap: [0, i],
      highlightStartingFromIndex: i,
      info: `Swapping ${array[0]} with ${array[i]}, elements starting from index ${i} are sorted.`
    });

    maxHeapify(array, i, 0, stepsToSolve);
  }
}

export function buildMaxHeapAndSort(array){
  let stepsToSolve = buildMaxHeap(array);

  buildMaxHeapAndSortHelper(array, stepsToSolve);

  return stepsToSolve;
}