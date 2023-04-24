import React, { useState } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import AITextAnswer from '../Components/AITextAnswer'
import AskAI from '../Components/AskAI';

const AIAnswer = ({language}) => {
    console.log(language)
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');

    const SubmitText = async () => {
        setLoading(true)
        const generatedText = await generateText(inputValue);
        if (generatedText) {
            const generatedVoice = await TextToSpeech(generatedText, language.languageCode, language.value, language.gender);
            if (generatedVoice) {
                setOutputValue(generatedText);
                const byteArray = new Uint8Array(generatedVoice);
                const blob = new Blob([byteArray], { type: 'audio/mpeg' });
                const dataUrl = URL.createObjectURL(blob);
                setAudioUrl(dataUrl);
                setLoading(false)
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
