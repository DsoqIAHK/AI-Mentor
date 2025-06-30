import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProfileSetup from './components/ProfileSetup';
import KnowledgeBase from './components/KnowledgeBase';
import ChatInterface from './components/ChatInterface';
import PricingPage from './components/PricingPage';
import AuthGuard from './components/AuthGuard';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
            <Route path="/setup" element={
              <AuthGuard>
                <ProfileSetup />
              </AuthGuard>
            } />
            <Route path="/knowledge" element={
              <AuthGuard>
                <KnowledgeBase />
              </AuthGuard>
            } />
            <Route path="/chat" element={
              <AuthGuard>
                <ChatInterface />
              </AuthGuard>
            } />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;