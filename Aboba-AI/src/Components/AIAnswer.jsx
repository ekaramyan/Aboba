import React, { useState, useEffect } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import AITextAnswer from './AITextAnswer'
import AskAI from './AskAI';
// import axios from 'axios';
// import FileSaver from 'file-saver';


const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');

    const SubmitText = async () => {
        setLoading(true)
        const generatedText = await generateText(outputValue);
        if (generatedText) {
            setLoading(false)
            const generatedVoice = await TextToSpeech(generatedText);
            if (generatedVoice) {
                setOutputValue(generatedText);
                const byteArray = new Uint8Array(generatedVoice);
                const blob = new Blob([byteArray], { type: 'audio/mpeg' });
                const dataUrl = URL.createObjectURL(blob);
                setAudioUrl(dataUrl);
            } else {
                console.error('Error generating audio file');
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        SubmitText()
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            SubmitText();
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
            <AITextAnswer data={outputValue} loading={loading} />
            <div className='ai-ask'>
                <AskAI
                    clickSubmit={handleSubmit}
                    playSound={handlePlayClick}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    outputValue={outputValue}
                    onEnterPress={handleKeyPress}
                    loading={loading}
                />
                {audioUrl && <audio src={audioUrl} autoPlay />}
            </div>
        </div>
    );
};

export default AIAnswer;
