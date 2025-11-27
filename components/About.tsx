import React from 'react';
import { Rss } from 'lucide-react';
import { SectionId } from '../types';
import { useStudio } from '../context/StudioContext';

const Updates: React.FC = () => {
  const { changelogs } = useStudio();

  return (
    <section id={SectionId.UPDATES} className="py-24 bg-[#0a0202] border-t border-red-900/20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-medium text-stone-100 tracking-tight mb-4">Changelog</h2>
                    <p className="text-sm text-stone-400 mb-6">We believe in building in public. Track our progress and latest engine updates.</p>
                    <a href="#" className="text-xs font-medium text-red-400 border-b border-red-900/50 pb-0.5 hover:border-red-400 transition-colors inline-flex items-center gap-1">
                        Subscribe to RSS <Rss className="w-3 h-3" />
                    </a>
                </div>
                <div className="md:w-2/3 relative">
                    <div className="absolute left-2.5 top-0 bottom-0 w-px bg-red-900/20"></div>
                    
                    <div className="space-y-8">
                        {changelogs.map(log => (
                            <div key={log.id} className="relative pl-10 group">
                                <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-[#0a0202] border border-red-900/50 flex items-center justify-center z-10 group-hover:border-red-500 transition-colors">
                                    <div className="w-1.5 h-1.5 bg-red-900 rounded-full group-hover:bg-red-500 transition-colors"></div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                                    <h3 className="text-sm font-medium text-stone-200">{log.title}</h3>
                                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                                        log.type === 'event' 
                                            ? 'text-stone-500 bg-stone-900 border-stone-800' 
                                            : 'text-red-400 bg-red-950/30 border-red-900/30'
                                    }`}>
                                        {log.version}
                                    </span>
                                    <span className="text-xs text-stone-600 ml-auto">{log.date}</span>
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed">{log.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Updates;