import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/InputArray.scss';
import { useAnimation } from '../hooks';

export default function InputArray() {
  const [showAddInputButtons, setShowAddInputButtons] = useState([]);
  const [focusInputBoxIndex, setFocusInputBoxIndex] = useState(-1);
  const inputRefs = useRef([]);
  const {array, setArray} = useAnimation();

  useEffect(() => {
    const initializedArray = new Array(63).fill(false);
    setShowAddInputButtons(initializedArray);
  }, []);

  useEffect(() => {
    if (focusInputBoxIndex > -1) {
      handleShiftFocus(focusInputBoxIndex);
    }
  }, [focusInputBoxIndex]);

  const handleShiftFocus = (index) => {
    inputRefs.current[index].focus();
  };

  const handleKeyDownOnInputArray = (event, elementIndex) => {
    if (event.key === 'Enter') {
      if (array.length - 1 === elementIndex) {
        if (elementIndex < 62) {
          event.preventDefault();
          let newInputArray = [...array];
          newInputArray.push('');
          setArray(newInputArray);
          setFocusInputBoxIndex(newInputArray.length - 1);
        }
      } else {
        setFocusInputBoxIndex(elementIndex + 1);
      }
    }
  };

  const handleRemoveElementInput = (elementIndex) => {
    let newInputArray = [...array];

    if (array.length === 1) {
      newInputArray[0] = '';
    } else {
      newInputArray.splice(elementIndex, 1);
    }

    setArray(newInputArray);
  }

  const handleAddNewElementInput = (elementIndex) => {
    let newInputArray = [...array];
    newInputArray.splice(elementIndex, 0, '');
    setArray(newInputArray);
    setFocusInputBoxIndex(elementIndex);
    handleToggleAddInputButton(elementIndex - 1);
  }

  const handleElementInputChange = (event, elementIndex) => {
    const value = event.target.value;
    let newInputArray = [...array];

    if (value === '-' || value === ''){
      newInputArray[elementIndex] = value;
      setArray(newInputArray);
    }

    if (/^-?\d+$/.test(value) && parseInt(value) >= -999 && parseInt(value) <= 999) {
      newInputArray[elementIndex] = parseInt(value);
      setArray(newInputArray);
    }
  };

  const handleToggleAddInputButton = (elementIndex) => {
    if (array.length < 63) {
      let newShowAddInputButtons = [...showAddInputButtons];
      newShowAddInputButtons[elementIndex] = !newShowAddInputButtons[elementIndex];
      setShowAddInputButtons(newShowAddInputButtons);
    }
  }

  return (
    <div className="input-array">
      {array.map((element, elementIndex) => (
        <div
          key={elementIndex}
          className="input-element-outer"
        >
          <div
            className="input-element-inner"
            onKeyDown={(event) => handleKeyDownOnInputArray(event, elementIndex)}
            style={{
              width: (showAddInputButtons[elementIndex] ? 65 : 85)
            }}
          >
            <div className="input-element-index">
              <p>{elementIndex}:</p>
            </div>

            <div className="input-element">
              <input
                ref={(element) => (inputRefs.current[elementIndex] = element)}
                type="text"
                value={array[elementIndex]}
                onChange={(event) => handleElementInputChange(event, elementIndex)}
                onClick={() => setFocusInputBoxIndex(elementIndex)}
                placeholder="000"
                pattern="^-?\d+$"
              />
            </div>

            {!showAddInputButtons[elementIndex] && (
              <div
                className="input-element-remove"
                onClick={() => handleRemoveElementInput(elementIndex)}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="icon"
                />
              </div>
            )}
          </div>

          <div
            className="input-element-add"
            onMouseEnter={() => handleToggleAddInputButton(elementIndex)}
            onMouseLeave={() => handleToggleAddInputButton(elementIndex)}
            style={{
              width: (showAddInputButtons[elementIndex] ? 25 : 5)
            }}
          >
            {showAddInputButtons[elementIndex] && (
              <button
                onClick={() => handleAddNewElementInput(elementIndex + 1)}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon"
                />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
