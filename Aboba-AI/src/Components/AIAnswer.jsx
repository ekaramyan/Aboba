import React, { useState } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

{/* <FontAwesomeIcon icon="fa-solid fa-volume-high" style={{ color: "#000000", name: 'volume' }}/> */ }

const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setInputVoice] = useState();
    const [outputVoice, setOutputVoice] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const generatedText = await generateText(inputValue);
        if (generatedText) {
            setOutputValue(generatedText);
        }
    };
    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const generatedText = await generateText(inputValue);
            if (generatedText) {
                setOutputValue(generatedText);
            }
        }
    };
    if(outputValue){

    }

    return (
        <div className='ai-answer'>
            <div className='output'>
                <p>{outputValue}</p>
            </div>
            <form >
                <div className='input__wrap'>

                    <input type="text" placeholder='Input your request...✎'
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                        <button className='talk' ><FontAwesomeIcon icon={faVolumeHigh} style={{ color: "#000000" }} /></button>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>

            </form>
        </div>
    );
};

export default AIAnswer;
