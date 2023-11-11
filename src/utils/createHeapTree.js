import { calculateTransitionCoordinates } from './calculateTransitionCoordinates';

function createHeapTreeHelper(array, tree, nodeIndex, swap) {
  if (nodeIndex < array.length) {
    const leftChildIndex = (2 * nodeIndex) + 1;
    const rightChildIndex = ((2 * nodeIndex) + 1 ) + 1;

    tree.value = array[nodeIndex];
    tree.left = {
      value: null,
      level: tree.level - 1
    };
    tree.right = {
      value: null,
      level: tree.level - 1
    };

    if (swap) {
      if (nodeIndex === swap[0]) {
        tree.transitionCoordinates = calculateTransitionCoordinates(swap[0], swap[1], array.length);
      }
      if (nodeIndex === swap[1]) {
        tree.transitionCoordinates = calculateTransitionCoordinates(swap[1], swap[0], array.length);
      }
    }

    createHeapTreeHelper(array, tree.left, leftChildIndex, swap);
    createHeapTreeHelper(array, tree.right, rightChildIndex, swap);
  }
}

export function createHeapTree(array, swap=null){
  let tree = {
    value: null,
    level: Math.floor(Math.log2(array.length)) + 1
  };

  createHeapTreeHelper(array, tree, 0, swap);

  return tree;
}