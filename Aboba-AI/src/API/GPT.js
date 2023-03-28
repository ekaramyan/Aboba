import axios from 'axios'

const url = 'https://api.openai.com/v1';
const apiKey = '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'
const headers = {
    'Authorization': `Bearer ${apiKey}`,
    "OpenAI-Organization": "org-hx5M3UFBDsI9FP5Qd8gYDI3r",
    'Content-Type': 'application/json'
}

export async function generateText(prompt) {
    const data = {
        prompt: prompt,
        model: "text-davinci-003",
        max_tokens: 150,
        temperature: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
        logprobs: 1,
        stop: stop
    };


    try {
        const response = await axios.post(`${url}/completions`, data, { headers: headers });
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