import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext';

export default function Login() {
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            await login(credentialResponse.credential);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.detail || err.message || 'Login failed');
        }
    };

    return (
        <div style={{
            height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0a0b0f', color: 'white', fontFamily: 'sans-serif'
        }}>
            <div style={{
                background: '#161b22', padding: '40px', borderRadius: '15px',
                textAlign: 'center', border: '1px solid #30363d'
            }}>
                <h1 style={{ marginBottom: '10px' }}>ResumeIQ</h1>
                <p style={{ color: '#8b949e', marginBottom: '30px' }}>Sign in to continue</p>
                
                {error && <div style={{ color: '#ff7b72', marginBottom: '20px' }}>{error}</div>}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => setError('Google Login Failed')}
                    />
                </div>
            </div>
        </div>
    );
}
