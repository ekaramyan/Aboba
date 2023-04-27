import React, { useRef, useEffect } from 'react';

const SoundVisualizer = ({ audioUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Функция для рисования визуализации звука
    const draw = (dataArray) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / dataArray.length;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;

        ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    // Создаем аудио-элемент и подключаем к нему анализатор
    const audio = new Audio(audioUrl);
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    // Устанавливаем настройки анализатора
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Рисуем визуализацию звука каждые 16 миллисекунд
    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);
      draw(dataArray);
    };
    audio.play()
    audio.volume = 0
    renderFrame();
  }, [audioUrl]);

  return (
    <canvas ref={canvasRef} className='sound-visualizer' />
  );
};

export default SoundVisualizer;
