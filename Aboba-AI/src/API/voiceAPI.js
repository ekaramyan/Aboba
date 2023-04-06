import axios from 'axios';

const apiUrl = 'http://localhost:3001'; // Замените на ваш URL бэкенда

export async function TextToSpeech(voiceContent) {
    try {
        const response = await axios.post(`${apiUrl}/synthesize`, { text: voiceContent });
        const audioData = response.data;
        console.log(audioData)
        // Дальнейшая обработка аудиоданных
        const filename = response.data.filename;
        return `${apiUrl}/audio/${filename}.mp3`;
    } catch (error) {
        console.error(error);
        return null
    }
}