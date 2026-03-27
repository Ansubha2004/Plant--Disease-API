import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
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
    } catch (error) {
      setResult({ error: 'Prediction failed. Check backend.' });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Plant Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="selected" className="preview-img" />}
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {result && (
        <div className="result">
          <p>
            <strong>Disease:</strong> {result.class_name}
          </p>
          <p>
            <strong>Class Index:</strong> {result.predicted_class}
          </p>
          {result.recommendation && (
            <p>
              <strong>Cure Recommendation:</strong> {result.recommendation}
            </p>
          )}
          {result.confidence && (
            <p>
              <strong>Confidence:</strong> {result.confidence}%
            </p>
          )}
          {result.error && <span className="error">{result.error}</span>}
        </div>
      )}
    </div>
  );
}

export default App;
