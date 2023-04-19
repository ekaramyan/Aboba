import React, { useState, useEffect } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import AITextAnswer from './AITextAnswer'
// import axios from 'axios';
// import FileSaver from 'file-saver';


const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');

    const SubmitText = async () => {
        const generatedText = await generateText(outputValue);
        if (generatedText) {
            // setOutputValue(generatedText);
            console.log(outputValue)
            const generatedVoice = await TextToSpeech(generatedText);
            if (generatedVoice) {
                setOutputValue(generatedText);
                // console.log(outputValue)
                const byteArray = new Uint8Array(generatedVoice);
                const blob = new Blob([byteArray], { type: 'audio/mpeg' });
                const dataUrl = URL.createObjectURL(blob);
                // console.log(blob)
                setAudioUrl(dataUrl);
            } else {
                console.error('Error generating audio file');
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        SubmitText()
        setLoading(false);
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setLoading(true);
            SubmitText()
            setLoading(false);
        }
    };

    const handlePlayClick = async (event) => {
        event.preventDefault();
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.type = 'data:audio/mpeg'
            console.log(audio)
            audio.play();
        }
    };


    return (
        <div className='ai-chat'>
            <AITextAnswer data={outputValue}>{loading && <p>Loading text...</p>}dddddd</AITextAnswer>
            <div  className='ai-answer'>

                <form >
                    <div className='input__wrap'>
                        <input type="text" placeholder='Input your request...✎'
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className='talk'
                            onClick={handlePlayClick}
                            disabled={!outputValue || loading}>
                            <FontAwesomeIcon icon={faVolumeHigh}
                                style={{ color: "#fefefe" }} />
                        </button>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
                {loading && <p>Loading sound...</p>}
                {audioUrl && <audio src={audioUrl} autoPlay />}
            </div>
        </div>
    );
};

export default AIAnswer;
