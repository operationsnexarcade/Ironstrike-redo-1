
import React from 'react';
import { Service, NavItem, SectionId, Game, Changelog } from './types';
import { 
  ShieldCheck,
  Paintbrush,
  BarChart3,
  Code2
} from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Studio', href: `#${SectionId.GAMES}` },
  { label: 'Solutions', href: `#${SectionId.SERVICES}` },
  { label: 'Changelog', href: `#${SectionId.UPDATES}` },
];

// Initial Seed Data for Database
export const INITIAL_GAMES: Game[] = [
  {
    id: 'g1',
    title: 'RPG Fighting Simulator',
    description: 'Train your stats, unlock powerful abilities, fight bosses, and collect legendary weapons in this ultimate RPG simulation.',
    imageUrl: 'https://i.ibb.co/8LJNWLXr/no-Filter-2.jpg', 
    tags: ['Update 8', 'RPG'],
    players: 'Active',
    playUrl: 'https://www.roblox.com/games/112152012901197/x1-5-RPG-Fighting-Simulator-UPDATE-8'
  },
  {
    id: 'g2',
    title: 'Iron Sights [ALPHA]',
    description: 'A high-fidelity tactical First Person Shooter. Experience destructible environments and strategic gunplay.',
    imageUrl: 'https://i.ibb.co/ndx6r54/noFilter.jpg',
    tags: ['Alpha', 'FPS'],
    players: 'Testing',
    playUrl: 'https://www.roblox.com/games/77090179992348/Iron-Sights-ALPHA'
  },
  {
    id: 'g3',
    title: 'Cheap Admin Troll Tower',
    description: 'Climb the tower, wield cheap admin commands, and unleash chaos on your friends in this fun sandbox experience.',
    imageUrl: 'https://i.ibb.co/9kZmhjxP/no-Filter-1.jpg',
    tags: ['10 Robux', 'Funny'],
    players: 'Active',
    playUrl: 'https://www.roblox.com/games/126617452368540/Cheap-Admin-Troll-Tower-10-Robux'
  }
];

export const INITIAL_CHANGELOGS: Changelog[] = [
  {
    id: 'c1',
    title: 'RPG Sim Update 8',
    version: 'v8.0',
    date: 'Current',
    description: 'Added new boss raids, 50+ new weapons, and a complete UI overhaul for RPG Fighting Simulator.',
    type: 'update'
  },
  {
    id: 'c2',
    title: 'Iron Sights Alpha Release',
    version: 'v0.1.0',
    date: 'Oct 12',
    description: 'Initial public alpha testing for Iron Sights. Testing server stability and gun mechanics.',
    type: 'event'
  },
  {
    id: 'c3',
    title: 'Group Milestone',
    version: 'Community',
    date: 'Sep 30',
    description: 'IronStrike Games community continues to grow. Join us for exclusive development leaks.',
    type: 'event'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'development',
    title: 'Development',
    description: 'Full-stack game production from initial greyboxing to final polish and release.',
    icon: <Code2 className="w-5 h-5" />
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Deep dive telemetry into player behavior, retention cohorts, and monetization.',
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Enterprise-grade anti-cheat integration and secure remote event handling.',
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    id: 'art',
    title: 'Art Direction',
    description: 'Consistent visual identity, UI/UX design, and 3D modeling optimized for Roblox.',
    icon: <Paintbrush className="w-5 h-5" />
  }
];
