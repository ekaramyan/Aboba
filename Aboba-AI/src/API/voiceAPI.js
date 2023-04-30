import axios from 'axios';

const apiUrl = 'http://172.20.10.3:3001'; // enter your PC ip

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