import { useContext, useEffect, useState } from 'react';
import { AnimationContext } from '../providers';
import {
  buildMinHeap, buildMaxHeap,
  buildMinHeapAndSort, buildMaxHeapAndSort,
  createHeapTree
} from '../utils';

export const useAnimation = () => {
  return useContext(AnimationContext);
}

export const useProvideAnimation = () => {
  const [array, setArray] = useState([]);
  const [lockButtonInput, setLockButtonInput] = useState(false);
  const [selectedOptionName, setSelectedOptionName] = useState('');
  const [buttons, setButtons] = useState({});
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasMinHeight, setCanvasMinHeight] = useState(0);
  const [canvasMinWidth, setCanvasMinWidth] = useState(0);
  const [stepsToSolve, setStepsToSolve] = useState([]);
  const [treeInfo, setTreeInfo] = useState({});
  const [arrayInfo, setArrayInfo] = useState({});
  const [nextStepNumber, setNextStepNumber] = useState(0);
  const [closeSideBarWindow, setCloseSideBarWindow] = useState(false);
  const [closeExecutionLogWindow, setCloseExecutionLogWindow] = useState(false);
  const [executionType, setExecutionType] = useState('');
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const [isAnimationRestarting, setIsAnimationRestarting] = useState(false);
  const [animationSpeedInMS, setAnimationSpeedInMS] = useState(0);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  useEffect(() => {
    // initialization
    setArray(['', '', '']);
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: false,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: false
    });
    setNextStepNumber(0);
    setExecutionType('automatic');
    setAnimationSpeedInMS(1500);
  }, []);

  useEffect(() => {
    // array validation
    for (let i of array) {
      if (i === '' || i === '-') {
        setLockButtonInput(true);
        return;
      }
    }
    setLockButtonInput(false);
  }, [array]);

  useEffect(() => {
    // animation handler
    if (nextStepNumber < stepsToSolve.length) {
      if (executionType === 'automatic' && !isAnimationPaused){
        runAnimation(stepsToSolve, nextStepNumber).then(incrementStep);
      }
      if (executionType === 'manual' && !isAnimationPaused){
        runAnimation(stepsToSolve, nextStepNumber).then(pauseAnimation);
      }

      if (nextStepNumber === stepsToSolve.length - 1) {
        pauseAnimation();
      }
    }
  }, [stepsToSolve, executionType, nextStepNumber, isAnimationPaused]);

  useEffect(() => {
    // restart animation handler
    if (isAnimationRestarting && !isAnimationRunning) {
      if (executionType === 'automatic') {
        setNextStepNumber(0);
        setExecutionTypeAutomatic();
      }
      setIsAnimationRestarting(false);
      playAnimation();
    }
  }, [isAnimationRunning, isAnimationRestarting]);

  const sleep = async (ms) => {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  const runAnimation = async (stepsToSolve, stepNumber) => {
    setIsAnimationRunning(true);

    if (stepNumber === 0) {
      const initialTree = createHeapTree(stepsToSolve[0].array);
      setTreeInfo(initialTree);
      setArrayInfo(stepsToSolve[stepNumber]);
      await sleep(1000);
    }
    else {
      const transitionTree = createHeapTree(stepsToSolve[stepNumber - 1].array, stepsToSolve[stepNumber].swap);
      setTreeInfo(transitionTree);
      setArrayInfo({
        ...stepsToSolve[stepNumber],
        array: stepsToSolve[stepNumber - 1].array
      });
      await sleep(animationSpeedInMS);

      const resultTree = createHeapTree(stepsToSolve[stepNumber].array);
      setTreeInfo(resultTree);
      if (nextStepNumber === stepsToSolve.length - 1) {
        setArrayInfo({
          array: stepsToSolve[nextStepNumber].array,
          highlightStartingFromIndex: 0,
          info: getFinalInfo(buttons)
        });
      }
      await sleep(500);
    }

    setIsAnimationRunning(false);
  }

  const getFinalInfo = (options) => {
    if (options.buildMinHeap) {
      return 'Min Heap Built.';
    } else if (options.buildMaxHeap) {
      return 'Max Heap Built.';
    } else if (options.buildMinHeapAndSort) {
      return 'Array is sorted into descending order.';
    } else if (options.buildMaxHeapAndSort) {
      return 'Array is sorted into ascending order.';
    }
  }

  const selectBuildMinHeap = () => {
    setSelectedOptionName('buildMinHeap();');
    setButtons({
      buildMinHeap: true,
      buildMaxHeap: false,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: false
    });
    let newArray = [...array];
    setStepsToSolve(buildMinHeap(newArray));
    setExecutionTypeAutomatic();
    restartAnimation();
  }
  const selectBuildMaxHeap = () => {
    setSelectedOptionName('buildMaxHeap();');
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: true,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: false
    });
    let newArray = [...array];
    setStepsToSolve(buildMaxHeap(newArray));
    setExecutionTypeAutomatic();
    restartAnimation();
  }
  const selectBuildMinHeapAndSort = () => {
    setSelectedOptionName('buildMinHeapAndSort();');
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: false,
      buildMinHeapAndSort: true,
      buildMaxHeapAndSort: false
    });
    let newArray = [...array];
    setStepsToSolve(buildMinHeapAndSort(newArray));
    setExecutionTypeAutomatic();
    restartAnimation();
  }
  const selectBuildMaxHeapAndSort = () => {
    setSelectedOptionName('buildMaxHeapAndSort();');
    setButtons({
      buildMinHeap: false,
      buildMaxHeap: false,
      buildMinHeapAndSort: false,
      buildMaxHeapAndSort: true
    });
    let newArray = [...array];
    setStepsToSolve(buildMaxHeapAndSort(newArray));
    setExecutionTypeAutomatic();
    restartAnimation();
  }

  const toggleSideBarWindow = () => setCloseSideBarWindow(!closeSideBarWindow);
  const toggleExecutionLogWindow = () => setCloseExecutionLogWindow(!closeExecutionLogWindow)

  const incrementStep = () => {
    if (nextStepNumber < stepsToSolve.length - 1){
      setNextStepNumber(nextStepNumber + 1);
    }
  }
  const decrementStep = () => {
    if (nextStepNumber > 0){
      setNextStepNumber(nextStepNumber - 1);
    }
  }

  const incrementStepManually = () => {
    setExecutionTypeManual();
    restartAnimation();
    incrementStep();
  }
  const decrementStepManually = () => {
    setExecutionTypeManual();
    restartAnimation();
    decrementStep();
  }

  const increaseSpeed = () => {
    const newSpeed = animationSpeedInMS - 500;
    if (newSpeed >= 500) {setAnimationSpeedInMS(newSpeed);}
  }
  const decreaseSpeed = () => {
    const newSpeed = animationSpeedInMS + 500;
    if (newSpeed <= 10000) {setAnimationSpeedInMS(newSpeed);}
  }

  const setExecutionTypeManual= () => setExecutionType('manual');
  const setExecutionTypeAutomatic = () => setExecutionType('automatic');
  const playAnimation = () => setIsAnimationPaused(false);
  const pauseAnimation = () => setIsAnimationPaused(true);
  const restartAnimation = () => {
    pauseAnimation();
    setIsAnimationRestarting(true);
  }

  return {
    array,
    setArray,
    lockButtonInput,
    buttons,
    selectedOptionName,
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
    closeSideBarWindow,
    toggleSideBarWindow,
    closeExecutionLogWindow,
    toggleExecutionLogWindow,
    stepsToSolve,
    nextStepNumber,
    treeInfo,
    arrayInfo,
    isAnimationRestarting,
    animationSpeedInMS,
    increaseSpeed,
    decreaseSpeed,
    incrementStepManually,
    decrementStepManually,
    isAnimationPaused,
    playAnimation,
    pauseAnimation,
    setExecutionTypeAutomatic,
    restartAnimation
  }
};