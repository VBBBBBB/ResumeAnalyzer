import { useState } from 'react';
import { generateCoverLetter } from './api';
import ReactMarkdown from 'react-markdown';
import { FileText } from 'lucide-react';
import GlowIcon from './GlowIcon';
import GlowButton from './GlowButton';

export default function CoverLetterGenerator() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setFileName(f.name); }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setFileName(f.name); }
  };

  const handleGenerate = async () => {
    if (!file) { setError('Please upload a resume file.'); return; }
    setError('');
    setResult('');
    setLoading(true);
    try {
      const data = await generateCoverLetter(file, jobDescription, temperature, maxTokens);
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
        <GlowIcon Icon={FileText} color="#a855f7" size={32} />
        <div>
          <h2>Cover Letter Generator</h2>
          <p>Generate a tailored, professional cover letter from your resume and the target job description.</p>
        </div>
      </div>

      <div className="glass-card">
        <div className="info-banner" style={{ marginBottom: '20px' }}>
          ℹ️ Upload your resume and optionally provide a job description for a more tailored cover letter.
        </div>

        <div className="input-grid">
          <div
            className={`drop-zone ${fileName ? 'has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('cl-upload').click()}
          >
            <input id="cl-upload" type="file" accept=".pdf,.docx" hidden onChange={handleFileChange} />
            <div className="drop-zone-icon">{fileName ? '✅' : '📂'}</div>
            <p>{fileName || 'Drop your resume here or click to browse'}</p>
            <span className="drop-zone-hint">Supports PDF & DOCX</span>
          </div>

          <div className="input-group">
            <label>Job Description <span className="label-optional">(recommended)</span></label>
            <textarea
              placeholder="Paste the job description for a tailored cover letter..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
            />
          </div>
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
          {loading ? <span className="spinner" /> : <FileText size={18} />} 
          {loading ? 'Generating...' : 'Generate Cover Letter'}
        </GlowButton>
      </div>

      {error && <div className="error-box glass">{error}</div>}
      {result && (
        <div className="result-box glass">
          <div className="result-header">📄 Generated Cover Letter</div>
          <div className="result-content"><ReactMarkdown>{result}</ReactMarkdown></div>
          <p className="disclaimer">
            ⚠️ Disclaimer: This cover letter is AI-generated. Review and personalize it before sending.
          </p>
        </div>
      )}
    </div>
  );
}
