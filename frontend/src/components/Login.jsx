import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext';

export default function Login() {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [apiUrl, setApiUrl] = useState('');

    useEffect(() => {
        setApiUrl(import.meta.env.VITE_API_URL || 'http://localhost:8000');
    }, []);

    const handleSuccess = async (credentialResponse) => {
        try {
            setError(null);
            setStatus(`Step 1: Contacting Backend at ${apiUrl}...`);
            await login(credentialResponse.credential);
            setStatus('Step 2: Login successful! Redirecting...');
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setStatus(null);
            setError(err.response?.data?.detail || err.message || 'Verification Failed');
        }
    };

    return (
        <div style={{
            height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0a0b0f', color: 'white', fontFamily: 'sans-serif'
        }}>
            <div style={{
                background: '#161b22', padding: '40px', borderRadius: '15px',
                textAlign: 'center', border: '1px solid #30363d', width: '420px'
            }}>
                <h1 style={{ marginBottom: '10px' }}>ResumeIQ</h1>
                <p style={{ color: '#8b949e', marginBottom: '30px' }}>Sign in to continue</p>
                
                <div style={{ fontSize: '11px', color: '#484f58', marginBottom: '20px' }}>
                    Backend Address: {apiUrl}
                </div>

                {status && <div style={{ color: '#8b5cf6', marginBottom: '20px', fontSize: '14px' }}>⏳ {status}</div>}
                {error && <div style={{ color: '#ff7b72', marginBottom: '20px', border: '1px solid #4d1c1c', padding: '10px', borderRadius: '8px' }}>⚠️ {error}</div>}

                {!status && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => setError('Google Dialog Error')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
