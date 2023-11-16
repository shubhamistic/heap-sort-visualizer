export function maxHeapify(array, arrayLength, index, stepsToSolve){
  let left = (2*index)+1;
  let right = ((2*index)+1)+1;
  let largest = index;
  let info = '';

  if((left < arrayLength) && (array[left] > array[index])){
    largest = left;

    // update info
    info += `${array[left]} is greater than ${array[index]}`
  }
  if((right < arrayLength) && (array[right] > array[largest])){
    // update info
    if (info) {info += ', '}
    info += `${array[right]} is greater than ${array[largest]}`

    largest = right;
  }

  // update info
  info += '.'

  if(largest !== index){
    let temp = array[index];
    array[index] = array[largest];
    array[largest] = temp;

    // update info
    info += ` ∴ swapping ${array[index]} and ${array[largest]}.`

    stepsToSolve.push({
      array: [...array],
      swap: [index, largest],
      currentIndex: index,
      leftChildIndex: (left < arrayLength) ? left : -1,
      rightChildIndex: (right < arrayLength) ? right : -1,
      info
    });

    maxHeapify(array, arrayLength, largest, stepsToSolve);
  }
}

export function buildMaxHeap(array){
  let stepsToSolve = [{
    array: [...array],
    highlightStartingFromIndex: array.length,
    info: 'Building Max heap.'
  }];

  for(let i = Math.floor(array.length/2) - 1 ; i >= 0 ; i--){
    maxHeapify(array, array.length, i, stepsToSolve);
  }

  stepsToSolve.push({
    array: [...array],
    highlightStartingFromIndex: 0,
    info: 'Max Heap Built.'
  });

  return stepsToSolve;
}