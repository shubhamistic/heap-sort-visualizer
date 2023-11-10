function getNodeXCoordinate(nodeIndex, heapTreeDepth) {
  const depthOfNode = Math.floor(Math.log2(nodeIndex + 1));
  const noOfNodesInBottomLevel = Math.pow(2, heapTreeDepth);
  const heapTreeMaxOccupiedWidth = (noOfNodesInBottomLevel * 90);
  const totalElementsUpToDepth = Math.pow(2, depthOfNode + 1) - 1;
  const maxElementsAtDepth = Math.pow(2, depthOfNode);

  return ((maxElementsAtDepth - ((totalElementsUpToDepth - 1) - nodeIndex) - 1) *
    (heapTreeMaxOccupiedWidth/maxElementsAtDepth)) + ((heapTreeMaxOccupiedWidth/maxElementsAtDepth)/2) - 30;
}

function getNodeYCoordinate(nodeIndex) {
  const depthOfNode = Math.floor(Math.log2(nodeIndex + 1));

  return ((depthOfNode + 1) * 30) + (depthOfNode * 30) - 30;
}

export function calculateTransitionCoordinates(selfNodeIndex, destinationNodeIndex, noOfElements){
  const heapTreeDepth = Math.floor(Math.log2(noOfElements));

  const xCoordinate = getNodeXCoordinate(destinationNodeIndex, heapTreeDepth) - getNodeXCoordinate(selfNodeIndex, heapTreeDepth);
  const yCoordinate = getNodeYCoordinate(destinationNodeIndex) - getNodeYCoordinate(selfNodeIndex);

  return [xCoordinate, yCoordinate];
}