import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateRight, faPlay, faPause,
  faChevronLeft, faChevronRight, faChevronDown, faChevronUp,
  faCaretUp, faCaretDown, faCaretLeft, faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Canvas.scss';
import { useAnimation } from '../hooks';
import TreeNode from './TreeNode';

export default function Canvas() {
  const CELL_SIZE = 30;
  const [grid, setGrid] = useState([[]]);
  const [isHeightApplied, setIsHeightApplied] = useState(false);
  const [isWidthApplied, setIsWidthApplied] = useState(false);
  const canvasRef = useRef(null);
  const speedUpBtnRef = useRef(null);
  const speedDownBtnRef = useRef(null);
  const prevStepBtnRef = useRef(null);
  const nextStepBtnRef = useRef(null);
  const {
    stepsToSolve, treeInfo, nextStepNumber,
    canvasHeight, setCanvasHeight, canvasMinHeight, setCanvasMinHeight,
    canvasWidth, setCanvasWidth, canvasMinWidth, setCanvasMinWidth,
    isAnimationRestarting, restartAnimation,
    isAnimationPaused, playAnimation, pauseAnimation, setExecutionTypeAutomatic,
    animationSpeedInMS, increaseSpeed, decreaseSpeed,
    closeSideBarWindow, toggleSideBarWindow,
    closeExecutionLogWindow, toggleExecutionLogWindow,
    incrementStepManually, decrementStepManually
  } = useAnimation();

  useEffect(() => {
    if (!isTreeEmpty()) {
      // adjust the canvas minimum size
      setCanvasMinHeight(treeInfo.level * 60);
      setCanvasMinWidth(Math.pow(2, treeInfo.level - 1) * 90);
    }
  }, [treeInfo])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
      if (!isTreeEmpty()) {
        // adjust the canvas size
        const canvasHeightRequired = treeInfo.level * 60;
        const canvasWidthRequired = Math.pow(2, treeInfo.level - 1) * 90;

        if (contentRect.height > canvasHeightRequired){setCanvasHeight(contentRect.height);}
        if (contentRect.width > canvasWidthRequired) {setCanvasWidth(contentRect.width);}

        if (canvasHeight < canvasHeightRequired) {setCanvasHeight(canvasHeightRequired);}
        if (canvasWidth < canvasWidthRequired) {setCanvasWidth(canvasWidthRequired);}

        setIsHeightApplied(true);
        setIsWidthApplied(true);
      } else {
        setCanvasHeight(contentRect.height);
        setCanvasWidth(contentRect.width);
      }
    });
    resizeObserver.observe(canvasRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    treeInfo,
    canvasMinHeight, setCanvasMinHeight, canvasHeight, setCanvasHeight,
    canvasMinWidth, setCanvasMinWidth, canvasWidth, setCanvasWidth
  ]);

  useEffect(() => {
    // make the square lines
    const noOfLinesHeightWise = Math.ceil(canvasHeight/CELL_SIZE);
    const noOfLinesWidthWise = Math.ceil(canvasWidth/CELL_SIZE);

    if (((grid.length !== noOfLinesHeightWise) ||
      (grid[0].length !== noOfLinesWidthWise)) &&
      (noOfLinesHeightWise > 0)
    ) {
      const newGrid = Array.from({ length: noOfLinesHeightWise },
        () => Array.from({ length: noOfLinesWidthWise }, () => 1)
      );

      setGrid(newGrid);
    }
  }, [canvasHeight, canvasWidth]);

  useEffect(() => {
    if (!isTreeEmpty() && closeSideBarWindow) {
      setCanvasMinWidth(canvasWidth + 300);
      sleep(500).then(() => setCanvasMinWidth(canvasWidth - 300));
    }
  }, [closeSideBarWindow]);

  useEffect(() => {
    if (!isTreeEmpty() && closeExecutionLogWindow) {
      setCanvasMinHeight(canvasHeight + 240);
      sleep(500).then(() => setCanvasMinHeight(canvasHeight - 240));
    }
  }, [closeExecutionLogWindow]);

  useEffect(() => {
    if (!isTreeEmpty()) {
      const handleKeyDown = (event) => {
        switch (event.key) {
          case 'ArrowUp':
            speedUpBtnRef.current.click();
            break;
          case 'ArrowDown':
            speedDownBtnRef.current.click();
            break;
          case 'ArrowLeft':
            prevStepBtnRef.current.click();
            break;
          case 'ArrowRight':
            nextStepBtnRef.current.click();
            break;
          default:
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [treeInfo]);

  const sleep = async (ms) => {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  const isTreeEmpty = () => {return Object.keys(treeInfo).length === 0;}

  const handlePlayAnimation = () => {
    setExecutionTypeAutomatic();
    playAnimation();
  }

  const handleRestartAnimation = () => {
    setExecutionTypeAutomatic();
    restartAnimation();
  }

  return (
    <div className="canvas" ref={canvasRef}>
      {grid.map((row, i) => (
        <div
          key={`grid-${i}`}
          className="row"
          style={{
            minHeight: CELL_SIZE,
            height: CELL_SIZE,
            width: (grid[0].length * CELL_SIZE)
          }}
        >
          {row.map((cell, j) => (
            <div
              key={`grid-${i}-${j}`}
              className="cell"
              style={{
                minWidth: CELL_SIZE,
                width: CELL_SIZE
              }}
            ></div>
          ))}
        </div>
      ))}

      <div
        className="canvas-draw"
        style={{
          minHeight: (!isTreeEmpty()
            ? (canvasMinHeight ? canvasMinHeight : '')
            : 'unset'
          ),
          minWidth: (!isTreeEmpty()
            ? (canvasMinWidth ? canvasMinWidth : '')
            : 'unset'
          ),
          height: (grid.length * CELL_SIZE),
          width: (grid[0].length * CELL_SIZE)
        }}
      >
        {!isTreeEmpty() && isHeightApplied && isWidthApplied && (
          <TreeNode nodeData={treeInfo} />
        )}
      </div>

      {/*switches*/}
      <div
        className="switch sidebar-switch toggle-sidebar"
        onClick={toggleSideBarWindow}
        style={{
          animation: (closeSideBarWindow
            ? 'toggleSideBarIconSlideLeft 0.5s ease-in-out forwards'
            : 'toggleSideBarIconSlideRight 0.5s ease-in-out forwards'
          )
        }}
      >
        {closeSideBarWindow ? (
          <FontAwesomeIcon icon={faChevronRight} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} className="icon" />
        )}
      </div>

      <div
        className="switch sidebar-switch restart-animation"
        onClick={handleRestartAnimation}
        style={{
          animation: (closeSideBarWindow
            ? 'toggleSideBarIconSlideLeft 0.5s ease-in-out forwards'
            : 'toggleSideBarIconSlideRight 0.5s ease-in-out forwards'
          ),
          visibility: (!isTreeEmpty() ? 'visible': 'hidden')
        }}
      >
        <FontAwesomeIcon
          icon={faRotateRight}
          className="icon"
          style={{
            color: (isAnimationRestarting ? 'tomato': ''),
            animation: (isAnimationRestarting ? 'spin 1s linear infinite' : '')
          }}
        />
      </div>

      <div
        className="switch sidebar-switch toggle-animation-status"
        onClick={isAnimationPaused ? handlePlayAnimation : pauseAnimation}
        style={{
          animation: (closeSideBarWindow
            ? 'toggleSideBarIconSlideLeft 0.5s ease-in-out forwards'
            : 'toggleSideBarIconSlideRight 0.5s ease-in-out forwards'
          ),
          visibility: (!isTreeEmpty() ? 'visible': 'hidden')
        }}
      >
        {isAnimationPaused ? (
          <FontAwesomeIcon icon={faPlay} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faPause} className="icon" />
        )}
      </div>

      {!isTreeEmpty() && (
        <div
          className="switch execution-log-switch"
          onClick={toggleExecutionLogWindow}
          style={{
            animation: (closeExecutionLogWindow
              ? 'toggleExecutionLogIconSlideDown 0.5s ease-in-out forwards'
              : 'toggleExecutionLogIconSlideUp 0.5s ease-in-out forwards'
            )
          }}
        >
          {closeExecutionLogWindow ? (
            <FontAwesomeIcon icon={faChevronUp} className="icon" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="icon" />
          )}
        </div>
      )}

      {!isTreeEmpty() && (
        <div className="canvas-operation">
          <div className="btn-container">
            <div className="stat speed-stat">
              <p>STEP</p>
              <h3>{nextStepNumber}/{stepsToSolve.length - 1}</h3>
            </div>

            <button
              className="vertical-btn"
              ref={speedUpBtnRef}
              onClick={increaseSpeed}
            >
              <FontAwesomeIcon icon={faCaretUp} className="icon" />
              <p>SPEED</p>
            </button>

            <div className="stat speed-stat">
              <p>SPEED</p>
              <h3>{(100 - (animationSpeedInMS - 500)/100)}%</h3>
            </div>
          </div>

          <div className="btn-container">
            <button
              className="horizontal-btn"
              ref={prevStepBtnRef}
              onClick={decrementStepManually}
            >
              <FontAwesomeIcon icon={faCaretLeft} className="icon" />
              <p>STEP</p>
            </button>

            <button
              className="vertical-btn"
              ref={speedDownBtnRef}
              onClick={decreaseSpeed}
            >
              <p>SPEED</p>
              <FontAwesomeIcon icon={faCaretDown} className="icon" />
            </button>

            <button
              className="horizontal-btn"
              ref={nextStepBtnRef}
              onClick={incrementStepManually}
            >
              <p>STEP</p>
              <FontAwesomeIcon icon={faCaretRight} className="icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}