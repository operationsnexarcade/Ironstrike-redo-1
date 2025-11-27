import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game, Changelog } from '../types';
import { backend } from '../services/backend';

interface StudioContextType {
  games: Game[];
  changelogs: Changelog[];
  refreshData: () => Promise<void>;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) throw new Error('useStudio must be used within a StudioProvider');
  return context;
};

export const StudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);

  const refreshData = async () => {
    try {
      const g = await backend.cms.getGames();
      const c = await backend.cms.getChangelogs();
      setGames(g);
      setChangelogs(c);
    } catch (e) {
      console.error("Failed to load studio data", e);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <StudioContext.Provider value={{ games, changelogs, refreshData }}>
      {children}
    </StudioContext.Provider>
  );
};