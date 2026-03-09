import { useDataContext } from '../contexts/DataContext';

const PredictionResult = () => {
  const { uploadedData } = useDataContext();

  if (!uploadedData) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#6c757d',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        margin: '20px 0'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📊</div>
        <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>No Analysis Results Yet</h3>
        <p style={{ margin: '0', fontSize: '16px' }}>
          Upload a CSV file with transaction data to see fraud detection results here.
        </p>
      </div>
    );
  }

  // Backend response structure: {stats, detection}
  const detection = uploadedData.detection;

  if (!detection) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#dc3545',
        backgroundColor: '#f8d7da',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚠️</div>
        <p>Unable to process detection results. Please try uploading again.</p>
      </div>
    );
  }

  const fraudRate = detection.total_transactions > 0
    ? ((detection.fraud_detected_count / detection.total_transactions) * 100).toFixed(2)
    : 0;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>🔍 Fraud Detection Analysis</h2>
        <p style={{ margin: '0', opacity: '0.9' }}>Comprehensive transaction analysis completed</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
            {detection.total_transactions}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.9' }}>📊 Total Transactions</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
            {detection.fraud_detected_count}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.9' }}>🚨 Fraud Detected</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
            {detection.total_transactions - detection.fraud_detected_count}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.9' }}>✅ Normal Transactions</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
            {fraudRate}%
          </div>
          <div style={{ fontSize: '14px', opacity: '0.9' }}>📈 Fraud Rate</div>
        </div>
      </div>

      {detection.fraud_detected_count > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#d63031', fontSize: '18px' }}>
            ⚠️ Suspicious Activity Detected
          </h4>
          <p style={{ margin: '0', color: '#2d3436', fontSize: '16px' }}>
            <strong>{detection.fraud_detected_count}</strong> transaction{detection.fraud_detected_count > 1 ? 's' : ''} flagged as potentially fraudulent.
            Review the detailed analysis on the Dashboard for more insights.
          </p>
        </div>
      )}

      {detection.fraud_detected_count === 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)',
          border: '1px solid #55efc4',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#00a085', fontSize: '18px' }}>
            ✅ All Clear - No Fraud Detected
          </h4>
          <p style={{ margin: '0', color: '#2d3436', fontSize: '16px' }}>
            All transactions appear legitimate. Continue monitoring for any unusual patterns.
          </p>
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          📊 View Full Dashboard
        </a>

        <a
          href="/upload"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          📤 Upload Another File
        </a>
      </div>
    </div>
  );
};

export default PredictionResult;