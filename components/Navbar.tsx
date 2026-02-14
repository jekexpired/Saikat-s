
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isAdmin: boolean;
  siteName: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, siteName, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-12 flex justify-between items-center ${scrolled ? 'bg-[var(--theme-bg)]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <Link to="/" className="text-xl md:text-2xl font-serif font-bold tracking-tighter hover:opacity-70 transition-opacity">
        {siteName}
      </Link>
      
      <div className="flex items-center space-x-10 text-[10px] font-bold tracking-[0.3em] uppercase">
        {isHome && (
          <div className="hidden md:flex items-center space-x-8">
            <a href="#gallery" className="hover:opacity-50 transition-opacity">Gallery</a>
            <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          </div>
        )}
        
        {isAdmin ? (
          <div className="flex items-center space-x-6 border-l border-white/10 pl-8">
            <Link to="/admin" className="text-white hover:opacity-50 transition-opacity">Admin</Link>
            <button onClick={onLogout} className="text-red-400 hover:text-red-300 transition-colors">Logout</button>
          </div>
        ) : (
          <Link to="/admin/login" className="opacity-20 hover:opacity-100 transition-opacity">Access</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
