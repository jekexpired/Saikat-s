
import React, { useState } from 'react';
import { SiteConfig, InstagramPost, UploadedPhoto } from '../types';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';

interface HomeProps {
  config: SiteConfig;
  posts: InstagramPost[];
  customPhotos: UploadedPhoto[];
}

const Home: React.FC<HomeProps> = ({ config, posts, customPhotos }) => {
  const [selectedItem, setSelectedItem] = useState<InstagramPost | UploadedPhoto | null>(null);

  const visiblePosts = posts.filter(p => !p.isHidden).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const visibleCustom = customPhotos.filter(p => !p.isHidden).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleSelect = (item: InstagramPost | UploadedPhoto) => {
    setSelectedItem(item);
  };

  const galleryClass = config.theme.galleryLayout === 'masonry' 
    ? "columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8" 
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <main className="relative overflow-hidden">
      <Hero config={config} featuredPosts={visiblePosts.slice(0, 3)} />
      
      <section id="gallery" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 space-y-4 md:space-y-0">
            <h2 className="text-4xl md:text-5xl font-serif">Portfolio</h2>
            <p className="opacity-50 tracking-widest uppercase text-xs">Live Instagram Feed</p>
          </div>
          <Gallery posts={visiblePosts} onSelect={handleSelect} layout={config.theme.galleryLayout} />
        </div>
      </section>

      {visibleCustom.length > 0 && (
        <section className="py-24 px-6 md:px-12 border-t" style={{ borderColor: `rgba(255,255,255,${config.theme.borderOpacity})` }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 space-y-4 md:space-y-0">
              <h2 className="text-4xl md:text-5xl font-serif">Curated Archive</h2>
              <p className="opacity-50 tracking-widest uppercase text-xs">Manual Collections</p>
            </div>
            
            <div className={galleryClass}>
              {visibleCustom.map((photo) => (
                <div 
                  key={photo.id} 
                  onClick={() => handleSelect(photo)}
                  className="relative group cursor-pointer break-inside-avoid overflow-hidden bg-neutral-900"
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    loading="lazy"
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 space-y-4">
                    <h4 className="text-xl font-serif text-white">{photo.title}</h4>
                    <p className="text-[10px] text-white/60 tracking-widest uppercase">{new Date(photo.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="about" className="py-32 px-6 md:px-12" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 border translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" style={{ borderColor: `rgba(255,255,255,${config.theme.borderOpacity * 2})` }}></div>
            <img 
              src={config.profileImage} 
              alt={config.name} 
              className="relative grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Philosophy</h2>
            <p className="opacity-70 text-lg leading-relaxed font-light">
              {config.bio}
            </p>
            <div className="pt-4 flex space-x-6">
              <a href={`https://instagram.com/${config.instagramHandle.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-sm border-b pb-1 transition-all opacity-50 hover:opacity-100">Instagram</a>
              <a href={`mailto:${config.contactEmail}`} className="text-sm border-b pb-1 transition-all opacity-50 hover:opacity-100">Email</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-6xl font-serif">Contact</h2>
          <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full bg-neutral-900/50 border-none px-6 py-4 focus:ring-1 ring-white/20 transition-all text-sm outline-none" />
              <input type="email" placeholder="Email" className="w-full bg-neutral-900/50 border-none px-6 py-4 focus:ring-1 ring-white/20 transition-all text-sm outline-none" />
            </div>
            <textarea placeholder="Message" rows={6} className="w-full bg-neutral-900/50 border-none px-6 py-4 focus:ring-1 ring-white/20 transition-all text-sm outline-none resize-none"></textarea>
            <button className="w-full bg-white text-black py-5 text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors">Submit</button>
          </form>
        </div>
      </section>

      <footer className="py-12 border-t text-center text-[10px] tracking-widest opacity-40 uppercase" style={{ borderColor: `rgba(255,255,255,${config.theme.borderOpacity})` }}>
        &copy; {new Date().getFullYear()} {config.name}
      </footer>

      {selectedItem && (
        <Lightbox 
          post={'media_url' in selectedItem ? selectedItem : {
            id: selectedItem.id,
            media_url: selectedItem.url,
            permalink: '#',
            caption: `${selectedItem.title}: ${selectedItem.description}`,
            timestamp: selectedItem.date,
            like_count: 0,
            comments_count: 0,
            media_type: 'IMAGE'
          }} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </main>
  );
};

export default Home;
