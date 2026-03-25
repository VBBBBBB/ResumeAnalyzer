import { useState } from 'react';
import { rephraseText } from './api';
import ReactMarkdown from 'react-markdown';
import { PenTool } from 'lucide-react';
import GlowIcon from './GlowIcon';
import GlowButton from './GlowButton';

export default function ContentRephraser() {
  const [text, setText] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRephrase = async () => {
    if (!text.trim()) { setError('Please enter some text to rephrase.'); return; }
    setError('');
    setResult('');
    setLoading(true);
    try {
      const data = await rephraseText(text, temperature, maxTokens);
      if (data.error) setError(data.error);
      else setResult(data.result);
    } catch (err) {
      setError('Failed to connect to the backend. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-section">
      <div className="section-header glass-card">
        <GlowIcon Icon={PenTool} color="#3b82f6" size={32} />
        <div>
          <h2>Content Rephraser</h2>
          <p>Optimize your resume bullet points and paragraphs for ATS standards with quantifiable improvements.</p>
        </div>
      </div>

      <div className="glass-card">
        <div className="input-group">
          <label>Text to Rephrase</label>
          <textarea
            placeholder="Paste a resume bullet point or paragraph to rephrase in ATS-friendly language..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
          />
        </div>

        <div className="params-row" style={{ marginTop: '20px' }}>
          <div className="param-item">
            <label>Temperature: <strong>{temperature}</strong></label>
            <input type="range" min={0} max={1} step={0.1} value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} />
          </div>
          <div className="param-item">
            <label>Max Tokens: <strong>{maxTokens}</strong></label>
            <input type="range" min={50} max={1024} step={1} value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))} />
          </div>
        </div>

        <GlowButton 
          onClick={handleRephrase} 
          disabled={loading} 
          className="w-full justify-center mt-6"
        >
          {loading ? <span className="spinner" /> : <PenTool size={18} />} 
          {loading ? 'Rephrasing...' : 'Rephrase Content'}
        </GlowButton>
      </div>

      {error && <div className="error-box glass">{error}</div>}
      {result && (
        <div className="result-box glass">
          <div className="result-header">✅ Rephrased Content</div>
          <div className="result-content"><ReactMarkdown>{result}</ReactMarkdown></div>
        </div>
      )}
    </div>
  );
}
