import { createContext } from 'react';
import { useProvideAnimation } from '../hooks/useProvideAnimation';

export const AnimationContext = createContext({
  array: [],
  setArray: () => {},
  lockArrayInput: false,
  lockButtonInput: false,
  buttons: {},
  restartAnimation: () => {},
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
  closeSideBar: false,
  toggleSideBar: () => {},
  executionType: '',
  nextStepNumber: 0,
  incrementStep: () => {},
  decrementStep: () => {},
  setExecutionTypeManual: () => {},
  setExecutionTypeAutomatic: () => {},
  treeInfo: {},
  isAnimationRestarting: false
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