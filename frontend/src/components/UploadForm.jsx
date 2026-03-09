import { useState } from 'react';
import { API_BASE_URL, API_KEY } from '../config';

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please select a CSV file only.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setAnalyzing(false);
    setSuccess(null);
    setError(null);

    try {
      console.log('Sending request to:', `${API_BASE_URL}/upload/transaction`);

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Make fetch request
      const response = await fetch(`${API_BASE_URL}/upload/transaction`, {
        method: 'POST',
        headers: {
          'X-API-Key': API_KEY,
        },
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        // Handle error responses
        let errorMsg = 'Upload failed. Please try again.';
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMsg = errorData.detail || errorData.message || errorMsg;
        } else {
          // Handle non-JSON error responses
          const errorText = await response.text();
          errorMsg = errorText || `HTTP ${response.status}: ${response.statusText}`;
        }

        // Provide specific error messages based on status code
        if (response.status === 400) {
          errorMsg = 'Invalid file format or data. Please check your CSV.';
        } else if (response.status === 401 || response.status === 403) {
          errorMsg = 'Authentication failed. Please check API configuration.';
        } else if (response.status === 413) {
          errorMsg = 'File too large. Please try a smaller file.';
        } else if (response.status === 415) {
          errorMsg = 'Unsupported file type. Please upload a CSV file.';
        } else if (response.status === 422) {
          errorMsg = 'Data validation failed. Please check required columns.';
        } else if (response.status >= 500) {
          errorMsg = 'Server error. Please try again later.';
        }

        throw new Error(errorMsg);
      }

      // Set analyzing state
      setUploading(false);
      setAnalyzing(true);

      // Parse successful response
      const data = await response.json();
      console.log('Upload and analysis successful:', data);

      // Show success message
      setSuccess('✅ File uploaded and analyzed successfully!');
      setAnalyzing(false);

      // Pass data to parent component
      onUpload(data);

      // Clear file after a delay
      setTimeout(() => {
        setFile(null);
        setSuccess(null);
      }, 3000);

    } catch (error) {
      console.error('Upload failed:', error);
      setAnalyzing(false);

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div
        style={{
          border: `2px dashed ${dragActive ? '#007bff' : error ? '#dc3545' : '#dee2e6'}`,
          borderRadius: '8px',
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: dragActive ? '#f8f9ff' : error ? '#fff5f5' : '#f8f9fa',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          position: 'relative'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div style={{ fontSize: '48px', marginBottom: '15px' }}>
          {analyzing ? '🔍' : uploading ? '⏳' : success ? '✅' : file ? '📄' : '📁'}
        </div>

        {analyzing ? (
          <div>
            <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>🔍 Analyzing Transactions</h4>
            <p style={{ margin: '0', color: '#6c757d' }}>
              Running fraud detection algorithms...
            </p>
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e9ecef',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '15px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#28a745',
                animation: 'loading 2s ease-in-out infinite'
              }}></div>
            </div>
          </div>
        ) : uploading ? (
          <div>
            <h4 style={{ color: '#007bff', margin: '0 0 10px 0' }}>📤 Uploading File</h4>
            <p style={{ margin: '0', color: '#6c757d' }}>
              Sending file to server...
            </p>
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e9ecef',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '15px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#007bff',
                animation: 'loading 2s ease-in-out infinite'
              }}></div>
            </div>
          </div>
        ) : success ? (
          <div>
            <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>✅ Success!</h4>
            <p style={{ margin: '0', color: '#6c757d' }}>
              {success}
            </p>
          </div>
        ) : file ? (
          <div>
            <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>File Selected</h4>
            <p style={{ margin: '0', color: '#6c757d' }}>
              📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          </div>
        ) : (
          <div>
            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>
              Drop CSV file here or click to browse
            </h4>
            <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
              Supports .csv files with transaction data
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!file || uploading || analyzing}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: (!file || uploading || analyzing) ? '#6c757d' : success ? '#28a745' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: (!file || uploading || analyzing) ? 'not-allowed' : 'pointer',
          marginTop: '15px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          if (file && !uploading && !analyzing && !success) e.target.style.backgroundColor = '#0056b3';
        }}
        onMouseLeave={(e) => {
          if (file && !uploading && !analyzing && !success) e.target.style.backgroundColor = '#007bff';
        }}
      >
        {analyzing ? '🔍 Analyzing...' : uploading ? '📤 Uploading...' : success ? '✅ Complete!' : '🚀 Analyze Transactions'}
      </button>

      {error && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24'
        }}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </form>
  );
};

export default UploadForm;