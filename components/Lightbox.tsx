
import React, { useEffect } from 'react';
import { InstagramPost } from '../types';

interface LightboxProps {
  post: InstagramPost;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ post, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      <div className="w-full max-w-7xl grid lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-2 flex items-center justify-center">
          <img 
            src={post.media_url} 
            alt={post.caption} 
            className="max-h-[85vh] w-auto object-contain shadow-2xl"
          />
        </div>
        
        <div className="space-y-8 lg:text-left">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              Captured {new Date(post.timestamp).toLocaleDateString()}
            </span>
            <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-300 font-serif italic">
              {post.caption}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-y border-white/10 py-8">
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Engagement</span>
              <span className="text-xl font-medium">{post.like_count.toLocaleString()}</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Feedback</span>
              <span className="text-xl font-medium">{post.comments_count.toLocaleString()}</span>
            </div>
          </div>

          <a 
            href={post.permalink} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center space-x-3 text-sm tracking-widest uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            <span>Original Post</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
