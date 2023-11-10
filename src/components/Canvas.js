import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faChevronRight, faRotateRight, faPlay, faPause
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Canvas.scss';
import { useAnimation } from '../hooks/useProvideAnimation';
import TreeNode from './TreeNode';

export default function Canvas() {
  const CELL_SIZE = 30;
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState([[]]);
  const [isHeightApplied, setIsHeightApplied] = useState(false);
  const [iseWidthApplied, setIsWidthApplied] = useState(false);
  const {
    treeInfo,
    canvasHeight, setCanvasHeight, canvasMinHeight, setCanvasMinHeight,
    canvasWidth, setCanvasWidth, canvasMinWidth, setCanvasMinWidth,
    isAnimationRestarting, restartAnimation,
    executionType, setExecutionTypeManual, setExecutionTypeAutomatic,
    closeSideBar, toggleSideBar,
  } = useAnimation();

  useEffect(() => {
    // make the square lines
    const noOfLinesHeightWise = (canvasHeight/CELL_SIZE) + 1;
    const noOfLinesWidthWise = (canvasWidth/CELL_SIZE) + 1;

    // create the grid
    const newGrid = Array.from({ length: noOfLinesHeightWise }, (row, i) =>
      Array.from({ length: noOfLinesWidthWise }, (col, j) => `${i}-${j}`)
    );

    // set the grid
    setGrid(newGrid);
  }, [canvasHeight, canvasWidth]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
      if (!isTreeEmpty()) {
        // adjust the canvas size
        const canvasHeightRequired = (treeInfo.level * 30) + ((treeInfo.level - 1) * 30);
        const noOfNodesInBottomLevel = Math.pow(2, treeInfo.level - 1);
        const canvasWidthRequired = (noOfNodesInBottomLevel * 60) + ((noOfNodesInBottomLevel - 1) * 30);

        if (contentRect.height > canvasHeightRequired) {
          setCanvasHeight(contentRect.height);
        }
        if (contentRect.width > canvasWidthRequired) {
          setCanvasWidth(contentRect.width);
        }

        if (canvasMinHeight < canvasHeightRequired) {
          setCanvasMinHeight(canvasHeightRequired);
        }
        if (canvasMinWidth < canvasWidthRequired) {
          setCanvasMinWidth(canvasWidthRequired + 30);
        }

        if (canvasHeight < canvasHeightRequired) {
          setCanvasHeight(canvasHeightRequired);
        }
        if (canvasWidth < canvasWidthRequired) {
          setCanvasWidth(canvasWidthRequired);
        }

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

  const isTreeEmpty = () => {
    return Object.keys(treeInfo).length === 0;
  }

  return (
    <div
      className="canvas"
      ref={canvasRef}
    >
      <div
        className="sidebar-switch toggle-sidebar"
        onClick={toggleSideBar}
        style={{
          animation: (closeSideBar
            ? 'toggleSideBarIconSlideLeft 0.5s ease-in-out forwards'
            : 'toggleSideBarIconSlideRight 0.5s ease-in-out forwards'
          )
        }}
      >
        {closeSideBar ? (
          <FontAwesomeIcon
            icon={faChevronRight}
            className="icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="icon"
          />
        )}
      </div>

      <div
        className="sidebar-switch restart-animation"
        onClick={restartAnimation}
        style={{
          animation: (closeSideBar
            ? 'toggleSideBarIconSlideLeft 0.5s ease-in-out forwards'
            : 'toggleSideBarIconSlideRight 0.5s ease-in-out forwards'
          )
        }}
      >
        <FontAwesomeIcon
          icon={faRotateRight}
          className="icon"
          style={{
            animation: (isAnimationRestarting
              ? 'spin 1s linear infinite'
              : ''
            )
          }}
        />
      </div>

      <div
        className="sidebar-switch toggle-animation-status"
        onClick={(executionType === 'automatic')
          ? setExecutionTypeManual
          : setExecutionTypeAutomatic
        }
        style={{
          animation: (closeSideBar
            ? 'toggleSideBarIconSlideLeft 0.5s ease-in-out forwards'
            : 'toggleSideBarIconSlideRight 0.5s ease-in-out forwards'
          ),
          visibility: (!isTreeEmpty() ? 'visible': 'hidden')
        }}
      >
        {(executionType === 'automatic') ? (
          <FontAwesomeIcon
            icon={faPause}
            className="icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            className="icon"
          />
        )}
      </div>

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
            : '100%'
          ),
          minWidth: (!isTreeEmpty()
            ? (canvasMinWidth ? canvasMinWidth : '')
            : 700
          ),
          height: (grid.length * CELL_SIZE),
          width: (grid[0].length * CELL_SIZE)
        }}
      >
        {!isTreeEmpty() && isHeightApplied && iseWidthApplied && (
          <TreeNode nodeData={treeInfo} />
        )}
      </div>
    </div>
  );
}
