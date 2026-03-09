import { useDataContext } from '../contexts/DataContext';
import TransactionTable from '../components/TransactionTable';
import FraudStats from '../components/FraudStats';

const ReportPage = () => {
  const { uploadedData } = useDataContext();

  if (!uploadedData) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#6c757d',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        margin: '20px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📊</div>
        <h2 style={{ margin: '0 0 15px 0', color: '#495057' }}>No Report Data Available</h2>
        <p style={{ margin: '0', fontSize: '16px' }}>
          Please upload a CSV file with transaction data first to generate a fraud detection report.
        </p>
        <div style={{ marginTop: '20px' }}>
          <a
            href="/upload"
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
            📤 Upload Transaction Data
          </a>
        </div>
      </div>
    );
  }

  // Extract data from the uploaded results
  const detection = uploadedData.detection || {};
  const transactions = detection.all_records || [];
  const stats = uploadedData.stats || {};

  // Prepare summary data for FraudStats component
  const summary = {
    total_transactions: detection.total_transactions || 0,
    fraud_count: detection.fraud_detected_count || 0
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '32px' }}>📊 Fraud Detection Report</h1>
        <p style={{ margin: '0', opacity: '0.9', fontSize: '16px' }}>
          Comprehensive analysis of {detection.length} transactions
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px',
        marginBottom: '30px'
      }}>
        <FraudStats summary={summary} />
      </div>

      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default ReportPage;