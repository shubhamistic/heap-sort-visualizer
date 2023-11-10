import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/TreeNode.scss';

export default function TreeNode(props) {
  const { nodeData } = props;
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setHeight((nodeData.level * 30) + ((nodeData.level - 1) * 30));
    const noOfNodesInBottomLevel = Math.pow(2, nodeData.level - 1);
    setWidth((noOfNodesInBottomLevel * 60) + ((noOfNodesInBottomLevel - 1) * 30));
  }, [nodeData.level]);

  const calculateLineWidth = (level) => {
    return (
      (((Math.pow(2, level - 2) * 60) + ((Math.pow(2, level - 2) - 1) * 30)) / 2 ) - 15
    );
  };

  return (
    <div
      className="tree-node"
      style={{
        height: (height ? height : 'unset'),
        width: (width ? width : 'unset'),
      }}
    >
      {nodeData.value && (
        <>
          <div className="tree-node-data">
            <div
              className="left-arrow"
              style={{
                width: (calculateLineWidth(nodeData.level)),
                visibility: (nodeData.left.value ? 'visible' : 'hidden')
              }}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className="icon"
              />
            </div>

            <div className="middle-container">
              <p
                style={{
                  backgroundColor: (nodeData.highlight ? 'tomato' : ''),
                  borderColor: (nodeData.highlight ? 'white' : ''),
                  transform: (nodeData.transitionCoordinates
                    ? `translate(${nodeData.transitionCoordinates[0]}px, ${nodeData.transitionCoordinates[1]}px)`
                    : 'none'
                  ),
                  transition: (nodeData.transitionCoordinates
                    ? 'transform 1.5s ease-in-out'
                    : 'none'
                  )
                }}
              >
                {nodeData.value}
              </p>

              <div className="middle-arrows">
                <div
                  className="middle-left-arrow"
                  style={{ visibility: (nodeData.left.value ? 'visible' : 'hidden') }}
                ></div>

                <div
                  className="middle-right-arrow"
                  style={{ visibility: (nodeData.right.value ? 'visible' : 'hidden') }}
                ></div>
              </div>
            </div>

            <div
              className="right-arrow"
              style={{
                width: (calculateLineWidth(nodeData.level)),
                visibility: (nodeData.right.value ? 'visible' : 'hidden')
              }}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className="icon"
              />
            </div>
          </div>
          <div
            className="tree-children"
            style={{
              height: (height ? (height - 60) : 'unset'),
              width: (width ? width : 'unset')
            }}
          >
            <TreeNode
              nodeData={nodeData.left}
            />
            <TreeNode
            nodeData={nodeData.right}
            />
          </div>
        </>
      )}
    </div>
  );
}
