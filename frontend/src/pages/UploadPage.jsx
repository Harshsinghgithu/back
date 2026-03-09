import { useState } from 'react';
import { useDataContext } from '../contexts/DataContext';
import UploadForm from '../components/UploadForm';
import PredictionResult from '../components/PredictionResult';

const UploadPage = () => {
  const { updateData } = useDataContext();

  const handleUpload = (data) => {
    // Update the shared data context
    updateData(data);
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '10px',
          color: '#333',
          fontSize: '2.5rem'
        }}>
          🚀 Upload Transaction CSV
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '1.1rem',
          marginBottom: '30px'
        }}>
          Analyze your transaction data for fraud detection using advanced AI algorithms
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <UploadForm onUpload={handleUpload} />
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '4px',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginTop: 0, color: '#495057' }}>📋 CSV Format Requirements:</h4>
          <ul style={{ color: '#6c757d', marginBottom: 0 }}>
            <li><strong>Required columns:</strong> transaction_id, amount, customer_id, timestamp</li>
            <li><strong>Optional columns:</strong> merchant_id, location, device, is_fraud</li>
            <li><strong>Data types:</strong> amount should be numeric, IDs can be numeric or string</li>
            <li><strong>Sample:</strong> Check <code>demo/transaction.csv</code> for format reference</li>
          </ul>
        </div>
      </div>

      <PredictionResult />
    </div>
  );
};

export default UploadPage;