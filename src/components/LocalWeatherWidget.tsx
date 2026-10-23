import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, Clock, MapPin, Compass, Thermometer } from 'lucide-react';

export const LocalWeatherWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // West Africa Time (WAT) is UTC+1 (Nigeria)
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-stone-900/90 border border-amber-500/20 rounded-md px-3 py-1.5 flex items-center gap-3 text-xs text-stone-300 shadow-md">
      <div className="flex items-center gap-1.5 text-amber-400 font-medium">
        <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
        <span>31°C Akwanga</span>
      </div>
      <span className="text-stone-700">|</span>
      <div className="flex items-center gap-1 text-stone-300">
        <Clock className="w-3 h-3 text-amber-500" />
        <span className="font-mono text-[11px] text-amber-200">{currentTime || '12:00 PM'} WAT</span>
      </div>
    </div>
  );
};
