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
        // model: "text-davinci-002",
        max_tokens: 150,
        temperature: 0.3,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
        logprobs: 1,
        stop: stop
    };


    try {
        const response = await axios.post(`${url}/engines/davinci/completions`, data, { headers: headers });
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