import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const AskAI = ({ 
  clickSubmit,
  playSound,
  inputValue,
  setInputValue,
  outputValue,
  onEnterPress,
  loading }) => {


  return (
    <>
      <form>
        <div className='input__wrap'>
          <input
            type="text"
            placeholder='Input your request...✎'
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={onEnterPress}
          />
          <button
            className='talk'
            onClick={playSound}
            disabled={!outputValue || loading}
          >
            <FontAwesomeIcon icon={faVolumeHigh} style={{ color: "#fefefe" }} />
          </button>
          <button type="submit" onClick={clickSubmit}>Submit</button>
        </div>
      </form>
    </>
  );
};


export default AskAI;