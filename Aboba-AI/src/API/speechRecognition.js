import { generateText } from './GPT'

const recognition = new window.webkitSpeechRecognition;
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
  
    console.log(transcript);
}

recognition.start();