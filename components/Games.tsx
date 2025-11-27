
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SectionId, Game } from '../types';
import { useStudio } from '../context/StudioContext';
import { Play, ArrowUpRight, Users, X, Trophy, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  isMain?: boolean;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isMain = false, onSelect }) => (
    <div 
        onClick={() => onSelect(game)}
        className={`
            group relative overflow-hidden bg-surface cursor-pointer transition-all duration-500
            ${isMain ? 'md:col-span-2 h-[450px] rounded-3xl' : 'rounded-3xl h-[450px] md:h-full'}
            border border-white/5 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:-translate-y-1
        `}
    >
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${game.imageUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"></div>
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
            <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {game.tags?.[0] && (
                        <span className="px-2.5 py-1 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-lg shadow-red-900/50">
                            {game.tags[0]}
                        </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs font-medium text-stone-300 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                        <Users className="w-3 h-3 text-red-500" /> 
                        {game.players || 'Popular'}
                    </span>
                </div>

                <h3 className={`font-bold text-white tracking-tight mb-2 leading-none drop-shadow-md ${isMain ? 'text-4xl' : 'text-3xl'}`}>
                    {game.title}
                </h3>
                
                <p className="text-stone-400 text-sm max-w-md leading-relaxed line-clamp-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {game.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    View Details <div className="w-8 h-px bg-red-500"></div>
                </div>
            </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
);

const Games: React.FC = () => {
  const { games } = useStudio();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGame(null);
      }
      // Allow keyboard navigation if a game is selected
      if (selectedGame) {
          if (e.key === 'ArrowRight') handleNext();
          if (e.key === 'ArrowLeft') handlePrev();
      }
    };

    if (selectedGame) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = 'unset'; // Unlock scroll
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedGame, games]);

  const handleClose = (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      setSelectedGame(null);
  };

  const handleNext = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!selectedGame) return;
      const currentIndex = games.findIndex(g => g.id === selectedGame.id);
      const nextIndex = (currentIndex + 1) % games.length;
      setSelectedGame(games[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!selectedGame) return;
      const currentIndex = games.findIndex(g => g.id === selectedGame.id);
      const prevIndex = (currentIndex - 1 + games.length) % games.length;
      setSelectedGame(games[prevIndex]);
  };

  if (games.length === 0) return null;

  const mainGame = games[0];
  const secondaryGames = games.slice(1);

  return (
    <section id={SectionId.GAMES} className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block">Immersive Worlds</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white">Featured Projects</h2>
                </div>
                <a href="https://roblox.com" target="_blank" rel="noreferrer" className="glass-panel px-4 py-2 rounded-full text-xs font-medium text-stone-300 hover:text-white hover:border-red-500/50 transition-all flex items-center gap-2">
                    View Studio Profile <ArrowUpRight className="w-3 h-3" />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mainGame && <GameCard game={mainGame} isMain={true} onSelect={setSelectedGame} />}
                
                <div className="md:col-span-1 flex flex-col gap-6 h-full">
                    {secondaryGames.map(game => (
                        <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
                    ))}
                </div>
            </div>
        </div>

        {/* --- PORTAL MODAL --- */}
        {selectedGame && createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop - Blur and darken */}
                <div 
                    className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fade-in cursor-pointer"
                    onClick={handleClose}
                ></div>
                
                {/* Modal Container */}
                <div 
                    className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20 border border-white/10 animate-scale-up flex flex-col md:flex-row max-h-[90vh] z-[10000]"
                    onClick={(e) => e.stopPropagation()}
                >
                    
                    {/* Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-red-600 border border-white/10 rounded-full text-white transition-all backdrop-blur-md shadow-lg hover:scale-110 cursor-pointer"
                        aria-label="Close Modal"
                        title="Close (Esc)"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Navigation Arrows (Desktop) */}
                    <button 
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-black/30 hover:bg-white/10 text-white/50 hover:text-white rounded-full backdrop-blur-sm transition-all hidden md:block"
                        title="Previous Game"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-black/30 hover:bg-white/10 text-white/50 hover:text-white rounded-full backdrop-blur-sm transition-all hidden md:block"
                        title="Next Game"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Image Section */}
                    <div className="w-full md:w-7/12 h-56 md:h-auto relative bg-stone-900 group">
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s]"
                            style={{ backgroundImage: `url(${selectedGame.imageUrl})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-100 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0a]"></div>
                        
                        {/* Tags Overlay */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                            {selectedGame.tags?.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase text-white tracking-wider shadow-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a] overflow-y-auto relative border-t md:border-t-0 md:border-l border-white/5">
                        <div className="mb-3 flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest">
                            <Gamepad2 className="w-4 h-4" /> Official Title
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-none tracking-tight">
                            {selectedGame.title}
                        </h2>
                        
                        <p className="text-stone-400 text-sm leading-relaxed mb-8 border-l-2 border-red-900/50 pl-4">
                            {selectedGame.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-surface p-4 rounded-xl border border-white/5 hover:border-red-500/30 transition-colors">
                                <div className="text-stone-500 text-[10px] uppercase font-bold mb-1 flex items-center gap-1"><Users className="w-3 h-3 text-red-500"/> Status</div>
                                <div className="text-white font-bold">{selectedGame.players || 'Live'}</div>
                            </div>
                            <div className="bg-surface p-4 rounded-xl border border-white/5 hover:border-red-500/30 transition-colors">
                                <div className="text-stone-500 text-[10px] uppercase font-bold mb-1 flex items-center gap-1"><Trophy className="w-3 h-3 text-red-500"/> Genre</div>
                                <div className="text-white font-bold">{selectedGame.tags?.[1] || 'Action'}</div>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3">
                            <a 
                                href={selectedGame.playUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full btn-shine bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/30 transition-all"
                            >
                                <Play className="w-5 h-5 fill-white" />
                                PLAY ON ROBLOX
                            </a>
                            <button 
                                onClick={handleClose} 
                                className="w-full text-stone-500 hover:text-white text-xs font-bold uppercase py-2 tracking-wider transition-colors md:hidden"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        )}
    </section>
  );
};

export default Games;
