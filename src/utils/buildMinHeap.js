export function minHeapify(array, arrayLength, index, stepsToSolve){
  let left = (2*index)+1;
  let right = ((2*index)+1)+1;
  let smallest = index;
  let info = '';

  if((left < arrayLength) && (array[left] < array[index])){
    smallest = left;

    // update info
    info += `${array[left]} is smaller than ${array[index]}`
  }
  if((right < arrayLength) && (array[right] < array[smallest])){
    // update info
    if (info) {info += ', '}
    info += `${array[right]} is smaller than ${array[smallest]}`

    smallest = right;
  }

  // update info
  info += '.'

  if(smallest !== index){
    let temp = array[index];
    array[index] = array[smallest];
    array[smallest] = temp;

    // update info
    info += ` ∴ swapping ${array[index]} and ${array[smallest]}.`

    stepsToSolve.push({
      array: [...array],
      swap: [index, smallest],
      currentIndex: index,
      leftChildIndex: (left < arrayLength) ? left : -1,
      rightChildIndex: (right < arrayLength) ? right : -1,
      info
    });

    minHeapify(array, arrayLength, smallest, stepsToSolve);
  }
}

export function buildMinHeap(array){
  let stepsToSolve = [{
    array: [...array],
    highlightStartingFromIndex: array.length,
    info: 'Building Min heap.'
  }];

  for(let i = Math.floor(array.length/2) - 1 ; i >= 0 ; i--){
    minHeapify(array, array.length, i, stepsToSolve);
  }

  stepsToSolve.push({
    array: [...array],
    highlightStartingFromIndex: 0,
    info: 'Min Heap Built.'
  });

  return stepsToSolve;
}