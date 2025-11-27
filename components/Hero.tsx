
import React from 'react';
import { Sword, Users, Sparkles, ChevronRight } from 'lucide-react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={SectionId.HOME} className="relative pt-40 pb-24 md:pt-52 md:pb-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background Elements */}
        <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none h-full w-full opacity-50"></div>
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none animate-pulse-glow"></div>
        <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-red-950/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
            
            <div className="animate-fade-up flex justify-center mb-8">
                <div className="glass-panel inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 text-[11px] font-semibold text-red-200 hover:border-red-500/40 transition-all cursor-default shadow-[0_0_15px_rgba(220,38,38,0.1)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="tracking-wide">RPG FIGHTING SIM UPDATE 8 NOW LIVE</span>
                    <ChevronRight className="w-3 h-3 text-red-500/70" />
                </div>
            </div>

            <h1 className="animate-fade-up delay-100 text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-stone-100 mb-8 leading-[0.9] drop-shadow-2xl">
                UNLEASH<br/>
                <span className="text-gradient-red">LEGENDARY.</span>
            </h1>
            
            <p className="animate-fade-up delay-200 text-lg md:text-xl text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
                Experience the pinnacle of Roblox gaming. High-fidelity worlds, competitive mechanics, and a community built for glory.
            </p>
            
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-5">
                <button 
                    onClick={(e) => scrollToSection(e, SectionId.GAMES)}
                    className="w-full sm:w-auto group relative px-8 py-4 bg-stone-100 text-black text-sm font-black tracking-wider uppercase rounded-lg hover:scale-105 transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Play Our Games
                        <Sword className="w-4 h-4 transition-transform group-hover:rotate-45 group-hover:scale-110" />
                    </span>
                </button>
                <a 
                     href="https://discord.gg/pxB22peMh"
                     target="_blank"
                     rel="noreferrer"
                    className="w-full sm:w-auto px-8 py-4 glass-panel border border-white/10 text-stone-300 text-sm font-bold tracking-wider uppercase rounded-lg hover:bg-white/5 hover:text-white hover:border-red-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                    <Users className="w-4 h-4 text-red-500 group-hover:text-red-400" />
                    Join The Legion
                </a>
            </div>

            {/* Premium Stats Strip */}
            <div className="animate-fade-up delay-300 mt-24 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto backdrop-blur-sm">
                <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-stone-100 tracking-tighter group-hover:text-red-500 transition-colors duration-500">500k+</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mt-2 font-bold">Total Visits</div>
                </div>
                <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-stone-100 tracking-tighter group-hover:text-red-500 transition-colors duration-500">91%</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mt-2 font-bold">Rating</div>
                </div>
                <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-stone-100 tracking-tighter group-hover:text-red-500 transition-colors duration-500">1k+</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mt-2 font-bold">Daily Users</div>
                </div>
                <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-stone-100 tracking-tighter group-hover:text-red-500 transition-colors duration-500">3</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mt-2 font-bold">Active Titles</div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
