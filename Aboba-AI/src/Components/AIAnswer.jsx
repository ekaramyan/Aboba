import React, { useState, useEffect } from 'react'
import { generateText } from '../API/GPT';
import { TextToSpeech } from '../API/voiceAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useSound } from 'use-sound';


const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputVoice, setinputVoice] = useState(null);
    const [outputVoice, setOutputVoice] = useState(null);
    const [loading, setLoading] = useState(false);
    //  const [isPlaying, setIsPlaying] = useState(false);


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
                    // const audioUrl = URL.createObjectURL(soundBlob);
                    // console.log("audioUrl:", audioUrl);
                    setOutputVoice(soundBlob);
                    console.log(outputVoice)
                }
                setLoading(false);
            } catch (error) {
                console.log("Error creating audio URL:", error);
                setLoading(false);
            }
        }
        // if (outputValue) {
        //     try {
        //         setLoading(true);
        //         const soundBlob = await TextToSpeech(outputValue);
        //         console.log('soundBlob type:', soundBlob.type);
        //         if (soundBlob) {
        //             setOutputVoice(soundBlob);
        //         }
        //         setLoading(false);
        //     } catch (error) {
        //         console.log("Error creating audio URL:", error);
        //         setLoading(false);
        //     }
        // }
    };

    const [playSound, { sound, stop }] = useSound(outputVoice, { volume: 0.5 });


    useEffect(() => {
        if (outputVoice) {
            const audioUrl = URL.createObjectURL(outputVoice); // создаем URL-адрес объекта Blob
            playSound({ sound: audioUrl }); // передаем URL-адрес в useSound
        }
        return () => {
            if (sound) {
                stop();
                URL.revokeObjectURL(sound);
            }
        };
    }, [outputVoice, playSound, stop]);

    // useEffect(() => {
    //     if (outputVoice) {
    //         const audioElement = new Audio();
    //         audioElement.src = URL.createObjectURL(outputVoice);
    //         audioElement.volume = 0.5;
    //         audioElement.play();
    //     }
    // }, [outputVoice]);

    const handlePlayClick = async (event) => {
        event.preventDefault();
        if (outputValue ) {
            // console.log(loaded)
            await handlePlay()
            console.log(outputVoice)
            playSound() // здесь вызываем функцию playSound, которая воспроизводит аудио
        }
    };

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
