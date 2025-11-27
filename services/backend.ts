
import { supabase } from './supabaseClient';
import { User, Game, Changelog } from '../types';
import { INITIAL_GAMES, INITIAL_CHANGELOGS } from '../constants';

// --- Helper Types for DB Mapping ---
const mapUser = (profile: any): User => ({
  id: profile.id,
  name: profile.name,
  email: profile.email,
  role: profile.role,
  avatarUrl: profile.avatar_url,
  joinDate: profile.join_date,
});

const mapGame = (game: any): Game => ({
  id: game.id,
  title: game.title,
  description: game.description,
  imageUrl: game.image_url,
  tags: game.tags || [],
  players: game.players,
  playUrl: game.play_url
});

const mapChangelog = (log: any): Changelog => ({
  id: log.id,
  title: log.title,
  version: log.version,
  date: log.date,
  description: log.description,
  type: log.type
});

export const backend = {
  auth: {
    async getCurrentUser(): Promise<User | null> {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      return profile ? mapUser(profile) : null;
    },

    async loginWithPassword(email: string, password: string): Promise<User> {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error("No user returned");

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profile) throw new Error("Profile not found");
      return mapUser(profile);
    },

    async signup(name: string, email: string, password: string): Promise<User> {
      // 1. Create Auth User
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup failed");

      // If email confirmation is required, the session might be null.
      if (!authData.session) {
        throw new Error("Please check your email to confirm your account before logging in.");
      }

      // 2. Check if this is the first user (to make Admin)
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const role = count === 0 ? 'Admin' : 'Scout';

      // 3. Create Profile Entry
      const newProfile = {
        id: authData.user.id,
        name: name,
        email: email,
        role: role,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        join_date: new Date().toISOString()
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([newProfile]);

      if (profileError) throw profileError;

      return mapUser(newProfile);
    },

    async logout(): Promise<void> {
      await supabase.auth.signOut();
    },

    async updateUser(updatedUser: User): Promise<User> {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedUser.name,
          avatar_url: updatedUser.avatarUrl
        })
        .eq('id', updatedUser.id);

      if (error) throw error;
      return updatedUser;
    }
  },

  cms: {
    async getGames(): Promise<Game[]> {
      // Force use of constants to ensure images are updated immediately
      // This ignores the database state to prevent stale data issues
      return INITIAL_GAMES;
    },

    async saveGame(game: Game): Promise<void> {
      // Allow saving to DB for future use, even if we are currently reading from constants
      const gameData = {
        title: game.title,
        description: game.description,
        image_url: game.imageUrl,
        tags: game.tags,
        players: game.players,
        play_url: game.playUrl
      };

      if (game.id && !game.id.startsWith('g_') && !game.id.startsWith('temp_')) {
        // Update existing
        const { error } = await supabase
          .from('games')
          .update(gameData)
          .eq('id', game.id);
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('games')
          .insert([gameData]);
        if (error) throw error;
      }
    },

    async deleteGame(id: string): Promise<void> {
      const { error } = await supabase.from('games').delete().eq('id', id);
      if (error) throw error;
    },

    async getChangelogs(): Promise<Changelog[]> {
      try {
        const { data, error } = await supabase.from('changelogs').select('*').order('date', { ascending: false });
        
        if (error || !data || data.length === 0) {
          return INITIAL_CHANGELOGS;
        }

        return data.map(mapChangelog);
      } catch (e) {
        return INITIAL_CHANGELOGS;
      }
    },

    async saveChangelog(log: Changelog): Promise<void> {
      const logData = {
        title: log.title,
        version: log.version,
        date: log.date,
        description: log.description,
        type: log.type
      };

      if (log.id && !log.id.startsWith('c_')) {
        const { error } = await supabase.from('changelogs').update(logData).eq('id', log.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('changelogs').insert([logData]);
        if (error) throw error;
      }
    },

    async deleteChangelog(id: string): Promise<void> {
      const { error } = await supabase.from('changelogs').delete().eq('id', id);
      if (error) throw error;
    }
  },

  admin: {
    async getAllUsers(): Promise<User[]> {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return data.map(mapUser);
    },

    async deleteUser(id: string): Promise<User[]> {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      return this.getAllUsers();
    },

    async resetToDefaults(): Promise<void> {
      // Truncate tables (requires RLS policy allowing delete)
      await supabase.from('games').delete().neq('id', '00000000-0000-0000-0000-000000000000'); 
      await supabase.from('changelogs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    }
  }
};
