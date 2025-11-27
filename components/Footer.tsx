
import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-red-900/10 bg-[#050101] relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <Shield className="w-3 h-3 text-red-700" />
                <span className="text-[10px] font-bold text-stone-300 tracking-tight">IRONSTRIKE GAMES © {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6">
                <a 
                    href="https://docs.google.com/document/d/11jvDzoB29trROw9JEDuD3oAzw1VX4EQjDoX8wWMxZxo/edit?usp=drivesdk" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[10px] text-stone-600 hover:text-stone-400 transition-colors"
                >
                    Terms
                </a>
                <a href="#" className="text-[10px] text-stone-600 hover:text-stone-400 transition-colors">Privacy</a>
                <a href="https://www.roblox.com/communities/700621072/IronStrike-Games#!/about" target="_blank" rel="noreferrer" className="text-[10px] text-stone-600 hover:text-stone-400 transition-colors">Group</a>
                <a href="#" className="text-[10px] text-stone-600 hover:text-stone-400 transition-colors">Status</a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
