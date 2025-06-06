
import React, { useState, useEffect } from 'react';

const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 16 }, () => Math.random() * 80 + 20));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 80 + 20));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-end gap-1 md:gap-2 h-48 md:h-64 bg-black/10 p-4 rounded-lg shadow-2xl">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-4 md:w-6 rounded-t-lg transition-all duration-120"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, hsl(${height + i * 22}, 80%, 60%), hsl(${height + i * 22 + 60}, 80%, 80%))`,
              boxShadow: `0 0 8px hsla(${height + i * 22}, 80%, 60%, 0.6)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SoundVisualizer;
