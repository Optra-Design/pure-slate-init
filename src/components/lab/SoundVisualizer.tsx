
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, Pause } from 'lucide-react';

const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 32 }, () => 20));
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [microphone, setMicrophone] = useState<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number>();

  const initAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyserNode = context.createAnalyser();
      const microphoneNode = context.createMediaStreamSource(stream);
      
      analyserNode.fftSize = 128;
      microphoneNode.connect(analyserNode);
      
      setAudioContext(context);
      setAnalyser(analyserNode);
      setMicrophone(microphoneNode);
      setIsListening(true);
      
      return { analyserNode };
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Fallback to demo mode
      startDemoMode();
    }
  };

  const startDemoMode = () => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 80 + 20));
    }, 100);
    setIsListening(true);
    return () => clearInterval(interval);
  };

  const analyzeAudio = () => {
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // Convert frequency data to bar heights
    const newBars = [];
    const barsCount = 32;
    const samplesPerBar = Math.floor(bufferLength / barsCount);

    for (let i = 0; i < barsCount; i++) {
      let sum = 0;
      for (let j = 0; j < samplesPerBar; j++) {
        sum += dataArray[i * samplesPerBar + j];
      }
      const average = sum / samplesPerBar;
      const height = Math.max(20, (average / 255) * 100);
      newBars.push(height);
    }

    setBars(newBars);
    
    if (isListening) {
      animationRef.current = requestAnimationFrame(analyzeAudio);
    }
  };

  const toggleAudio = async () => {
    if (!isListening) {
      const result = await initAudio();
      if (result) {
        analyzeAudio();
      }
    } else {
      // Stop audio
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
      setIsListening(false);
      setAudioContext(null);
      setAnalyser(null);
      setMicrophone(null);
      setBars(Array.from({ length: 32 }, () => 20));
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            isListening
              ? 'bg-red-500/20 text-red-400 border border-red-400/30'
              : 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
          } hover:scale-105`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Audio
            </>
          )}
        </button>
        
        {isListening && (
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Recording
          </div>
        )}
      </div>

      <div className="flex items-end gap-1 h-48 bg-black/10 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-3 rounded-t-lg transition-all duration-75"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, 
                hsl(${height * 2 + i * 8}, 80%, 60%), 
                hsl(${height * 2 + i * 8 + 40}, 80%, 80%))`,
              boxShadow: `0 0 8px hsla(${height * 2 + i * 8}, 80%, 60%, 0.4)`,
              filter: `brightness(${1 + (height - 20) / 100})`
            }}
          />
        ))}
      </div>

      <p className="text-sm text-foreground/60 text-center max-w-md">
        {isListening 
          ? "🎵 Visualizing real-time audio input" 
          : "Click 'Start Audio' to begin real-time sound visualization"
        }
      </p>
    </div>
  );
};

export default SoundVisualizer;
