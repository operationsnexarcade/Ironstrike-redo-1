
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronDown, Lock, User as UserIcon } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, setAuthModalOpen, setDashboardOpen, setAdminPanelOpen } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div 
        className={`
            rounded-full px-6 py-3 flex items-center gap-8 relative transition-all duration-500
            ${scrolled ? 'glass-panel shadow-2xl shadow-black/50' : 'bg-transparent border border-transparent'}
        `}
      >
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-br from-red-900 to-black rounded-lg border border-red-500/20 group-hover:border-red-500/50 transition-all shadow-lg">
               <Shield className="w-5 h-5 text-red-500 fill-red-950/50" />
            </div>
            <div className="flex flex-col leading-none justify-center">
                <span className="font-bold tracking-tight text-sm text-white">IRONSTRIKE</span>
                <span className="text-[9px] tracking-[0.2em] text-red-500 font-bold uppercase group-hover:text-red-400 transition-colors">Games</span>
            </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-stone-400">
            {NAV_ITEMS.map((item) => (
                <a 
                    key={item.label}
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-red-500 hover:after:w-full after:transition-all"
                >
                    {item.label}
                </a>
            ))}
        </div>

        <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-4">
            {/* Admin Button */}
            {isAdmin && (
                <button 
                    onClick={() => setAdminPanelOpen(true)}
                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 transition-colors"
                    title="Open Admin Panel"
                >
                    <Lock className="w-3 h-3" />
                </button>
            )}

            {/* Auth Button */}
            {user ? (
                <button 
                onClick={() => setDashboardOpen(true)}
                className="flex items-center gap-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-all"
            >
                <img src={user.avatarUrl} alt="Profile" className="w-5 h-5 rounded-full ring-2 ring-red-500/50" />
                <span className="max-w-[80px] truncate">{user.name}</span>
            </button>
            ) : (
                <button 
                    onClick={() => setAuthModalOpen(true)}
                    className="flex items-center gap-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-full px-5 py-2 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:-translate-y-0.5"
                >
                    <UserIcon className="w-3 h-3" />
                    Member Login
                </button>
            )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
             <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 glass-panel rounded-3xl p-6 flex flex-col gap-4 animate-fade-up md:hidden border border-red-500/10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-stone-300 hover:text-white text-lg font-bold p-2 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
             <div className="pt-4">
             {user ? (
                 <div className="flex flex-col gap-3">
                    {isAdmin && (
                        <button onClick={() => {setAdminPanelOpen(true); setIsOpen(false);}} className="w-full text-center text-red-400 font-bold p-3 bg-red-900/10 rounded-xl">Admin Panel</button>
                    )}
                     <button 
                        onClick={() => {
                            setDashboardOpen(true);
                            setIsOpen(false);
                        }}
                        className="flex items-center justify-center gap-3 text-white p-3 bg-white/5 rounded-xl font-bold"
                     >
                        <img src={user.avatarUrl} className="w-6 h-6 rounded-full" />
                        Dashboard
                     </button>
                 </div>
             ) : (
                <button
                    onClick={() => {
                    setIsOpen(false);
                    setAuthModalOpen(true);
                    }}
                    className="text-center w-full text-white bg-red-600 py-3 rounded-xl font-bold shadow-lg shadow-red-900/50"
                >
                    Member Login
                </button>
             )}
             </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
