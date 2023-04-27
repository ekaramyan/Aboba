import React, { useState } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import AITextAnswer from '../Components/AITextAnswer'
import AskAI from '../Components/AskAI';
// import  SoundVisualizer  from '../Animations/animateSound';

const AIAnswer = ({ language }) => {
    console.log(language)
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [isListening, setIsListening] = useState(false);

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
            audio.play();
        }
    };


    const handleListen = (e) => {
        e.preventDefault();
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
        const recognition = SpeechRecognition ? new SpeechRecognition() : null;
        if (recognition) {
            if (isListening === true) {
                recognition.stop();
                setIsListening(false);
                return;
            }

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.continuous = true || recognition.mozContinuous;
            recognition.interimResults = false || recognition.mozInterimResults;
            recognition.lang = language.languageCode;
            recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                setinputVoice(speechToText);
            };
            recognition.onend = () => {
                setIsListening(false);
            };
            recognition.start();
            console.log(isListening)
        }
        else {
            alert('There is no speech recognition in your browser');
        }
    };


    return (
        <div className='ai-chat'>
              
            {/* <SoundVisualizer audioUrl={audioUrl}/> */}
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
                    inputVoice={inputVoice}
                    handleListen={handleListen}
                    isListening={isListening}
                />

                {audioUrl && <audio src={audioUrl} autoPlay />}
            </div>
        </div>
    );
};

export default AIAnswer;
