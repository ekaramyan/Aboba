import axios from 'axios';

const apiUrl = 'http://localhost:3001';

export async function TextToSpeech(voiceContent) {
    try {
        const response = await axios.post(`${apiUrl}/synthesize`, { text: voiceContent });
        const audioData = response.data.audioContent.data;
        return audioData;
    } catch (error) {
        console.error(error);
        return null
    }
}