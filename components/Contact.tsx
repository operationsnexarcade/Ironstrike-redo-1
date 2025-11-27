
import React from 'react';
import { SectionId } from '../types';
import { Mail, Gamepad2, Users, Phone, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-32 border-t border-white/5 relative overflow-hidden bg-[#050101]">
        {/* Radial Gradient Footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <div className="animate-float w-16 h-16 mx-auto bg-gradient-to-b from-red-900/20 to-black rounded-2xl flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                <Users className="w-8 h-8 text-red-400" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-6 drop-shadow-lg">
                Join the <span className="text-gradient-red font-bold">Iron Legion.</span>
            </h2>
            <p className="text-stone-400 text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
                Connect with thousands of other players. Get exclusive sneak peeks, participate in events, and shape the future of our games.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                    href="https://discord.gg/pxB22peMh" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full sm:w-64 group flex items-center justify-between px-6 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-[#5865F2]/25 hover:-translate-y-1"
                >
                    <div className="flex items-center gap-3">
                        <Gamepad2 className="w-5 h-5" /> 
                        <span>Join Discord</span>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
                
                <a 
                    href="https://www.roblox.com/communities/700621072/IronStrike-Games#!/about" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full sm:w-64 group flex items-center justify-between px-6 py-4 bg-stone-100 hover:bg-white text-black text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-1"
                >
                     <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" /> 
                        <span>Roblox Group</span>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center">
                <p className="text-stone-600 text-xs uppercase tracking-widest font-bold mb-4">Business Inquiries</p>
                <div className="flex gap-6 text-sm">
                    <a href="mailto:ironstrikegamesmail@gmail.com" className="text-stone-400 hover:text-red-400 transition-colors flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email Team
                    </a>
                    <a href="tel:4255397013" className="text-stone-400 hover:text-red-400 transition-colors flex items-center gap-2">
                        <Phone className="w-4 h-4" /> 425-539-7013
                    </a>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Contact;
