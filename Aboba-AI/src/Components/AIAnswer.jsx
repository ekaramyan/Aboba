import React, { useState } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';

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

    return (
        <div className='ai-answer'>
            <div className='output'>
                <p>{outputValue}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='input__wrap'>

                    <input type="text" placeholder='Input your request...✎'
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyPress={handleKeyPress}
                    />


                </div>
                <div className='controls'>
                    <button className='talk' />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AIAnswer;
