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
        max_tokens: 60,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };

    return axios.post(`${url}/engines/davinci/completions`, data, { headers: headers })
        .then(response => console.log(response.data))
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error', error.message);
            }
        });
}
