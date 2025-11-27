
import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Updates from './components/About';
import Games from './components/Games';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import { StudioProvider } from './context/StudioContext';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-red-900 selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <Games />
        <Services />
        <Updates />
        <Contact />
      </main>
      <Footer />
      
      {/* Overlays */}
      <AuthModal />
      <Dashboard />
      <AdminPanel />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StudioProvider>
        <AppContent />
      </StudioProvider>
    </AuthProvider>
  );
};

export default App;
