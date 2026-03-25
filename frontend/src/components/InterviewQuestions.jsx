import { useState } from 'react';
import { generateInterviewQuestions } from './api';
import ReactMarkdown from 'react-markdown';
import { Brain } from 'lucide-react';
import GlowIcon from './GlowIcon';
import GlowButton from './GlowButton';

export default function InterviewQuestions() {
  const [jobDescription, setJobDescription] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!jobDescription.trim()) { setError('Please enter a job description.'); return; }
    setError('');
    setResult('');
    setLoading(true);
    try {
      const data = await generateInterviewQuestions(jobDescription, temperature, maxTokens);
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
        <GlowIcon Icon={Brain} color="#0ea5e9" size={32} />
        <div>
          <h2>Interview Questions Generator</h2>
          <p>Generate 10 role-specific interview questions based on the job description — technical, behavioral, and cultural fit.</p>
        </div>
      </div>

      <div className="glass-card">
        <div className="input-group">
          <label>Job Description</label>
          <textarea
            placeholder="Paste the full job description to generate tailored interview questions..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
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
          onClick={handleGenerate} 
          disabled={loading} 
          className="w-full justify-center mt-6"
        >
          {loading ? <span className="spinner" /> : <Brain size={18} />} 
          {loading ? 'Generating...' : 'Generate Interview Questions'}
        </GlowButton>
      </div>

      {error && <div className="error-box glass">{error}</div>}
      {result && (
        <div className="result-box glass">
          <div className="result-header">🎯 Interview Questions</div>
          <div className="result-content"><ReactMarkdown>{result}</ReactMarkdown></div>
          <p className="disclaimer">
            ⚠️ Disclaimer: These questions are AI-generated. Adjust them to match the company's interview process.
          </p>
        </div>
      )}
    </div>
  );
}
