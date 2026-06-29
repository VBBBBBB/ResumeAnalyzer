import React from 'react';
import { Info, Github, Globe, Mail } from 'lucide-react';
import GlowIcon from './GlowIcon';

export default function About() {
  return (
    <div className="feature-section">
      <div className="section-header glass-card">
        <GlowIcon Icon={Info} color="#6366f1" size={32} />
        <div>
          <h2>About ResumeIQ</h2>
          <p>Learn more about the mission and technology behind the intelligence.</p>
        </div>
      </div>

      <div className="glass-card">
        <h3>Our Mission</h3>
        <p>
          ResumeIQ was founded on the principle that every candidate deserves a fair chance. 
          We believe that talent should not be obscured by formatting or keyword mismatches.
        </p>
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3>Technology Stack</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0 }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#8b5cf6' }}>⚡</span> Powered by Groq & Llama 3.1
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#6366f1' }}>⚛️</span> Built with React & Vite
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#10b981' }}>🚀</span> Accelerated by FastAPI
          </li>
        </ul>
      </div>

      <div className="contact-footer" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <a href="#" className="social-link"><Github size={20} /> GitHub</a>
        <a href="#" className="social-link"><Globe size={20} /> Website</a>
        <a href="#" className="social-link"><Mail size={20} /> Contact</a>
      </div>
    </div>
  );
}
