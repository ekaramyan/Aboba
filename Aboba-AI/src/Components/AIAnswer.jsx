import React, { useState, useEffect } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useSound } from 'use-sound';

{/* <FontAwesomeIcon icon="fa-solid fa-volume-high" style={{ color: "#000000", name: 'volume' }}/> */ }

const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [outputVoice, setOutputVoice] = useState('');
    const [loading, setLoading] = useState(false);
    const [playSound, loaded] = useSound(outputVoice, { volume: 0.5 });

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


    const handlePlay = async () => {
        if (outputValue) {
            try {
                setLoading(true);
                const soundBlob = await TextToSpeech(outputValue);
                if (soundBlob) {
                    const audioUrl = URL.createObjectURL(soundBlob);

                    setLoading(false);
                    console.log("audioUrl:", audioUrl);

                    const audio = new Audio(audioUrl);

                    audio.addEventListener('canplaythrough', () => {
                        audio.play();
                        setOutputVoice(audio);
                    });

                }

            } catch (error) {
                console.log("Error creating audio URL:", error);
                setLoading(false);
            }

        }
    };


    //   const [playSound, { loaded }] = useSound();



    const handlePlayClick = (event) => {
        event.preventDefault();
        if (outputValue) {
            handlePlay();
            // playSound();
        }
    };
    
    useEffect(() => {
        if (loaded && outputVoice !== '') {
            const audio = new Audio(outputVoice);
            console.log(loaded)
            audio.addEventListener('canplaythrough', () => {
                console.log(loaded)
                playSound();
            });
        }
    }, [loaded, outputVoice, playSound]);
    // if (outputValue) {
    //     setTimeout(handlePlayClick, 1000)
    //     console.log(outputVoice)
    // }
    // console.log(outputVoice)

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
                    <button className='talk' onClick={handlePlayClick}><FontAwesomeIcon icon={faVolumeHigh} style={{ color: "#000000" }} /></button>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            {loading && <p>Loading sound...</p>}
        </div>
    );
};

export default AIAnswer;
