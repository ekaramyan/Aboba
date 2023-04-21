import axios from 'axios';

const apiUrl = 'http://localhost:3001';

export async function TextToSpeech(voiceContent, language, name, gender) {
    try {
        const response = await axios.post(`${apiUrl}/synthesize`, { text: voiceContent, languageCode: language, name: name, ssmlGender: gender });
        const audioData = response.data.audioContent.data;
        console.log(audioData)
        return audioData;
    } catch (error) {
        console.error(error);
        return null
    }
}