import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log('Google credential received, attempting login...');
      await login(credentialResponse.credential);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.detail || err.message || 'Login failed unexpectedly');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 60% 20%, #1a0533 0%, #0a0b0f 60%, #0d1117 100%)',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        borderRadius: '50%', top: '-150px', left: '-150px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        borderRadius: '50%', bottom: '-100px', right: '-100px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: '28px',
          padding: '52px 44px',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(139,92,246,0.15), 0 30px 60px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: '80px', height: '80px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            borderRadius: '22px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: '900', color: '#fff',
            margin: '0 auto 24px',
            boxShadow: '0 0 30px rgba(139,92,246,0.5)',
            letterSpacing: '-1px',
          }}
        >
          IQ
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            fontSize: '30px', fontWeight: '800',
            background: 'linear-gradient(90deg, #ffffff 30%, #8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            margin: '0 0 8px', letterSpacing: '-0.5px',
          }}
        >
          ResumeIQ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '0 0 36px' }}
        >
          Your AI-powered career toolkit
        </motion.p>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '20px',
                color: '#ef4444',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 28px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', whiteSpace: 'nowrap' }}>
            Sign in to continue
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Google Button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error('Google Login failed')}
            theme="filled_black"
            shape="pill"
            size="large"
            text="signin_with"
            width="320"
          />
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            color: 'rgba(255,255,255,0.2)', fontSize: '11px',
            margin: '32px 0 0', lineHeight: '1.6',
          }}
        >
          By signing in you agree to our Terms of Service.<br />
          Your data is securely stored and never shared.
        </motion.p>
      </motion.div>
    </div>
  );
}
