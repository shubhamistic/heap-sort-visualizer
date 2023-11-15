import { buildMinHeap, minHeapify } from './buildMinHeap';

function buildMinHeapAndSortHelper(array, stepsToSolve) {
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

    minHeapify(array, i, 0, stepsToSolve);
  }
}

export function buildMinHeapAndSort(array){
  let stepsToSolve = buildMinHeap(array);

  buildMinHeapAndSortHelper(array, stepsToSolve);

  return stepsToSolve;
}