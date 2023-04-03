import axios from 'axios'
import { generateText } from './GPT';

const url = 'https://texttospeech.googleapis.com/v1/';
const apiKey = import.meta.env.VITE_TEXT_TO_SPEECH_API_KEY
const headers = {
    // 'Authorization': `${apiKey}`,
    // "X-User-ID": "DaXxPJKk52U1S2rZ3xoHEkFMme52",
    'Content-Type': 'audio/mp3'
}

export async function TextToSpeech(voice_content) {
    const data = {
        'input': {
            "text": `${voice_content}`,
        },
        'voice': {
            'languageCode': 'en-IN',
            'name': 'en-IN-Wavenet-B',
            'ssmlGender': 'MALE'
        },
        'audioConfig': {
            'audioEncoding': 'MP3'
        }
    };

    try {
        const response = await axios.post(`${url}text:synthesize?key=${apiKey}`, data, { headers: headers, responseType: 'blob' });
        const generatedVoice = new Blob([response.data], { type: 'audio/mp3' });
        console.log(generatedVoice)
        return generatedVoice;
    }
    catch (error) {
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