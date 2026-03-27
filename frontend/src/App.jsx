import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import ContentRephraser from './components/ContentRephraser';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import InterviewQuestions from './components/InterviewQuestions';
import LandingPage from './components/LandingPage';
import Orb from './components/Orb';
import GlowNavItem from './components/GlowNavItem';
import PageTransition from './components/PageTransition';
import { Sparkles, PenTool, FileText, Brain, Home } from 'lucide-react';

import './App.css';

const TABS = [
  { id: 'analyzer',   label: 'Resume Analyzer',     path: '/analyzer',    icon: Sparkles, color: '#8b5cf6' },
  { id: 'rephraser',  label: 'Content Rephraser',    path: '/rephraser',   icon: PenTool,  color: '#3b82f6' },
  { id: 'coverletter',label: 'Cover Letter',          path: '/coverletter', icon: FileText, color: '#a855f7' },
  { id: 'interview',  label: 'Interview Questions',   path: '/interview',   icon: Brain,    color: '#0ea5e9' },
];

function AppContent() {
  const location = useLocation();
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <div className="orb-wrapper-fixed">
        <Orb hoverIntensity={2} rotateOnHover hue={0} backgroundColor="#0a0b0f" />
      </div>
      <div className="orb-blur-overlay" />

      <AnimatePresence mode="wait">
        {isSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              pointerEvents: 'none'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
            >
              <div 
                className="brand-logo"
                style={{ width: '120px', height: '120px', fontSize: '36px', borderRadius: '30px', boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' }}
              >
                IQ
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #fff, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ResumeIQ
              </motion.h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ display: 'flex', width: '100%', height: '100%' }}
          >
            {/* ── Sidebar (Hidden on Landing) ── */}
            {location.pathname !== '/' && (
              <aside className="sidebar">
                <div className="sidebar-brand">
                  <div className="brand-logo">IQ</div>
                  <div className="brand-text">
                    <span className="brand-name">ResumeIQ</span>
                    <span className="brand-sub">Smart Analyzer</span>
                  </div>
                </div>

                <nav className="sidebar-nav">
                  {TABS.map((tab) => (
                    <GlowNavItem 
                      key={tab.id} 
                      to={tab.path} 
                      label={tab.label} 
                      Icon={tab.icon} 
                      color={tab.color} 
                    />
                  ))}
                </nav>

                <div className="sidebar-footer">
                  <p>Powered by</p>
                  <div className="powered-badge">
                    <span>⚡</span>
                    <span>Groq + Llama 3</span>
                  </div>
                </div>
              </aside>
            )}

            {/* ── Main Content Area ── */}
            <main className="main">
              {location.pathname !== '/' && (
                <header className="topbar">
                  <div className="topbar-title">
                    {(() => {
                      const tab = TABS.find(t => t.path === location.pathname);
                      return tab ? <><tab.icon size={20} color={tab.color} /> {tab.label}</> : 'Dashboard';
                    })()}
                  </div>
                  <GlowNavItem to="/" label="Home" Icon={Home} color="#ffffff" isActive={false} size={24} />
                </header>
              )}

              <div className="content">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
                    <Route path="/analyzer" element={<PageTransition><ResumeAnalyzer /></PageTransition>} />
                    <Route path="/rephraser" element={<PageTransition><ContentRephraser /></PageTransition>} />
                    <Route path="/coverletter" element={<PageTransition><CoverLetterGenerator /></PageTransition>} />
                    <Route path="/interview" element={<PageTransition><InterviewQuestions /></PageTransition>} />
                  </Routes>
                </AnimatePresence>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
