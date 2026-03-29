import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function ChatBubble({ role, text }) {
  return (
    <div className={`chat-bubble ${role === 'user' ? 'chat-user' : 'chat-bot'}`}>
      <div className="chat-avatar">{role === 'user' ? '🧑' : '🌿'}</div>
      <div className="chat-text">{text}</div>
    </div>
  );
}

function ChatBox({ sessionId, diseaseName }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi! I've analysed your plant and detected ${diseaseName}. Ask me anything about treatment, prevention, or care!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: trimmed }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: 'bot', text: `⚠️ ${data.error}` }]);
      } else {
        setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '⚠️ Could not reach the server. Is the backend running?' },
      ]);
    }
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div className="chatbox-header-icon">🌿</div>
        <div>
          <div className="chatbox-header-title">Plant Health Assistant</div>
          <div className="chatbox-header-sub">Powered by Llama 3 · Ask anything</div>
        </div>
      </div>

      <div className="chatbox-messages">
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} text={msg.text} />
        ))}
        {sending && (
          <div className="chat-bubble chat-bot">
            <div className="chat-avatar">🌿</div>
            <div className="chat-text chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chatbox-input-row">
        <textarea
          className="chatbox-input"
          placeholder="Ask a follow-up question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={sending}
        />
        <button className="chatbox-send" onClick={sendMessage} disabled={sending || !input.trim()}>
          ➤
        </button>
      </div>
    </div>
  );
}

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ error: 'Prediction failed. Is the backend running?' });
    }
    setLoading(false);
  };

  const isHealthy = result?.health_label === 1;

  return (
    <div className="container">
      <div className="app-header">
        <h1>🌱 Plant Disease Detection</h1>
        <p>Upload a leaf image to detect diseases and get AI-powered treatment advice</p>
      </div>

      <div className="upload-card">
        <div className="file-drop">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {!preview ? (
            <>
              <div className="file-drop-icon">📷</div>
              <div className="file-drop-text">Click to upload or drag & drop</div>
              <div className="file-drop-sub">JPG, PNG, WEBP supported</div>
            </>
          ) : (
            <img src={preview} alt="preview" className="preview-img" style={{margin:0}} />
          )}
        </div>

        <button className="predict-btn" onClick={handleSubmit} disabled={loading || !file}>
          {loading ? '🔍 Analysing...' : '🔬 Analyse Plant'}
        </button>
      </div>

      {result && !result.error && (
        <>
          <div className={`result-card ${isHealthy ? 'healthy' : 'diseased'}`}>
            <div className={`result-badge ${isHealthy ? 'healthy' : 'diseased'}`}>
              {isHealthy ? '✅ Healthy Plant' : '⚠️ Disease Detected'}
            </div>
            <div className="result-disease">
              {result.class_name?.replace(/_/g, ' ')}
            </div>
            {result.recommendation && (
              <>
                <div className="result-divider" />
                <div className="result-rec-label">AI Recommendation</div>
                <div className="result-rec-text">{result.recommendation}</div>
              </>
            )}
          </div>

          <ChatBox sessionId={result.session_id} diseaseName={result.class_name?.replace(/_/g, ' ')} />
        </>
      )}

      {result?.error && <div className="error-box">⚠️ {result.error}</div>}
    </div>
  );
}

export default App;
