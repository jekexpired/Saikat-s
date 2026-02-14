
import React from 'react';
import { InstagramPost } from '../types';

interface GalleryProps {
  posts: InstagramPost[];
  onSelect: (post: InstagramPost) => void;
  layout?: 'masonry' | 'grid';
}

const Gallery: React.FC<GalleryProps> = ({ posts, onSelect, layout = 'masonry' }) => {
  const containerClass = layout === 'masonry'
    ? "columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className={containerClass}>
      {posts.map((post) => (
        <div 
          key={post.id} 
          onClick={() => onSelect(post)}
          className={`relative group cursor-pointer overflow-hidden bg-neutral-900 ${layout === 'masonry' ? 'break-inside-avoid' : 'aspect-square'}`}
        >
          {post.isPinned && (
            <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-md p-2 rounded-full">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22L12,22.8L12.8,22V16H18V14L16,12Z" />
              </svg>
            </div>
          )}
          <img 
            src={post.media_url} 
            alt={post.caption}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 space-y-4">
            <p className="text-sm line-clamp-3 text-white/90 font-light leading-relaxed italic">
              "{post.caption.split('#')[0].trim()}"
            </p>
            <div className="flex justify-between items-center text-[10px] tracking-widest uppercase text-white/50 border-t border-white/10 pt-4">
              <span>{post.like_count.toLocaleString()} Likes</span>
              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
