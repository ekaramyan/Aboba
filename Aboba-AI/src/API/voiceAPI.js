import axios from 'axios'

const url = 'https://play.ht/api/v1/';

export async function TextToSpeech() {

    try {
        const response = await axios.post(`${url}/convert`, data, { headers: headers });
        const generatedText = response.data.choices[0].text;
        return generatedText;
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