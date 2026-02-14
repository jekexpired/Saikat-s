
import React, { useState, useRef } from 'react';
import { SiteConfig, InstagramPost, UploadedPhoto, ThemeSettings } from '../types';

interface AdminDashboardProps {
  config: SiteConfig;
  posts: InstagramPost[];
  customPhotos: UploadedPhoto[];
  onUpdateConfig: (newConfig: Partial<SiteConfig>) => void;
  onUpdatePosts: (newPosts: InstagramPost[]) => void;
  onUpdateCustomPhotos: (newPhotos: UploadedPhoto[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  config, 
  posts, 
  customPhotos, 
  onUpdateConfig, 
  onUpdatePosts, 
  onUpdateCustomPhotos 
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'instagram' | 'custom'>('theme');
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const PRESETS = [
    { name: 'Onyx', bg: '#000000', surface: '#0a0a0a', accent: '#ffffff' },
    { name: 'Paper', bg: '#fbfbfb', surface: '#f0f0f0', accent: '#1a1a1a' },
    { name: 'Slate', bg: '#0f172a', surface: '#1e293b', accent: '#f8fafc' },
    { name: 'Warm', bg: '#1c1917', surface: '#292524', accent: '#fafaf9' },
  ];

  const updateTheme = (newTheme: Partial<ThemeSettings>) => {
    onUpdateConfig({ theme: { ...config.theme, ...newTheme } });
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Instagram Sync Complete');
    }, 1500);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: UploadedPhoto = {
          id: `up_${Date.now()}_${Math.random()}`,
          url: reader.result as string,
          title: file.name.split('.')[0],
          description: "Portfolio entry.",
          date: new Date().toISOString(),
          isHidden: false,
        };
        onUpdateCustomPhotos([newPhoto, ...customPhotos]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-[var(--theme-surface)]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif">Studio Manager</h1>
            <p className="text-[10px] tracking-[0.4em] opacity-40 uppercase">Professional Theme Dashboard</p>
          </div>
          <div className="flex bg-black/40 p-1 rounded-2xl backdrop-blur-3xl border border-white/5">
            {(['content', 'theme', 'instagram', 'custom'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-[9px] font-bold tracking-[0.2em] uppercase rounded-xl transition-all ${activeTab === tab ? 'bg-[var(--theme-accent)] text-[var(--theme-bg)]' : 'opacity-40 hover:opacity-100'}`}
              >
                {tab === 'custom' ? 'Archive' : tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'theme' && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="bg-black/20 p-8 border border-white/5 rounded-3xl space-y-8">
              <h3 className="text-xl font-serif">Palette Customizer</h3>
              <div className="grid grid-cols-2 gap-4">
                {PRESETS.map(p => (
                  <button 
                    key={p.name}
                    onClick={() => updateTheme({ backgroundColor: p.bg, surfaceColor: p.surface, accentColor: p.accent })}
                    className="p-4 rounded-2xl border border-white/5 hover:scale-[1.02] transition-all text-left"
                    style={{ backgroundColor: p.bg }}
                  >
                    <div className="w-5 h-5 rounded-full mb-2 border border-white/10" style={{ backgroundColor: p.accent }}></div>
                    <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: p.accent }}>{p.name}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-white/5">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Manual Override</label>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Accent Color</span>
                  <input type="color" value={config.theme.accentColor} onChange={(e) => updateTheme({ accentColor: e.target.value })} className="bg-transparent w-10 h-10 border-none cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="bg-black/20 p-8 border border-white/5 rounded-3xl space-y-8">
              <h3 className="text-xl font-serif">Identity & Style</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Typography</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => updateTheme({ fontFamily: 'serif' })} className={`py-3 text-[10px] font-bold border transition-all ${config.theme.fontFamily === 'serif' ? 'bg-white text-black' : 'border-white/10'}`}>Editorial</button>
                    <button onClick={() => updateTheme({ fontFamily: 'sans' })} className={`py-3 text-[10px] font-bold border transition-all ${config.theme.fontFamily === 'sans' ? 'bg-white text-black' : 'border-white/10'}`}>Modern</button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Gallery Layout</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => updateTheme({ galleryLayout: 'masonry' })} className={`py-3 text-[10px] font-bold border transition-all ${config.theme.galleryLayout === 'masonry' ? 'bg-white text-black' : 'border-white/10'}`}>Masonry</button>
                    <button onClick={() => updateTheme({ galleryLayout: 'grid' })} className={`py-3 text-[10px] font-bold border transition-all ${config.theme.galleryLayout === 'grid' ? 'bg-white text-black' : 'border-white/10'}`}>Uniform</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 p-8 border border-white/5 rounded-3xl space-y-8">
              <h3 className="text-xl font-serif">Structural Tuning</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4 block">Border Subtlely ({config.theme.borderOpacity})</label>
                  <input type="range" min="0" max="0.5" step="0.05" value={config.theme.borderOpacity} onChange={(e) => updateTheme({ borderOpacity: parseFloat(e.target.value) })} className="w-full accent-white" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4 block">Hero Impact</label>
                  <div className="flex bg-black/40 p-1 rounded-xl">
                    <button onClick={() => updateTheme({ heroHeight: 'full' })} className={`flex-1 py-2 text-[9px] font-bold rounded-lg ${config.theme.heroHeight === 'full' ? 'bg-white text-black' : 'opacity-40'}`}>Immersive</button>
                    <button onClick={() => updateTheme({ heroHeight: 'large' })} className={`flex-1 py-2 text-[9px] font-bold rounded-lg ${config.theme.heroHeight === 'large' ? 'bg-white text-black' : 'opacity-40'}`}>Minimal</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
             <div className="bg-black/20 p-10 border border-white/5 rounded-3xl space-y-6">
                <h3 className="text-xl font-serif">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 block">Studio Name</label>
                    <input type="text" value={config.name} onChange={(e) => onUpdateConfig({ name: e.target.value })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-white transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 block">Tagline</label>
                    <input type="text" value={config.tagline} onChange={(e) => onUpdateConfig({ tagline: e.target.value })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-white transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 block">Biography</label>
                    <textarea rows={5} value={config.bio} onChange={(e) => onUpdateConfig({ bio: e.target.value })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-white transition-all outline-none resize-none" />
                  </div>
                </div>
             </div>
             <div className="bg-black/20 p-10 border border-white/5 rounded-3xl space-y-6">
                <h3 className="text-xl font-serif">Contact & Links</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 block">Public Email</label>
                    <input type="email" value={config.contactEmail} onChange={(e) => onUpdateConfig({ contactEmail: e.target.value })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-white transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 block">Instagram Handle</label>
                    <input type="text" value={config.instagramHandle} onChange={(e) => onUpdateConfig({ instagramHandle: e.target.value })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-white transition-all outline-none" />
                  </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'instagram' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center bg-black/20 p-10 border border-white/5 rounded-3xl">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif">Instagram Connector</h3>
                <p className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Pulling from {config.instagramHandle}</p>
              </div>
              <button onClick={handleSync} disabled={isSyncing} className="bg-white text-black px-10 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-neutral-200 transition-all rounded-xl disabled:opacity-50">
                {isSyncing ? 'Refreshing...' : 'Sync Feed'}
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map(post => (
                <div key={post.id} className={`group relative bg-black/40 border border-white/5 rounded-2xl overflow-hidden transition-all ${post.isHidden ? 'opacity-20 grayscale' : ''}`}>
                  <img src={post.media_url} alt="" className="w-full aspect-square object-cover" />
                  <div className="p-4 flex gap-2">
                    <button onClick={() => onUpdatePosts(posts.map(p => p.id === post.id ? { ...p, isHidden: !p.isHidden } : p))} className="flex-1 py-3 text-[9px] font-bold bg-white/5 rounded-lg hover:bg-white/10 transition-colors uppercase tracking-widest">
                      {post.isHidden ? 'Unhide' : 'Hide'}
                    </button>
                    <button onClick={() => onUpdatePosts(posts.map(p => p.id === post.id ? { ...p, isPinned: !p.isPinned } : p))} className={`flex-1 py-3 text-[9px] font-bold rounded-lg uppercase tracking-widest ${post.isPinned ? 'bg-white text-black' : 'bg-white/5'}`}>
                      Pin
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-8 animate-fade-in">
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="group border-2 border-dashed border-white/10 p-20 text-center cursor-pointer hover:border-[var(--theme-accent)]/30 transition-all bg-black/20 rounded-3xl"
            >
              <input type="file" ref={fileInputRef} onChange={handleUpload} multiple accept="image/*" className="hidden" />
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-serif">Upload Unlimited Works</h4>
                <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.4em]">Manually hosted archive gallery</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {customPhotos.map(photo => (
                <div key={photo.id} className="relative group bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
                  <img src={photo.url} alt="" className="w-full aspect-square object-cover" />
                  <div className="p-4 flex gap-1">
                    <button onClick={() => onUpdateCustomPhotos(customPhotos.filter(p => p.id !== photo.id))} className="flex-1 py-3 text-[8px] font-bold bg-red-950/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest">
                      Delete
                    </button>
                    <button onClick={() => onUpdateCustomPhotos(customPhotos.map(p => p.id === photo.id ? { ...p, isHidden: !p.isHidden } : p))} className="flex-1 py-3 text-[8px] font-bold bg-white/5 rounded-xl uppercase tracking-widest">
                      {photo.isHidden ? 'Show' : 'Hide'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
