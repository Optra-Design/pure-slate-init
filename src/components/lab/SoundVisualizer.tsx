
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 32 }, () => 20));
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  // Create a sample audio track using Web Audio API
  const createSampleAudio = async () => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyserNode = context.createAnalyser();
      
      // Create oscillators for a demo track
      const oscillator1 = context.createOscillator();
      const oscillator2 = context.createOscillator();
      const oscillator3 = context.createOscillator();
      const gainNode1 = context.createGain();
      const gainNode2 = context.createGain();
      const gainNode3 = context.createGain();
      
      analyserNode.fftSize = 128;
      
      // Connect oscillators
      oscillator1.connect(gainNode1);
      oscillator2.connect(gainNode2);
      oscillator3.connect(gainNode3);
      gainNode1.connect(analyserNode);
      gainNode2.connect(analyserNode);
      gainNode3.connect(analyserNode);
      analyserNode.connect(context.destination);
      
      // Set frequencies for a nice chord
      oscillator1.frequency.setValueAtTime(220, context.currentTime); // A3
      oscillator2.frequency.setValueAtTime(330, context.currentTime); // E4
      oscillator3.frequency.setValueAtTime(440, context.currentTime); // A4
      
      // Set gains
      gainNode1.gain.setValueAtTime(0.1, context.currentTime);
      gainNode2.gain.setValueAtTime(0.1, context.currentTime);
      gainNode3.gain.setValueAtTime(0.1, context.currentTime);
      
      setAudioContext(context);
      setAnalyser(analyserNode);
      
      return { oscillator1, oscillator2, oscillator3, analyserNode, context };
    } catch (error) {
      console.error('Error creating audio:', error);
      startDemoMode();
    }
  };

  const startDemoMode = () => {
    // Fallback: animated bars without audio
    const animate = () => {
      setBars(prev => prev.map((_, i) => {
        const time = Date.now() * 0.001;
        const wave1 = Math.sin(time * 2 + i * 0.5) * 30 + 50;
        const wave2 = Math.sin(time * 3 + i * 0.3) * 20 + 30;
        const wave3 = Math.sin(time * 1.5 + i * 0.8) * 25 + 40;
        return Math.max(20, (wave1 + wave2 + wave3) / 3);
      }));
      
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const analyzeAudio = () => {
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // Convert frequency data to bar heights with smoothing
    const newBars = [];
    const barsCount = 32;
    const samplesPerBar = Math.floor(bufferLength / barsCount);

    for (let i = 0; i < barsCount; i++) {
      let sum = 0;
      for (let j = 0; j < samplesPerBar; j++) {
        sum += dataArray[i * samplesPerBar + j];
      }
      const average = sum / samplesPerBar;
      const height = Math.max(20, Math.min(90, (average / 255) * 100 + 20));
      newBars.push(height);
    }

    setBars(newBars);
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(analyzeAudio);
    }
  };

  const toggleAudio = async () => {
    if (!isPlaying) {
      const result = await createSampleAudio();
      if (result) {
        const { oscillator1, oscillator2, oscillator3 } = result;
        oscillator1.start();
        oscillator2.start();
        oscillator3.start();
        
        setIsPlaying(true);
        analyzeAudio();
      } else {
        setIsPlaying(true);
        startDemoMode();
      }
    } else {
      // Stop audio
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
      setIsPlaying(false);
      setAudioContext(null);
      setAnalyser(null);
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-6">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
            isPlaying
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25'
              : 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-green-500/25'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-6 h-6" />
              Stop Audio
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              Play Demo
            </>
          )}
        </button>
        
        {isPlaying && (
          <div className="flex items-center gap-3 text-foreground/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <Volume2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Demo Playing</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-end gap-2 h-64 bg-black/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-4 rounded-t-xl transition-all duration-100 ease-out"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, 
                hsl(${height * 3 + i * 10}, 75%, 55%), 
                hsl(${height * 3 + i * 10 + 60}, 85%, 70%))`,
              boxShadow: `0 0 15px hsla(${height * 3 + i * 10}, 75%, 55%, 0.6)`,
              filter: `brightness(${1 + (height - 20) / 150})`
            }}
          />
        ))}
      </div>

      <p className="text-center text-foreground/60 max-w-md">
        {isPlaying 
          ? "🎵 Visualizing demo audio track with real-time frequency analysis" 
          : "Click 'Play Demo' to start the audio visualization experience"
        }
      </p>
    </div>
  );
};

export default SoundVisualizer;
