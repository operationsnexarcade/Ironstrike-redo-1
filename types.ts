import { ReactNode } from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  players?: string;
  playUrl?: string;
}

export interface Changelog {
  id: string;
  title: string;
  version: string;
  date: string;
  description: string;
  type: 'update' | 'event' | 'maintenance';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Scout' | 'Developer' | 'Admin';
  avatarUrl: string;
  joinDate: string;
}

export enum SectionId {
  HOME = 'home',
  GAMES = 'games',
  SERVICES = 'services',
  UPDATES = 'updates',
  CONTACT = 'contact'
}