import { useEffect, useRef, useState } from 'react';

const SoundVisualizer = ({ audioRef, isPlaying, setIsPlaying }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

console.log(isPlaying, isReady)

  useEffect(() => {
    console.log(audioRef)
    if (audioRef.current) {
      setIsReady(true);
    }
    else {
      setIsReady(false)
    }
    if(isPlaying===false){
      setIsReady(false)
    }
  },[audioRef, isPlaying]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(audioContext.destination);

    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      const width = canvas.width;
      const height = canvas.height;

      context.clearRect(0, 0, width, height);

      const barWidth = width / bufferLength;

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;

        const hue = i / bufferLength * 360;
        context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';

        const y = height / 2 - barHeight / 2;
        context.fillRect(x, y, barWidth, barHeight);

        x += barWidth + 1; // +1 is for a gap between bars
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    setIsReady(true);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [audioRef, isReady]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    const handleCanPlayThrough = () => {
      setIsReady(true);
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [audioRef]);

  return (
    <canvas ref={canvasRef}  className='sound-visualizer'></canvas>
  );
};

export default SoundVisualizer;
