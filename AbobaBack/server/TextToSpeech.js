const textToSpeech = require('@google-cloud/text-to-speech');
const axios = require('axios');
const fs = require('fs');
const util = require('util');
require('dotenv').config();
const jsonKey = require('../aboba-ai-ce22fbaafa2a.json');


const { GoogleAuth } = require('google-auth-library');
const auth = new GoogleAuth({
    keyFilename: './aboba-ai-ce22fbaafa2a.json',
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

async function quickStart(voiceContent, name, languageCode, ssmlGender) {
    console.log(name, languageCode, ssmlGender)
    try {
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();
        const token = await accessToken.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
        };

        const textToSpeechClient = new textToSpeech.TextToSpeechClient();
        const requestBody = {
            input: { text: voiceContent },
            voice: { languageCode: languageCode, name: name, ssmlGender: ssmlGender },
            audioConfig: { audioEncoding: 'MP3', volume: 1.5 }
        };

        const [audioResponse] = await textToSpeechClient.synthesizeSpeech(requestBody);
        return audioResponse;
    } catch (error) {
        console.log('Error in textToSpeech:', error);
        return null;
    }
}

module.exports = {
    quickStart,
};
