import { useState } from 'react';
import { analyzeResume } from './api';
import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';
import GlowIcon from './GlowIcon';
import GlowButton from './GlowButton';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [withJD, setWithJD] = useState(true);
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  const handleAnalyze = async () => {
    if (!file) { setError('Please upload a resume file.'); return; }
    setError('');
    setResult('');
    setLoading(true);
    try {
      const data = await analyzeResume(file, jobDescription, withJD, temperature, maxTokens);
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
        <GlowIcon Icon={Sparkles} color="#8b5cf6" size={32} />
        <div>
          <h2>Resume ATS Analyzer</h2>
          <p>Get your ATS match score, missing keywords, and personalized recommendations.</p>
        </div>
      </div>

      <div className="glass-card">
        <div className="toggle-row" style={{ marginBottom: '20px' }}>
          <label className="toggle-label">
            <div className={`toggle-switch ${withJD ? 'active' : ''}`} onClick={() => setWithJD(!withJD)}>
              <div className="toggle-knob" />
            </div>
            <span>Analyze with Job Description</span>
          </label>
        </div>

        <div className="input-grid">
          <div
            className={`drop-zone ${fileName ? 'has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('resume-upload').click()}
          >
            <input id="resume-upload" type="file" accept=".pdf,.docx" hidden onChange={handleFileChange} />
            <div className="drop-zone-icon">{fileName ? '✅' : '📂'}</div>
            <p>{fileName || 'Drop your resume here or click to browse'}</p>
            <span className="drop-zone-hint">Supports PDF & DOCX</span>
          </div>

          {withJD && (
            <div className="input-group">
              <label>Job Description</label>
              <textarea
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={8}
              />
            </div>
          )}
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
          onClick={handleAnalyze} 
          disabled={loading} 
          className="w-full justify-center mt-6"
        >
          {loading ? <span className="spinner" /> : <Sparkles size={18} />} 
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </GlowButton>
      </div>

      {error && <div className="error-box glass">{error}</div>}
      {result && (
        <div className="result-box glass">
          <div className="result-header">📋 Analysis Result</div>
          <div className="result-content"><ReactMarkdown>{result}</ReactMarkdown></div>
        </div>
      )}
    </div>
  );
}
