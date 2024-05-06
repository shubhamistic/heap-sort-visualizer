import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpLong
} from '@fortawesome/free-solid-svg-icons';
import '../styles/ExecutionLog.scss';
import { useAnimation } from '../hooks';
import CustomScrollbar from './CustomScrollbar';

export default function ExecutionLog() {
  const [arrayContainerWidth, setArrayContainerWidth] = useState(0);
  const [currentIndexDistance, setCurrentIndexDistance] = useState(0);
  const [leftChildIndexDistance, setLeftChildIndexDistance] = useState(0);
  const [rightChildIndexDistance, setRightChildIndexDistance] = useState(0);
  const [swapElementsLineDistance, setSwapElementsLineDistance] = useState(0);
  const [swapElementsLineWidth, setSwapElementsLineWidth] = useState(0);
  const [sortedUpToIndex, setSortedUpToIndex] = useState(undefined);
  const { arrayInfo, closeExecutionLogWindow, selectedOptionName } = useAnimation();

  useEffect(() => {
    if (!isArrayInfoEmpty()){
      const array = arrayInfo.array;
      setArrayContainerWidth(((array.length + 1) * 50) + array.length);

      if (arrayInfo.currentIndex >= 0) {
        setCurrentIndexDistance((arrayInfo.currentIndex + 1) * 51);
      }
      if (arrayInfo.leftChildIndex >= 0) {
        setLeftChildIndexDistance((arrayInfo.leftChildIndex + 1) * 51);
      }
      if (arrayInfo.rightChildIndex >= 0) {
        setRightChildIndexDistance((arrayInfo.rightChildIndex + 1) * 51);
      }
      if (arrayInfo.swap) {
        setSwapElementsLineDistance(((arrayInfo.swap[0] + 1) * 51) + 25)
        setSwapElementsLineWidth((arrayInfo.swap[1] - arrayInfo.swap[0]) * 51);
      }
      if (arrayInfo.highlightStartingFromIndex >= 0) {
        setSortedUpToIndex(arrayInfo.highlightStartingFromIndex);
      }
    }
  }, [arrayInfo]);

  const isArrayInfoEmpty = () => {return Object.keys(arrayInfo).length === 0;}

  return (
    <div
      className="execution-log"
      style={{
        animation: (closeExecutionLogWindow
          ? 'executionLogSlideDown 0.5s ease-in-out forwards'
          : 'executionLogSlideUp 0.5s ease-in-out forwards'
        )
      }}
    >
      <div className="execution-log-container">
        <CustomScrollbar>
          {/*Operation-Name*/}
          <div className="operation-name">
            <h2>{selectedOptionName}</h2>
          </div>

          {/*Swap-Line*/}
          <div
            className="swap-line"
            style={{ width: arrayContainerWidth }}
          >
            {arrayInfo.swap && (
              <div
                className="swap-line-container"
                style={{
                  left: swapElementsLineDistance,
                  width: swapElementsLineWidth
                }}
              >
                <p>SWAPPING</p>
                <div className="line"></div>
              </div>
            )}
          </div>

          {/*Array*/}
          {isArrayInfoEmpty && (
            <div
              className="el-array"
              style={{ width: arrayContainerWidth }}
            >
              <div className="el-array-element">
                <h3>Index</h3>
                <p>--></p>
              </div>
              {arrayInfo.array.map((element, elementIndex) => (
                <div
                  className="el-array-element"
                  key={`el-array-element-${elementIndex}`}
                >
                  <h3
                    style={{
                      background: (arrayInfo.swap
                        ? ((arrayInfo.swap[0] === elementIndex ||
                          arrayInfo.swap[1] === elementIndex) ? 'gray' : ''
                        )
                        : ''
                      )
                    }}
                  >
                    {elementIndex}
                  </h3>
                  <p
                    style={{
                      backgroundColor: (arrayInfo.swap
                        ? ((arrayInfo.swap[0] === elementIndex ||
                          arrayInfo.swap[1] === elementIndex)
                            ? 'goldenrod'
                            : (elementIndex >= sortedUpToIndex)
                              ? 'mediumseagreen' : ''
                          )
                        : (elementIndex >= sortedUpToIndex)
                          ? 'mediumseagreen' : ''
                      )
                    }}
                  >
                    {element}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/*Index-Pointers*/}
          <div
            className="index-pointers"
            style={{ width: arrayContainerWidth }}
          >
            {(arrayInfo.currentIndex >= 0) && (
              <div
                className="index-pointers-container current-index"
                style={{ left: currentIndexDistance }}
              >
                <div className="arrow-up-icon">
                  <FontAwesomeIcon icon={faArrowUpLong} className="icon"/>
                </div>
                <p>CURRENT INDEX</p>
              </div>
            )}
            {(arrayInfo.leftChildIndex >= 0) && (
              <div
                className="index-pointers-container left-child"
                style={{ left: leftChildIndexDistance }}
              >
                <div className="arrow-up-icon">
                  <FontAwesomeIcon icon={faArrowUpLong} className="icon"/>
                </div>
                <p>LEFT CHILD</p>
              </div>
            )}
            {(arrayInfo.rightChildIndex >= 0) && (
              <div
                className="index-pointers-container right-child"
                style={{ left: rightChildIndexDistance }}
              >
                <div className="arrow-up-icon ">
                  <FontAwesomeIcon icon={faArrowUpLong} className="icon"/>
                </div>
                <p>RIGHT CHILD</p>
              </div>
            )}
          </div>

          {/*Execution-Log-Info*/}
          <div className="execution-log-info">
            {arrayInfo.info && (
              <p>ⓘ&nbsp;{arrayInfo.info}</p>
            )}
          </div>
        </CustomScrollbar>
      </div>
    </div>
  );
}
