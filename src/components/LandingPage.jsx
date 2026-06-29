import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, PenTool, FileText, Brain } from 'lucide-react';
import Orb from './Orb';
import ShinyText from './ShinyText';
import GlowIcon from './GlowIcon';
import GlowButton from './GlowButton';

export default function LandingPage() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const features = [
    { title: 'Resume Analyzer', desc: 'Get ATS-optimized professional feedback instantly.', icon: Sparkles, color: '#8b5cf6', path: '/analyzer' },
    { title: 'Content Rephraser', desc: 'Transform casual bullet points into powerful action items.', icon: PenTool, color: '#3b82f6', path: '/rephraser' },
    { title: 'Cover Letter', desc: 'Create tailored letters that stand out to recruiters.', icon: FileText, color: '#a855f7', path: '/coverletter' },
    { title: 'Interview Q&A', desc: 'Prepare with AI-generated role-specific questions.', icon: Brain, color: '#0ea5e9', path: '/interview' },
  ];

  return (
    <div className="landing-page">
      {/* ── Hero Section ── */}
      <section className="hero">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Resumes beyond imagination, <br />
          <ShinyText>one prompt away.</ShinyText>
        </motion.h1>

        <motion.div 
          className="hero-input-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="input-wrapper">
             <input 
               type="text" 
               placeholder="Optimize my resume for a Software Engineer role..."
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
             />
             <GlowButton variant="secondary" onClick={() => navigate('/analyzer')}>
               Generate <span className="arrow">→</span>
             </GlowButton>
          </div>
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section className="features-grid" id="features">
        {features.map((feature, idx) => (
          <motion.div 
            key={feature.title} 
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
            onClick={() => navigate(feature.path)}
            style={{ cursor: 'pointer' }}
          >
            <GlowIcon Icon={feature.icon} color={feature.color} size={32} />
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
