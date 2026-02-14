
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { SiteConfig, InstagramPost, AdminState, UploadedPhoto } from './types';
import { INITIAL_CONFIG, MOCK_POSTS } from './constants';

const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('theme_v1_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [posts, setPosts] = useState<InstagramPost[]>(() => {
    const saved = localStorage.getItem('theme_v1_posts');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [customPhotos, setCustomPhotos] = useState<UploadedPhoto[]>(() => {
    const saved = localStorage.getItem('theme_v1_custom');
    return saved ? JSON.parse(saved) : [];
  });

  const [admin, setAdmin] = useState<AdminState>(() => {
    const saved = localStorage.getItem('theme_v1_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, token: null };
  });

  useEffect(() => {
    localStorage.setItem('theme_v1_config', JSON.stringify(config));
    localStorage.setItem('theme_v1_posts', JSON.stringify(posts));
    localStorage.setItem('theme_v1_custom', JSON.stringify(customPhotos));
    localStorage.setItem('theme_v1_auth', JSON.stringify(admin));
  }, [config, posts, customPhotos, admin]);

  // Dynamic CSS Injection based on SiteConfig
  const themeInjection = useMemo(() => {
    const { theme } = config;
    return `
      :root {
        --theme-accent: ${theme.accentColor};
        --theme-bg: ${theme.backgroundColor};
        --theme-surface: ${theme.surfaceColor};
        --theme-border-opacity: ${theme.borderOpacity};
        --theme-font-main: ${theme.fontFamily === 'serif' ? '"Playfair Display", serif' : '"Inter", sans-serif'};
      }
    `;
  }, [config.theme]);

  const handleUpdateConfig = (newConfig: Partial<SiteConfig>) => setConfig(prev => ({ ...prev, ...newConfig }));
  const handleUpdatePosts = (newPosts: InstagramPost[]) => setPosts(newPosts);
  const handleUpdateCustomPhotos = (newPhotos: UploadedPhoto[]) => setCustomPhotos(newPhotos);
  const handleLogin = (token: string) => setAdmin({ isAuthenticated: true, token });
  const handleLogout = () => setAdmin({ isAuthenticated: false, token: null });

  return (
    <HashRouter>
      <style>{themeInjection}</style>
      <div className="min-h-screen selection-theme">
        <Navbar isAdmin={admin.isAuthenticated} siteName={config.name} onLogout={handleLogout} />
        <Routes>
          <Route 
            path="/" 
            element={<Home config={config} posts={posts} customPhotos={customPhotos} />} 
          />
          <Route 
            path="/admin/login" 
            element={admin.isAuthenticated ? <Navigate to="/admin" /> : <AdminLogin onLogin={handleLogin} />} 
          />
          <Route 
            path="/admin" 
            element={admin.isAuthenticated ? (
              <AdminDashboard 
                config={config} 
                posts={posts} 
                customPhotos={customPhotos}
                onUpdateConfig={handleUpdateConfig} 
                onUpdatePosts={handleUpdatePosts}
                onUpdateCustomPhotos={handleUpdateCustomPhotos}
              />
            ) : <Navigate to="/admin/login" />} 
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
