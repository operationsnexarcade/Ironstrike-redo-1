
import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Plus, LayoutDashboard, Gamepad2, ScrollText, Users, Search, Upload, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStudio } from '../context/StudioContext';
import { backend } from '../services/backend';
import { User, Game, Changelog } from '../types';

const AdminPanel: React.FC = () => {
  const { isAdminPanelOpen, setAdminPanelOpen, user } = useAuth();
  const { games, changelogs, refreshData } = useStudio();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'games' | 'changelog' | 'users'>('dashboard');
  const [userList, setUserList] = useState<User[]>([]);

  // Form States
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);
  const [editingLog, setEditingLog] = useState<Partial<Changelog> | null>(null);

  useEffect(() => {
    if (isAdminPanelOpen && activeTab === 'users') {
      backend.admin.getAllUsers().then(setUserList);
    }
  }, [isAdminPanelOpen, activeTab]);

  if (!isAdminPanelOpen || !user || user.role !== 'Admin') return null;

  // --- Handlers ---

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingGame) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditingGame({ ...editingGame, imageUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSaveGame = async () => {
    if (!editingGame || !editingGame.title) return;
    const gameToSave: Game = {
      // If it has an ID use it, otherwise generate a temporary one for the UI (Backend handles real ID gen/upsert logic)
      id: editingGame.id || `g_${Date.now()}`,
      title: editingGame.title,
      description: editingGame.description || '',
      imageUrl: editingGame.imageUrl || 'https://via.placeholder.com/800x600',
      tags: editingGame.tags || [],
      players: editingGame.players || '0 Playing',
      playUrl: editingGame.playUrl || ''
    };
    try {
        await backend.cms.saveGame(gameToSave);
        await refreshData();
        setEditingGame(null);
    } catch (e: any) {
        alert("Failed to save game. If using local storage, the image might be too large. Try a smaller image or a URL.");
    }
  };

  const handleDeleteGame = async (id: string) => {
    if(confirm('Delete this game?')) {
        await backend.cms.deleteGame(id);
        await refreshData();
    }
  };

  const handleSaveLog = async () => {
    if (!editingLog || !editingLog.title) return;
    const logToSave: Changelog = {
      id: editingLog.id || `c_${Date.now()}`,
      title: editingLog.title,
      version: editingLog.version || 'v1.0.0',
      date: editingLog.date || new Date().toLocaleDateString(),
      description: editingLog.description || '',
      type: editingLog.type || 'update'
    };
    await backend.cms.saveChangelog(logToSave);
    await refreshData();
    setEditingLog(null);
  };

    const handleDeleteLog = async (id: string) => {
        if(confirm('Delete this changelog?')) {
            await backend.cms.deleteChangelog(id);
            await refreshData();
        }
    };

    const handleDeleteUser = async (id: string) => {
        if(confirm('Delete this user profile? (Note: This does not delete the account auth)')) {
            const newList = await backend.admin.deleteUser(id);
            setUserList(newList);
        }
    }
    
    const handleResetData = async () => {
        if(confirm('WARNING: This will RESET all games and logs to the initial defaults. Any custom changes will be lost. Continue?')) {
            await backend.admin.resetToDefaults();
            await refreshData();
            alert("Data reset to defaults.");
        }
    }


  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-up">
      <div className="w-full max-w-6xl h-[85vh] bg-surface border border-red-900/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-black/50 border-r border-red-900/20 flex flex-col">
          <div className="p-6 border-b border-red-900/20">
            <h2 className="text-xl font-bold text-red-500 tracking-tight">STUDIO ADMIN</h2>
            <p className="text-[10px] text-stone-500 uppercase">Control Panel v1.0</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-red-900/20 text-white' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('games')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'games' ? 'bg-red-900/20 text-white' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
            >
              <Gamepad2 className="w-4 h-4" /> Games
            </button>
            <button 
              onClick={() => setActiveTab('changelog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'changelog' ? 'bg-red-900/20 text-white' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
            >
              <ScrollText className="w-4 h-4" /> Changelogs
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-red-900/20 text-white' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
            >
              <Users className="w-4 h-4" /> User Base
            </button>
          </nav>
          
          <div className="p-4 border-t border-red-900/20">
            <button onClick={() => setAdminPanelOpen(false)} className="flex items-center gap-2 text-stone-500 hover:text-white text-xs transition-colors">
              <X className="w-4 h-4" /> Close Panel
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-background p-8">
            
            {activeTab === 'dashboard' && (
                <div className="space-y-8 animate-fade-up">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-medium text-white">System Overview</h2>
                        <button onClick={handleResetData} className="text-xs text-red-500 hover:text-red-300 flex items-center gap-1 border border-red-900/30 px-3 py-1.5 rounded bg-red-950/10 hover:bg-red-950/30">
                            <RefreshCw className="w-3 h-3" /> Reset Data
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-surface border border-red-900/20 rounded-xl">
                            <p className="text-stone-500 text-xs uppercase font-bold">Total Games</p>
                            <p className="text-4xl font-bold text-white mt-2">{games.length}</p>
                        </div>
                        <div className="p-6 bg-surface border border-red-900/20 rounded-xl">
                            <p className="text-stone-500 text-xs uppercase font-bold">Updates Pushed</p>
                            <p className="text-4xl font-bold text-white mt-2">{changelogs.length}</p>
                        </div>
                        <div className="p-6 bg-surface border border-red-900/20 rounded-xl">
                            <p className="text-stone-500 text-xs uppercase font-bold">Admin Status</p>
                            <p className="text-xl font-bold text-green-500 mt-2 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Online</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'games' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-medium text-white">Project Library</h2>
                        <button 
                            onClick={() => setEditingGame({})}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Project
                        </button>
                    </div>

                    {editingGame && (
                        <div className="bg-surface p-6 rounded-xl border border-red-900/30 mb-8 animate-fade-up">
                            <h3 className="text-lg font-medium text-white mb-4">{editingGame.id ? 'Edit Game' : 'New Game'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input placeholder="Title" value={editingGame.title || ''} onChange={e => setEditingGame({...editingGame, title: e.target.value})} className="bg-black border border-red-900/20 rounded p-2 text-stone-200" />
                                <input placeholder="Players (e.g. 12k Playing)" value={editingGame.players || ''} onChange={e => setEditingGame({...editingGame, players: e.target.value})} className="bg-black border border-red-900/20 rounded p-2 text-stone-200" />
                                <input placeholder="Tag (Single)" value={editingGame.tags?.[0] || ''} onChange={e => setEditingGame({...editingGame, tags: [e.target.value]})} className="bg-black border border-red-900/20 rounded p-2 text-stone-200" />
                                
                                {/* Image Upload Section */}
                                <div className="md:col-span-2 border border-red-900/20 rounded p-4 bg-black/50">
                                    <label className="block text-xs text-stone-500 uppercase font-bold mb-3">Cover Image</label>
                                    <div className="flex items-start gap-4">
                                        <div className="w-24 h-24 bg-black border border-red-900/30 rounded flex items-center justify-center overflow-hidden shrink-0">
                                            {editingGame.imageUrl ? (
                                                <img src={editingGame.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-red-900/50"><Gamepad2 className="w-8 h-8" /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <p className="text-[10px] text-stone-400 mb-1">Upload File</p>
                                                <label className="flex items-center justify-center w-full px-4 py-2 bg-red-900/10 border border-red-900/30 rounded cursor-pointer hover:bg-red-900/20 transition-colors group">
                                                    <Upload className="w-4 h-4 text-red-400 mr-2 group-hover:scale-110 transition-transform" />
                                                    <span className="text-xs text-red-300 font-medium">Choose Image File</span>
                                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                                </label>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-red-900/20"></div>
                                                </div>
                                                <div className="relative flex justify-center text-[10px] uppercase">
                                                    <span className="bg-black px-2 text-stone-600">Or Paste URL</span>
                                                </div>
                                            </div>
                                             <input 
                                                placeholder="https://..." 
                                                value={editingGame.imageUrl || ''} 
                                                onChange={e => setEditingGame({...editingGame, imageUrl: e.target.value})} 
                                                className="w-full bg-black border border-red-900/20 rounded p-2 text-stone-200 text-xs" 
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <textarea placeholder="Description" value={editingGame.description || ''} onChange={e => setEditingGame({...editingGame, description: e.target.value})} className="w-full bg-black border border-red-900/20 rounded p-2 text-stone-200 h-24 mb-4" />
                            <div className="flex gap-2 justify-end">
                                <button onClick={() => setEditingGame(null)} className="px-4 py-2 text-stone-400 hover:text-white">Cancel</button>
                                <button onClick={handleSaveGame} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold">Save Project</button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        {games.map(game => (
                            <div key={game.id} className="flex items-center justify-between p-4 bg-surface border border-red-900/10 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img src={game.imageUrl} className="w-12 h-12 rounded object-cover" />
                                    <div>
                                        <h3 className="text-white font-medium">{game.title}</h3>
                                        <p className="text-xs text-stone-500">{game.tags?.[0]}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingGame(game)} className="p-2 text-stone-400 hover:text-white hover:bg-white/5 rounded"><Search className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteGame(game.id)} className="p-2 text-red-900 hover:text-red-500 hover:bg-red-900/10 rounded"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'changelog' && (
                <div className="space-y-6 animate-fade-up">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-medium text-white">Changelogs</h2>
                        <button 
                            onClick={() => setEditingLog({})}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> New Entry
                        </button>
                    </div>

                    {editingLog && (
                         <div className="bg-surface p-6 rounded-xl border border-red-900/30 mb-8 animate-fade-up">
                         <h3 className="text-lg font-medium text-white mb-4">{editingLog.id ? 'Edit Log' : 'New Log'}</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             <input placeholder="Title" value={editingLog.title || ''} onChange={e => setEditingLog({...editingLog, title: e.target.value})} className="bg-black border border-red-900/20 rounded p-2 text-stone-200" />
                             <input placeholder="Version (v2.0)" value={editingLog.version || ''} onChange={e => setEditingLog({...editingLog, version: e.target.value})} className="bg-black border border-red-900/20 rounded p-2 text-stone-200" />
                             <input placeholder="Date (Oct 24)" value={editingLog.date || ''} onChange={e => setEditingLog({...editingLog, date: e.target.value})} className="bg-black border border-red-900/20 rounded p-2 text-stone-200" />
                             <select value={editingLog.type || 'update'} onChange={e => setEditingLog({...editingLog, type: e.target.value as any})} className="bg-black border border-red-900/20 rounded p-2 text-stone-200">
                                 <option value="update">Update</option>
                                 <option value="event">Event</option>
                                 <option value="maintenance">Maintenance</option>
                             </select>
                         </div>
                         <textarea placeholder="Description" value={editingLog.description || ''} onChange={e => setEditingLog({...editingLog, description: e.target.value})} className="w-full bg-black border border-red-900/20 rounded p-2 text-stone-200 h-24 mb-4" />
                         <div className="flex gap-2 justify-end">
                             <button onClick={() => setEditingLog(null)} className="px-4 py-2 text-stone-400 hover:text-white">Cancel</button>
                             <button onClick={handleSaveLog} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold">Post Update</button>
                         </div>
                     </div>
                    )}

                    <div className="space-y-4">
                         {changelogs.map(log => (
                             <div key={log.id} className="p-4 bg-surface border border-red-900/10 rounded-lg flex justify-between items-start">
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                         <h4 className="text-white font-medium">{log.title}</h4>
                                         <span className="text-[10px] bg-red-900/30 text-red-400 px-1.5 py-0.5 rounded border border-red-900/20">{log.version}</span>
                                     </div>
                                     <p className="text-xs text-stone-500 max-w-xl">{log.description}</p>
                                 </div>
                                 <button onClick={() => handleDeleteLog(log.id)} className="text-stone-600 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                             </div>
                         ))}
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="space-y-6 animate-fade-up">
                    <h2 className="text-2xl font-medium text-white mb-6">User Database</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-stone-400">
                            <thead className="bg-black/50 text-stone-500 uppercase font-bold text-xs">
                                <tr>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Joined</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-900/10">
                                {userList.map(u => (
                                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={u.avatarUrl} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="text-white font-medium">{u.name}</p>
                                                <p className="text-xs">{u.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.role === 'Admin' ? 'bg-red-900/50 text-red-200' : 'bg-stone-800 text-stone-400'}`}>{u.role}</span>
                                        </td>
                                        <td className="p-4">{new Date(u.joinDate).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            {u.role !== 'Admin' && (
                                                <button onClick={() => handleDeleteUser(u.id)} className="text-red-900 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
