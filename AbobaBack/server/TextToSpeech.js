const textToSpeech = require('@google-cloud/text-to-speech');
const axios = require('axios');
const fs = require('fs');
const util = require('util');
require('dotenv').config();
const jsonKey = require('../aboba-ai-ce22fbaafa2a.json');
console.log(jsonKey)

const { GoogleAuth } = require('google-auth-library');
const auth = new GoogleAuth({ keyFilename: './aboba-ai-ce22fbaafa2a.json', 
scopes: ['https://www.googleapis.com/auth/cloud-platform'] 
});

async function quickStart(voiceContent) {
    try {
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            responseType: 'blob'
        };

        const textToSpeechClient = new textToSpeech.TextToSpeechClient();

        const requestBody = {
            input: { text: voiceContent },
            voice: { languageCode: 'en-IN', name: 'en-IN-Wavenet-B', ssmlGender: 'MALE' },
            audioConfig: { audioEncoding: 'MP3' }
        };

        const [audioResponse] = await textToSpeechClient.synthesizeSpeech(requestBody);

        const writeFile = util.promisify(fs.writeFile);
        await writeFile('output.mp3', audioResponse.audioContent, 'binary');
        console.log('Audio content written to file: output.mp3');

        const response = await axios.post('https://texttospeech.googleapis.com/v1/text:synthesize', JSON.stringify(requestBody), config);
        const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
        return audioBlob;
    } catch (error) {
        console.log('Error in textToSpeech:', error);
        return null;
    }
}

module.exports = {
    quickStart,
};
