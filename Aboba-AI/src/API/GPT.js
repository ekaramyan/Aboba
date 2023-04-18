import axios from 'axios'


const url = 'https://api.openai.com/v1';
const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;
const headers = {
    'Authorization': `Bearer ${apiKey}`,
    "OpenAI-Organization": "org-hx5M3UFBDsI9FP5Qd8gYDI3r",
    'Content-Type': 'application/json'
}

export async function generateText(prompt) {
    const data = {
        prompt: prompt,
        model: "davinci-instruct-beta",
        max_tokens: 150,
        temperature: 0.5,
        top_p: 0.9,
        n: 1,
        stream: false,
        logprobs: null,
        // stop: "\n"
        
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