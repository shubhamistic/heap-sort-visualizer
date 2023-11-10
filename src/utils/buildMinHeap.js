export function minHeapify(array, arrayLength, index, stepsToSolve){
  let left = (2*index)+1;
  let right = ((2*index)+1)+1;
  let smallest = index;

  if((left < arrayLength) && (array[left] < array[index])){
    smallest = left;
  }
  if((right < arrayLength) && (array[right] < array[smallest])){
    smallest = right;
  }

  if(smallest !== index){
    let temp = array[index];
    array[index] = array[smallest];
    array[smallest] = temp;

    stepsToSolve.push({
      array: [...array],
      swap: [index, smallest]
    });

    minHeapify(array, arrayLength, smallest, stepsToSolve);
  }
}

export function buildMinHeap(array){
  let stepsToSolve = [{
    array: [...array]
  }];

  for(let i = Math.floor(array.length/2) - 1 ; i >= 0 ; i--){
    minHeapify(array, array.length, i, stepsToSolve);
  }

  return stepsToSolve;
}