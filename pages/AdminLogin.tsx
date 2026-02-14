
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation of secure hashed check
    // In a real app, this would be an API call
    setTimeout(() => {
      if (password === '01774892355') {
        onLogin('mock_jwt_token_safe_and_secure');
      } else {
        setError('Unauthorized access. Invalid credentials.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif">Secure Gateway</h1>
          <p className="text-xs tracking-widest text-neutral-500 uppercase">Management Dashboard Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-neutral-500 ml-1">Admin Access Token</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter credentials"
              className="w-full bg-neutral-900 border border-white/5 px-6 py-4 focus:border-white/20 transition-all outline-none text-sm"
              required
            />
          </div>
          
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button 
            disabled={isLoading}
            className="w-full bg-white text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest leading-loose">
            Lumina Admin Panel<br/>
            Secure Encryption Enabled
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
