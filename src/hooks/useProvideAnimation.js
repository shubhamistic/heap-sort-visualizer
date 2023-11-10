import { useContext, useEffect, useState } from 'react';
import { AnimationContext } from '../providers/AnimationProvider';
import {
  buildMinHeap,
  buildMaxHeap,
  buildMinHeapAndSort,
  buildMaxHeapAndSort
} from '../utils';
import { createHeapTree } from '../utils/createHeapTree';

export const useAnimation = () => {
  return useContext(AnimationContext);
}

export const useProvideAnimation = () => {
  const [array, setArray] = useState([]);
  const [lockArrayInput, setLockArrayInput] = useState(false);
  const [lockButtonInput, setLockButtonInput] = useState(false);
  const [buttons, setButtons] = useState({});
  const [stepsToSolve, setStepsToSolve] = useState([]);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasMinHeight, setCanvasMinHeight] = useState(0);
  const [canvasMinWidth, setCanvasMinWidth] = useState(0);
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [nextStepNumber, setNextStepNumber] = useState(0);
  const [executionType, setExecutionType] = useState('');
  const [treeInfo, setTreeInfo] = useState({});
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const [isAnimationRestarting, setIsAnimatinRestarting] = useState(false);

  useEffect(() => {
    setArray(['', '', '']);
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: false,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: false
    });
    setNextStepNumber(0);
    setExecutionType('automatic');
  }, []);

  useEffect(() => {
    for (let i of array) {
      if (i === '' || i === '-') {
        setLockButtonInput(true);
        return;
      }
    }
    setLockButtonInput(false);
  }, [array]);

  const sleep = async (ms) => {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  const runAnimation = async (stepsToSolve, stepNumber) => {
    setIsAnimationRunning(true);

    let tree = {};

    if (stepNumber === 0) {
      createHeapTree(stepsToSolve[0].array, tree);
      setTreeInfo(tree);
      await sleep(1000);
    }
    else {
      tree = {};
      createHeapTree(stepsToSolve[stepNumber - 1].array, tree, stepsToSolve[stepNumber].swap);
      setTreeInfo(tree);
      await sleep(1500);

      tree = {};
      createHeapTree(stepsToSolve[stepNumber].array, tree);
      setTreeInfo(tree);
      await sleep(500);
    }

    setIsAnimationRunning(false);
  }

  useEffect(() => {
    if (executionType === 'automatic') {
      if (nextStepNumber < stepsToSolve.length) {
        runAnimation(stepsToSolve, nextStepNumber).then(() => incrementStep());
      }
    }
  }, [stepsToSolve, executionType, nextStepNumber]);

  useEffect(() => {
    if (isAnimationRestarting && !isAnimationRunning) {
      setIsAnimatinRestarting(false);
      setNextStepNumber(0);
      setExecutionTypeAutomatic();
    }
  }, [isAnimationRunning, isAnimationRestarting]);

  const selectBuildMinHeap = () => {
    setLockArrayInput(true);
    setButtons({
      buildMinHeap: true,
      buildMaxHeap: false,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: false
    });
    let newArray = [...array];
    setStepsToSolve(buildMinHeap(newArray));
    restartAnimation();
  }
  const selectBuildMaxHeap = () => {
    setLockArrayInput(true);
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: true,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: false
    });
    let newArray = [...array];
    setStepsToSolve(buildMaxHeap(newArray));
    restartAnimation();
  }
  const selectBuildMinHeapAndSort = () => {
    setLockArrayInput(true);
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: false,
      buildMinHeapAndSort: true,
      buildMaxHeapAndSort: false
    });
    let newArray = [...array];
    setStepsToSolve(buildMinHeapAndSort(newArray));
    restartAnimation();
  }
  const selectBuildMaxHeapAndSort = () => {
    setLockArrayInput(true);
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: false,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: true
    });
    let newArray = [...array];
    setStepsToSolve(buildMaxHeapAndSort(newArray));
    restartAnimation();
  }

  const toggleSideBar = () => {
    setCloseSideBar(!closeSideBar);
  }

  const incrementStep = () => {
    if (nextStepNumber < stepsToSolve.length){
      setNextStepNumber(nextStepNumber + 1);
    }
  }
  const decrementStep = () => {
    if (nextStepNumber > 0){
      setNextStepNumber(nextStepNumber - 1);
    }
  }
  const setExecutionTypeManual= () => {
    setExecutionType('manual');
  }
  const setExecutionTypeAutomatic = () => {
    setExecutionType('automatic');
  }
  const restartAnimation = () => {
    setIsAnimatinRestarting(true);
    setExecutionTypeManual();
    setNextStepNumber(0);
  }

  return {
    array,
    setArray,
    lockArrayInput,
    lockButtonInput,
    buttons,
    restartAnimation,
    selectBuildMinHeap,
    selectBuildMaxHeap,
    selectBuildMinHeapAndSort,
    selectBuildMaxHeapAndSort,
    canvasHeight,
    setCanvasHeight,
    canvasMinHeight,
    setCanvasMinHeight,
    canvasWidth,
    setCanvasWidth,
    canvasMinWidth,
    setCanvasMinWidth,
    closeSideBar,
    toggleSideBar,
    executionType,
    nextStepNumber,
    incrementStep,
    decrementStep,
    setExecutionTypeManual,
    setExecutionTypeAutomatic,
    treeInfo,
    isAnimationRestarting
  }
};