import React, { useState } from 'react'
import { generateText } from '../API/GPT';

const AIAnswer = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const generatedText = await generateText(inputValue);
    //     if (generatedText) {
    //         console.log(response);
    //         setOutputValue(generatedText.data.choices[0].text);
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const generatedText = await generateText(inputValue);
        if (generatedText) {
            setOutputValue(generatedText);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Input:
                    <textarea
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>
                Output:
                <pre>{outputValue}</pre>
            </div>
        </div>
    );
};

export default AIAnswer;
