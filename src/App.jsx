import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import ContentRephraser from './components/ContentRephraser';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import InterviewQuestions from './components/InterviewQuestions';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Orb from './components/Orb';
import GlowNavItem from './components/GlowNavItem';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Sparkles, PenTool, FileText, Brain, Home, LogOut } from 'lucide-react';

import './App.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '614948147061-v71bgj604gk5i3l4s5739im343anlt21.apps.googleusercontent.com';

const TABS = [
  { id: 'analyzer',    label: 'Resume Analyzer',    path: '/analyzer',    icon: Sparkles, color: '#8b5cf6' },
  { id: 'rephraser',   label: 'Content Rephraser',  path: '/rephraser',   icon: PenTool,  color: '#3b82f6' },
  { id: 'coverletter', label: 'Cover Letter',        path: '/coverletter', icon: FileText, color: '#a855f7' },
  { id: 'interview',   label: 'Interview Questions', path: '/interview',   icon: Brain,    color: '#0ea5e9' },
];

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSplash, setIsSplash] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login';

  return (
    <div className="app">
      {/* Skip orb on auth pages for performance */}
      {!isAuthPage && (
        <>
          <div className="orb-wrapper-fixed">
            <Orb hoverIntensity={2} rotateOnHover hue={0} backgroundColor="#0a0b0f" />
          </div>
          <div className="orb-blur-overlay" />
        </>
      )}

      <AnimatePresence mode="wait">
        {/* Splash screen — skip on login page */}
        {isSplash && !isAuthPage ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'fixed', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
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
            {/* ── Sidebar (only on tool pages when logged in) ── */}
            {location.pathname !== '/' && !isAuthPage && user && (
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
                  {/* User avatar */}
                  {user && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 12px',
                      background: 'rgba(139,92,246,0.08)',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      border: '1px solid rgba(139,92,246,0.15)',
                    }}>
                      {user.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(139,92,246,0.5)' }}
                        />
                      ) : (
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '14px', fontWeight: '700', color: '#fff',
                        }}>
                          {user.name?.[0] || 'U'}
                        </div>
                      )}
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {user.name}
                        </p>
                        <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      width: '100%', padding: '8px 12px',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '10px', cursor: 'pointer',
                      color: 'rgba(239,68,68,0.8)', fontSize: '13px', fontWeight: '500',
                      transition: 'all 0.2s',
                      marginBottom: '12px',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = 'rgba(239,68,68,0.8)'; }}
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>

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
              {location.pathname !== '/' && !isAuthPage && user && (
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
                    {/* Public */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected */}
                    <Route path="/" element={<ProtectedRoute><PageTransition><LandingPage /></PageTransition></ProtectedRoute>} />
                    <Route path="/analyzer" element={<ProtectedRoute><PageTransition><ResumeAnalyzer /></PageTransition></ProtectedRoute>} />
                    <Route path="/rephraser" element={<ProtectedRoute><PageTransition><ContentRephraser /></PageTransition></ProtectedRoute>} />
                    <Route path="/coverletter" element={<ProtectedRoute><PageTransition><CoverLetterGenerator /></PageTransition></ProtectedRoute>} />
                    <Route path="/interview" element={<ProtectedRoute><PageTransition><InterviewQuestions /></PageTransition></ProtectedRoute>} />
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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
