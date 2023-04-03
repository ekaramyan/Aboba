import React, { useState, useEffect } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';


const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [outputVoice, setOutputVoice] = useState(null);
    const [loading, setLoading] = useState(false);
    //  const [isPlaying, setIsPlaying] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const generatedText = await generateText(inputValue);
        if (generatedText) {
            setOutputValue(generatedText);
            const audio = await TextToSpeech(generatedText);
            if (audio instanceof Blob) {
                setAudioUrl(URL.createObjectURL(audio));
            }
        }
        setLoading(false);
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setLoading(true);
            const generatedText = await generateText(inputValue);
            if (generatedText) {
                setOutputValue(generatedText);
                const audio = await TextToSpeech(generatedText);
                if (audio instanceof Blob) {
                    setAudioUrl(URL.createObjectURL(audio));
                }
            }
            setLoading(false);
        }
    };

    const handlePlayClick = async (event) => {
        event.preventDefault();
        if (audioUrl) {
            const audio = new Audio(audioUrl.replace("localhost:5173", "localhost:3000").slice(5));
            audio.type = 'audio/mp3';
            console.log(audio)
            audio.play();
        }
    };


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
                    <button className='talk' onClick={handlePlayClick} disabled={!outputValue || loading}><FontAwesomeIcon icon={faVolumeHigh} style={{ color: "#000000" }} /></button>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            {loading && <p>Loading sound...</p>}
            {outputVoice && <audio src={URL.createObjectURL(audioUrl)} autoPlay />}
        </div>
    );
};

export default AIAnswer;
