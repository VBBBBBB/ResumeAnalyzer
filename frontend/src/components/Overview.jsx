import React from 'react';
import { Layout, CheckCircle, Target, TrendingUp } from 'lucide-react';
import GlowIcon from './GlowIcon';

export default function Overview() {
  const features = [
    { icon: Target, title: 'ATS Analysis', description: 'Deep scan matches your resume against specific job requirements.', color: '#10b981' },
    { icon: TrendingUp, title: 'Optimization', description: 'Real-time suggestions to improve match scores and keyword density.', color: '#3b82f6' },
    { icon: CheckCircle, title: 'Validation', description: 'Confirm that your resume meets modern recruitment standards.', color: '#8b5cf6' },
  ];

  return (
    <div className="feature-section">
      <div className="section-header glass-card">
        <GlowIcon Icon={Layout} color="#10b981" size={32} />
        <div>
          <h2>System Overview</h2>
          <p>Master your material with ResumeIQ's holistic analysis suite.</p>
        </div>
      </div>

      <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {features.map((f, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GlowIcon Icon={f.icon} color={f.color} size={24} />
            <h3 style={{ margin: 0 }}>{f.title}</h3>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9em' }}>{f.description}</p>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3>Why ResumeIQ?</h3>
        <p>
          In a competitive job market, your resume often passes through an Automated Tracking System (ATS) before ever being seen by a human. 
          ResumeIQ bridges this gap by providing you with the same diagnostic power as top-tier recruiters.
        </p>
      </div>
    </div>
  );
}
