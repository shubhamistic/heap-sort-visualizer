import { createContext } from 'react';
import { useProvideAnimation } from '../hooks';

export const AnimationContext = createContext({
  array: [],
  setArray: () => {},
  lockButtonInput: false,
  buttons: {},
  selectedOptionName: '',
  selectBuildMinHeap: () => {},
  selectBuildMaxHeap: () => {},
  selectBuildMinHeapAndSort: () => {},
  selectBuildMaxHeapAndSort: () => {},
  canvasHeight: 0,
  setCanvasHeight: () => {},
  canvasMinHeight: 0,
  setCanvasMinHeight: () => {},
  canvasWidth: 0,
  setCanvasWidth: () => {},
  canvasMinWidth: 0,
  setCanvasMinWidth: () => {},
  closeSideBarWindow: false,
  toggleSideBarWindow: () => {},
  closeExecutionLogWindow: false,
  toggleExecutionLogWindow: () => {},
  stepsToSolve: [],
  nextStepNumber: 0,
  treeInfo: {},
  arrayInfo: {},
  isAnimationRestarting: false,
  animationSpeedInMS: 0,
  increaseSpeed: () => {},
  decreaseSpeed: () => {},
  incrementStepManually: () => {},
  decrementStepManually: () => {},
  isAnimationPaused: false,
  playAnimation: () => {},
  pauseAnimation: () => {},
  setExecutionTypeAutomatic: () => {},
  restartAnimation: () => {}
});

export const AnimationProvider = ({ children }) => {
  const animation = useProvideAnimation();

  return (
    <AnimationContext.Provider
      value={animation}
    >
      {children}
    </AnimationContext.Provider>
  )
}