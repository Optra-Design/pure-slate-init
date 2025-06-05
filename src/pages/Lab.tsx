import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Beaker, Zap, Palette, Code, Sparkles, Waves, Grid3X3, Triangle, Music, Gamepad2, Orbit, Atom } from 'lucide-react';

const Lab = () => {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const experiments = [
    {
      title: "Color Harmonics",
      description: "Experimental color theory applications",
      icon: <Palette className="w-6 h-6" />,
      component: <ColorHarmonics />
    },
    {
      title: "Motion Studies",
      description: "Fluid animation explorations",
      icon: <Orbit className="w-6 h-6" />,
      component: <MotionStudies />
    },
    {
      title: "Typography Lab",
      description: "Dynamic text transformations",
      icon: <Code className="w-6 h-6" />,
      component: <TypographyLab />
    },
    {
      title: "Interactive Particles",
      description: "Physics-based particle systems",
      icon: <Atom className="w-6 h-6" />,
      component: <InteractiveParticles mousePosition={mousePosition} />
    },
    {
      title: "Wave Generator",
      description: "Audio-visual wave patterns",
      icon: <Waves className="w-6 h-6" />,
      component: <WaveGenerator />
    },
    {
      title: "Grid Morphing",
      description: "Dynamic grid transformations",
      icon: <Grid3X3 className="w-6 h-6" />,
      component: <GridMorphing />
    },
    {
      title: "3D Geometry",
      description: "Interactive 3D shape experiments",
      icon: <Triangle className="w-6 h-6" />,
      component: <GeometryLab />
    },
    {
      title: "Sound Visualizer",
      description: "Real-time audio visualization",
      icon: <Music className="w-6 h-6" />,
      component: <SoundVisualizer />
    },
    {
      title: "Gravity Simulator",
      description: "Interactive physics playground",
      icon: <Gamepad2 className="w-6 h-6" />,
      component: <GravitySimulator />
    }
  ];

  const playExperimentSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleExperimentChange = (index: number) => {
    setActiveExperiment(index);
    playExperimentSound();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Beaker className="w-12 h-12 text-gradient animate-bounce-subtle" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Design Lab
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              🧪 Experimental design concepts and interactive explorations. 
              A playground for creative innovation and technical artistry.
            </p>
            <div className="mt-4 text-sm text-foreground/50">
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full animate-pulse">
                ⚠️ Experimental Features
              </span>
            </div>
          </div>

          {/* Experiment Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {experiments.map((experiment, index) => (
              <button
                key={index}
                onClick={() => handleExperimentChange(index)}
                className={`group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  activeExperiment === index
                    ? 'bg-optra-gradient text-white scale-105 shadow-lg glow-hover'
                    : 'bg-white/10 text-foreground/70 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="group-hover:rotate-12 transition-transform duration-300">
                  {experiment.icon}
                </span>
                {experiment.title}
              </button>
            ))}
          </div>

          {/* Active Experiment */}
          <div className="glass p-8 rounded-3xl mb-8 min-h-[500px] hover:glow-hover transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient mb-2 animate-fade-in">
                {experiments[activeExperiment].title}
              </h2>
              <p className="text-foreground/70">
                {experiments[activeExperiment].description}
              </p>
            </div>
            
            <div className="flex items-center justify-center h-96">
              {experiments[activeExperiment].component}
            </div>
          </div>

          {/* Lab Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 hover:glow-hover animate-fade-in">
              <Code className="w-8 h-8 text-gradient mx-auto mb-3 animate-pulse" />
              <h3 className="font-bold text-gradient mb-2">Open Source</h3>
              <p className="text-sm text-foreground/70">
                All experiments are built with modern web technologies
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 hover:glow-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Zap className="w-8 h-8 text-gradient mx-auto mb-3 animate-bounce" />
              <h3 className="font-bold text-gradient mb-2">Real-time</h3>
              <p className="text-sm text-foreground/70">
                Interactive experiences that respond to user input
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 hover:glow-hover animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="w-8 h-8 text-gradient mx-auto mb-3 animate-spin" style={{ animationDuration: '3s' }} />
              <h3 className="font-bold text-gradient mb-2">Innovative</h3>
              <p className="text-sm text-foreground/70">
                Pushing boundaries of digital design possibilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Experiment Components
const ColorHarmonics = () => {
  const [hue, setHue] = useState(0);
  const [pattern, setPattern] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 1) % 360);
      setPattern(prev => (prev + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer shadow-lg"
            style={{
              backgroundColor: `hsl(${(hue + i * 15) % 360}, ${70 + Math.sin(pattern + i) * 20}%, ${60 + Math.cos(pattern + i) * 10}%)`,
              transform: `rotate(${hue + i * 5}deg) scale(${1 + Math.sin(pattern + i) * 0.1})`,
              boxShadow: `0 0 20px hsla(${(hue + i * 15) % 360}, 70%, 60%, 0.5)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const MotionStudies = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute border-2 border-gradient rounded-full animate-pulse"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            transform: `rotate(${time * (i + 1) * 15}deg) scale(${1 + Math.sin(time + i) * 0.3})`,
            opacity: 0.8 - i * 0.08,
            borderColor: `hsl(${(time * 50 + i * 45) % 360}, 80%, 65%)`,
            filter: `drop-shadow(0 0 10px hsla(${(time * 50 + i * 45) % 360}, 80%, 65%, 0.7))`
          }}
        />
      ))}
      <div className="w-8 h-8 bg-optra-gradient rounded-full animate-bounce-subtle shadow-lg" />
    </div>
  );
};

const TypographyLab = () => {
  const [currentText, setCurrentText] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const texts = ['OPTRA', 'DESIGN', 'LAB', 'EXPERIMENT', 'CREATE', 'INNOVATE', 'FUTURE', 'PIXEL'];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setCurrentText(prev => (prev + 1) % texts.length);
        setGlitch(false);
      }, 200);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className={`text-6xl font-black text-gradient transition-all duration-200 ${
          glitch ? 'animate-pulse filter blur-sm scale-110' : 'hover:scale-105'
        }`}
        style={{
          textShadow: glitch ? '3px 3px 0px #ff0000, -3px -3px 0px #00ff00, 2px -2px 0px #0000ff' : '0 0 30px rgba(255, 107, 53, 0.5)',
          background: glitch ? 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)' : undefined,
          WebkitBackgroundClip: glitch ? 'text' : undefined,
          backgroundClip: glitch ? 'text' : undefined,
          WebkitTextFillColor: glitch ? 'transparent' : undefined
        }}
      >
        {texts[currentText]}
      </div>
    </div>
  );
};

const InteractiveParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; color: string }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const dx = mousePosition.x - (particle.x + 200);
        const dy = mousePosition.y - (particle.y + 200);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newVx = particle.vx;
        let newVy = particle.vy;
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.003;
          newVx += dx * force;
          newVy += dy * force;
        }
        
        return {
          ...particle,
          x: (particle.x + newVx + 400) % 400,
          y: (particle.y + newVy + 300) % 300,
          vx: newVx * 0.98,
          vy: newVy * 0.98,
        };
      }));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg overflow-hidden bg-black/20 shadow-2xl">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};

const WaveGenerator = () => {
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(50);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const generateWavePoints = () => {
    const points = [];
    for (let x = 0; x <= 400; x += 4) {
      const y = 150 + amplitude * Math.sin((x * frequency * 0.02) + time);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg width="400" height="300" className="border border-white/20 rounded-lg bg-black/20 mb-4 shadow-2xl">
        <polyline
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          points={generateWavePoints()}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="25%" stopColor="#E91E63" />
            <stop offset="50%" stopColor="#9C27B0" />
            <stop offset="75%" stopColor="#3F51B5" />
            <stop offset="100%" stopColor="#00BCD4" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="flex gap-4">
        <div>
          <label className="text-sm text-foreground/70">Frequency</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-20 ml-2 accent-pink-500"
          />
        </div>
        <div>
          <label className="text-sm text-foreground/70">Amplitude</label>
          <input
            type="range"
            min="20"
            max="80"
            step="5"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-20 ml-2 accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

const GridMorphing = () => {
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMorph(prev => (prev + 0.05) % (Math.PI * 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-8 gap-2 p-4 bg-black/20 rounded-lg shadow-2xl">
        {Array.from({ length: 64 }, (_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const distance = Math.sqrt((row - 3.5) ** 2 + (col - 3.5) ** 2);
          const scale = 1 + 0.4 * Math.sin(morph + distance * 0.5);
          const rotation = morph * 25 + distance * 20;
          const hue = (morph * 50 + distance * 30) % 360;
          
          return (
            <div
              key={i}
              className="w-6 h-6 rounded-sm shadow-lg"
              style={{
                background: `hsl(${hue}, 70%, 60%)`,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.1s ease-out',
                boxShadow: `0 0 10px hsla(${hue}, 70%, 60%, 0.7)`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const GeometryLab = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000">
      <div 
        className="relative shadow-2xl"
        style={{
          transform: `rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 border-2 border-gradient flex items-center justify-center text-white font-bold shadow-lg"
            style={{
              backgroundColor: `hsla(${i * 60 + rotation}, 80%, 60%, 0.4)`,
              boxShadow: `0 0 20px hsla(${i * 60 + rotation}, 80%, 60%, 0.6)`,
              transform: 
                i === 0 ? 'translateZ(40px)' :
                i === 1 ? 'rotateY(180deg) translateZ(40px)' :
                i === 2 ? 'rotateY(90deg) translateZ(40px)' :
                i === 3 ? 'rotateY(-90deg) translateZ(40px)' :
                i === 4 ? 'rotateX(90deg) translateZ(40px)' :
                'rotateX(-90deg) translateZ(40px)'
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

// NEW EXPERIMENTS
const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 20 }, () => Math.random() * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100 + 20));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-end gap-2 h-64 bg-black/20 p-4 rounded-lg shadow-2xl">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-6 rounded-t-lg transition-all duration-150"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, hsl(${height + i * 18}, 80%, 60%), hsl(${height + i * 18 + 60}, 80%, 80%))`,
              boxShadow: `0 0 10px hsla(${height + i * 18}, 80%, 60%, 0.7)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const GravitySimulator = () => {
  const [balls, setBalls] = useState<Array<{ x: number; y: number; vx: number; vy: number; color: string }>>([]);
  
  useEffect(() => {
    const initialBalls = Array.from({ length: 8 }, () => ({
      x: Math.random() * 350 + 25,
      y: Math.random() * 250 + 25,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    setBalls(initialBalls);
  }, []);

  useEffect(() => {
    const simulate = () => {
      setBalls(prev => prev.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy + 0.2; // gravity

        // Bounce off walls
        if (newX <= 10 || newX >= 390) {
          newVx = -newVx * 0.8;
          newX = newX <= 10 ? 10 : 390;
        }
        if (newY <= 10 || newY >= 290) {
          newVy = -newVy * 0.8;
          newY = newY <= 10 ? 10 : 290;
        }

        return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    };

    const interval = setInterval(simulate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg bg-black/20 shadow-2xl overflow-hidden">
      {balls.map((ball, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 rounded-full shadow-lg animate-pulse"
          style={{
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            background: ball.color,
            boxShadow: `0 0 15px ${ball.color}`,
            transition: 'all 0.02s linear'
          }}
        />
      ))}
    </div>
  );
};

export default Lab;
