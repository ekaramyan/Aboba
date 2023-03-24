// import { Configuration, OpenAIApi } from "openai";
import axios from 'axios'

const baseURL = 'https://api.openai.com/v1';
// const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;
const apiKey = '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'

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        "OpenAI-Organization": "org-hx5M3UFBDsI9FP5Qd8gYDI3r"
    },
});

export async function generateText(prompt) {
    const response = await axiosInstance.post('/engines/davinci-codex/completions', {
        prompt,
        max_tokens: 150,
        n: 1,
        stop: "\n",
    });

    return response.data.choices[0].text.trim();
}