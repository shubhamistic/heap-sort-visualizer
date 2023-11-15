export function maxHeapify(array, arrayLength, index, stepsToSolve){
  let left = (2*index)+1;
  let right = ((2*index)+1)+1;
  let largest = index;

  if((left < arrayLength) && (array[left] > array[index])){
    largest = left;
  }
  if((right < arrayLength) && (array[right] > array[largest])){
    largest = right;
  }

  if(largest !== index){
    let temp = array[index];
    array[index] = array[largest];
    array[largest] = temp;

    stepsToSolve.push({
      array: [...array],
      swap: [index, largest],
      currentIndex: index,
      leftChildIndex: (left < arrayLength) ? left : -1,
      rightChildIndex: (right < arrayLength) ? right : -1
    });

    maxHeapify(array, arrayLength, largest, stepsToSolve);
  }
}

export function buildMaxHeap(array){
  let stepsToSolve = [{
    array: [...array],
    highlightStartingFromIndex: array.length
  }];

  for(let i = Math.floor(array.length/2) - 1 ; i >= 0 ; i--){
    maxHeapify(array, array.length, i, stepsToSolve);
  }

  return stepsToSolve;
}