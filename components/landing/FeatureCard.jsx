'use client';

import { useState, useEffect } from 'react';

export default function FeatureCard({ icon: Icon, title, description, color, index }) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} p-0.5 mb-4 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
        <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}></div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute top-0 right-0 w-1 h-8 bg-gradient-to-b ${color} rounded-full`}></div>
        <div className={`absolute top-0 right-0 w-8 h-1 bg-gradient-to-r ${color} rounded-full`}></div>
      </div>
    </div>
  );
}