import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faMicrophoneLines, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AskAI = ({
  clickSubmit,
  playSound,
  inputValue,
  setInputValue,
  outputValue,
  onEnterPress,
  loading,
  inputVoice,
  handleListen,
  isListening
}) => {

  useEffect(() => {
    setInputValue(inputVoice)
    console.log(inputVoice)
  }, [inputVoice])

  return (
    <>
      <form>
        <div className='input__wrap'>
          <input
            type="text"
            placeholder='Input your request...✎'
            value={inputValue || ''}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={onEnterPress}
          />

          <button
            className={`${isListening===true ? 'listening' : ''}`}
            onClick={handleListen}
            // {isListening ? 'Stop Listening' : 'Start Listening'}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faMicrophoneLines} style={{ color: "#fefefe" }} />
          </button>

          <button
            className='talk'
            onClick={playSound}
            disabled={!outputValue || loading}
          >
            <FontAwesomeIcon icon={faVolumeHigh} style={{ color: "#fefefe" }} />
          </button>
          <button type="submit" onClick={clickSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </>
  );
};


export default AskAI;