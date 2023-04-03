import React, { useState, useEffect } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
// import base64js from 'base64-js';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { saveAs } from 'file-saver';


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
        const generatedText = await generateText(inputValue);
        if (generatedText) {
            setOutputValue(generatedText);
            setAudioUrl('');
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const generatedText = await generateText(inputValue);
            if (generatedText) {
                setOutputValue(generatedText);
                setAudioUrl('');
            }
        }
    };


    const handlePlayClick = async (event) => {
        event.preventDefault();
        const ff = createFFmpeg({ log: true });
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.type = 'audio/mpeg';
            audio.addEventListener('loadeddata', () => {
                audio.play().catch(error => {
                    console.log("Error playing audio:", error);
                });
            });
        } else if (outputValue) {
            setLoading(true);
            try {
                // Получаем звук с помощью TextToSpeech
                const soundBlob = await TextToSpeech(outputValue);
                if (soundBlob) {
                    // Загружаем ffmpeg
                    await ff.load();
                    // Конвертируем blob в mp3
                    // Конвертируем blob в mp3
                    await ff.FS('writeFile', 'sound.mp3', await fetch(soundBlob));
                    await ff.run('-i', 'sound.mp3', '-codec:a', 'libmp3lame', '-b:a', '128k', 'output.mp3');
                    const mp3Data = await ff.FS('readFile', 'output.mp3');


                    // Преобразуем полученные данные в blob
                    const byteArray = new Uint8Array(mp3Data.buffer);
                    const blob = new Blob([byteArray], { type: 'audio/mpeg' });

                    // удаляем все старые записи из localStorage
                    Object.keys(localStorage).forEach((key) => {
                        if (key.startsWith('audioUrl-')) {
                            localStorage.removeItem(key);
                        }
                    });
                    const filename = 'audio-' + Date.now() + '.mp3';
                    saveAs(blob, filename);
                    localStorage.setItem('audioUrl-' + filename, URL.createObjectURL(blob));
                    setAudioUrl(URL.createObjectURL(blob));
                }
            } catch (error) {
                console.log("Error saving audio to localStorage:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const audioUrls = Object.keys(localStorage).filter(key => key.startsWith('audioUrl-'));
        if (audioUrls.length > 0) {
            const lastAudioUrl = audioUrls[audioUrls.length - 1];
            const audio = new Audio(localStorage.getItem(lastAudioUrl));
            audio.type = 'audio/mpeg';
            audio.addEventListener('loadeddata', () => {
                audio.play().catch(error => {
                    console.log("Error playing audio:", error);
                });
            });
            setAudioUrl(localStorage.getItem(lastAudioUrl));
        }
    }, []);


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
            {outputVoice && <audio src={outputVoice} autoPlay />}
        </div>
    );
};

export default AIAnswer;
