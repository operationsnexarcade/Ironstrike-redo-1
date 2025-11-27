
import React from 'react';
import { SectionId } from '../types';
import { SERVICES } from '../constants';
import { Cpu, Globe, Shield } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-32 bg-[#050101] relative z-10 overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[120px] rounded-full pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="animate-fade-up">
                    <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block">Our Philosophy</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-8">
                        The IronStrike <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Standard.</span>
                    </h2>
                    <p className="text-stone-400 text-lg leading-relaxed mb-8 font-light">
                        We don't just make games; we craft digital experiences. Every pixel, every line of code, and every mechanic is polished to perfection for our fans.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500 transition-colors">
                                <Cpu className="w-5 h-5 text-red-500" />
                            </div>
                            <span className="text-stone-300 font-medium">Lag-free, optimized Luau architecture</span>
                        </div>
                        <div className="flex items-center gap-4 group p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500 transition-colors">
                                <Globe className="w-5 h-5 text-red-500" />
                            </div>
                            <span className="text-stone-300 font-medium">Immersive, persistent open worlds</span>
                        </div>
                        <div className="flex items-center gap-4 group p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500 transition-colors">
                                <Shield className="w-5 h-5 text-red-500" />
                            </div>
                            <span className="text-stone-300 font-medium">Competitive integrity & Anti-cheat</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {SERVICES.map((service, index) => (
                        <div 
                            key={service.id} 
                            className={`
                                glass-card p-8 rounded-2xl group hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.15)] hover:border-red-500/20 border-white/5 
                                opacity-0 animate-fade-up
                                ${index % 2 === 1 ? 'sm:translate-y-12' : ''}
                            `}
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900/40 to-black border border-white/10 flex items-center justify-center mb-6 text-red-400 group-hover:scale-110 group-hover:text-white group-hover:border-red-500/50 transition-all duration-300 shadow-lg">
                                {service.icon}
                            </div>
                            <h3 className="text-white text-lg font-bold mb-3 tracking-tight">{service.title}</h3>
                            <p className="text-sm text-stone-500 leading-relaxed group-hover:text-stone-400 transition-colors">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Services;
