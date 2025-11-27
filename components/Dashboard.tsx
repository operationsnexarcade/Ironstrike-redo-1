import React, { useState } from 'react';
import { X, User as UserIcon, Calendar, Edit2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, isDashboardOpen, setDashboardOpen, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  if (!isDashboardOpen || !user) return null;

  const startEditing = () => {
    setEditName(user.name);
    setEditAvatar(user.avatarUrl);
    setIsEditing(true);
  };

  const saveProfile = async () => {
    await updateProfile(editName, editAvatar);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setDashboardOpen(false)}></div>
      
      <div className="relative bg-background w-full max-w-lg rounded-2xl border border-red-900/30 shadow-2xl overflow-hidden flex flex-col animate-fade-up">
        
        {/* Toolbar */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-red-900/20 bg-surface">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-medium text-white leading-tight">Command Center</h2>
              <p className="text-[10px] uppercase tracking-wider text-stone-500">Player Profile</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button onClick={logout} className="px-3 py-1.5 text-xs font-medium text-stone-400 hover:text-white hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-900/30">
               Log Out
             </button>
             <button onClick={() => setDashboardOpen(false)} className="p-1.5 text-stone-400 hover:text-white hover:bg-red-900/20 rounded-full transition-colors">
               <X className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="p-8 flex flex-col items-center">
            <div className="relative group mb-6">
                <img 
                  src={isEditing ? editAvatar : user.avatarUrl} 
                  alt={user.name} 
                  className="w-32 h-32 rounded-full border-2 border-red-900/40 shadow-xl bg-black object-cover"
                />
                {isEditing && (
                  <div className="mt-4 w-full">
                     <label className="text-[10px] text-stone-500 uppercase font-bold block mb-1">Avatar URL</label>
                     <input 
                        type="text" 
                        value={editAvatar} 
                        onChange={(e) => setEditAvatar(e.target.value)}
                        className="w-full text-xs bg-black border border-red-900/30 rounded p-2 text-stone-300"
                        placeholder="https://..."
                     />
                  </div>
                )}
            </div>

            <div className="w-full mb-6">
                {isEditing ? (
                 <div className="text-center">
                    <input 
                        type="text" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        className="text-2xl font-medium text-white bg-black border border-red-900/30 rounded px-2 py-1 text-center w-full mb-4 focus:border-red-500 focus:outline-none"
                    />
                    <button onClick={saveProfile} className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-bold transition-colors flex items-center gap-2 mx-auto">
                        <Check className="w-4 h-4" /> Save Changes
                    </button>
                 </div>
                ) : (
                 <div className="text-center">
                    <h3 className="text-3xl font-medium text-white mb-2">{user.name}</h3>
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-red-900/30 text-red-400 bg-red-950/20">
                        {user.role}
                        </span>
                        <button onClick={startEditing} className="p-1 text-stone-500 hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                 </div>
                )}
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-red-900/10">
                    <UserIcon className="w-5 h-5 text-stone-600" />
                    <div>
                        <p className="text-[10px] text-stone-500 uppercase font-bold">Email</p>
                        <p className="text-xs text-stone-300 truncate w-32">{user.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-red-900/10">
                    <Calendar className="w-5 h-5 text-stone-600" />
                    <div>
                        <p className="text-[10px] text-stone-500 uppercase font-bold">Joined</p>
                        <p className="text-xs text-stone-300">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;