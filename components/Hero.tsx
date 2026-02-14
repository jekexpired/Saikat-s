
import React, { useState, useEffect } from 'react';
import { SiteConfig, InstagramPost } from '../types';

interface HeroProps {
  config: SiteConfig;
  featuredPosts: InstagramPost[];
}

const Hero: React.FC<HeroProps> = ({ config, featuredPosts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredPosts]);

  const slides = featuredPosts.length > 0 ? featuredPosts : [
    { media_url: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1920' }
  ];

  const heroHeightClass = config.theme.heroHeight === 'full' ? 'h-screen' : 'h-[70vh]';

  return (
    <section className={`relative ${heroHeightClass} w-full flex items-center justify-center overflow-hidden transition-all duration-700`}>
      {slides.map((slide, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={slide.media_url} 
            alt="Hero Slide" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
      ))}
      
      <div className="relative z-20 text-center space-y-6 px-6">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] uppercase mix-blend-difference">
          {config.name.split(' ')[0]}
        </h1>
        <p className="text-xs md:text-sm tracking-[0.6em] uppercase text-white/80 font-light">
          {config.tagline}
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-4">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-12 h-1 transition-all duration-500 ${idx === activeIndex ? 'bg-white' : 'bg-white/20'}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
