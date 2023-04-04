import React, { useState, useEffect } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import FileSaver from 'file-saver';


const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [outputVoice, setOutputVoice] = useState(null);
    const [loading, setLoading] = useState(false);
    //  const [isPlaying, setIsPlaying] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');

    const SubmitText = async () => {
        const generatedText = await generateText(outputValue);
        if (generatedText) {
            setOutputValue(generatedText);
            const generatedVoice = await TextToSpeech(generatedText);
            if (generatedVoice) {
                const formData = new FormData();
                formData.append('file', generatedVoice, 'filename.extension');
                console.log(generatedVoice)
                const { data } = await axios.post('http://localhost:3001/generateaudio', generatedVoice, {
                    headers: {
                        body: formData,
                        // blob: generatedVoice,
                        // 'Content-Type': 'application/json'
                    }
                });
                console.log(fileUrl)
                setAudioUrl(data.fileUrl);
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
            const audio = new Audio('data:audio/mpeg;base64,' + audioUrl);
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
            {audioUrl && <audio src={audioUrl} autoPlay />}
        </div>
    );
};

export default AIAnswer;
