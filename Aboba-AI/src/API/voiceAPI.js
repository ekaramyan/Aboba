import axios from 'axios'
import { generateText } from './GPT';

const url = 'https://play.ht/api/v1';
const apiKey = '08b1a25dcc294147b4c000039cf109b1'
const headers = {
    'Authorization': `Bearer ${apiKey}`,
    "X-User-ID": "DaXxPJKk52U1S2rZ3xoHEkFMme52",
    'Content-Type': 'application/json'
}
const voice_content = 'generateText';

export async function TextToSpeech() {
    const data = {
        "voice": 'Nolan',
        "content": `${voice_content}`,
        // "title": string, // Optional
        // "speed": string, // Optional
        // "preset": string // Optional
    };



    try {
        const response = await axios.post(`${url}/convert`, data, { headers: headers });
        const generatedVoice = response.data.choices[0].text;
        return generatedVoice;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

        } else {
            console.log('Error', error.message);
        }
        return null;
    }

}