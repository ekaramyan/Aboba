import axios from 'axios'

const sessionId = getCookie("session_id");
const url = 'https://api.openai.com/v1';
const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;
const headers = {
    'Authorization': `Bearer ${apiKey}`,
    "OpenAI-Organization": "org-hx5M3UFBDsI9FP5Qd8gYDI3r",
    'Content-Type': 'application/json'
}

export async function generateText(prompt) {
    console.log(prompt)
    const data = {
        prompt: prompt,
        model: "text-davinci-003",
        temperature: 0.75,
        max_tokens: 150,
        top_p: 0.8,
        frequency_penalty: 0,
        presence_penalty: 0,
    };

    try {
        const response = await axios.post(`${url}/completions`, data, { headers: headers });
        const generatedText = response.data.choices[0].text;
        const session_id = response.data.id;
        document.cookie = `session_id=${session_id}`;
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
function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
      return match[2];
    }
}

