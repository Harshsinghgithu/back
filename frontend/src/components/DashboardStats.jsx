import { useDataContext } from '../contexts/DataContext';

const DashboardStats = () => {
  const { uploadedData } = useDataContext();

  if (!uploadedData || !uploadedData.detection) {
    return (
      <div className="card fade-in" style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
          Welcome to FraudGuard AI
        </h3>
        <p style={{ margin: '0', opacity: '0.9', fontSize: '1.1rem' }}>
          Upload a CSV file to see comprehensive fraud detection analytics and interactive visualizations
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-2xl)',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            🔒 Secure • ⚡ Fast • 🎯 Accurate
          </span>
        </div>
      </div>
    );
  }

  const detection = uploadedData.detection;
  const stats = uploadedData.stats;

  const totalAmount = detection.all_records?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0;
  const avgAmount = detection.total_transactions > 0 ? totalAmount / detection.total_transactions : 0;
  const fraudRate = detection.total_transactions > 0
    ? ((detection.fraud_detected_count / detection.total_transactions) * 100)
    : 0;

  const highRiskCount = detection.all_records?.filter(tx => (tx.risk_score || 0) > 0.7).length || 0;

  const cards = [
    {
      title: 'Total Transactions',
      value: detection.total_transactions?.toLocaleString() || '0',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: '0s'
    },
    {
      title: 'Fraud Detected',
      value: detection.fraud_detected_count?.toLocaleString() || '0',
      icon: '🚨',
      gradient: 'linear-gradient(135deg, #ff7675 0%, #ee5a52 100%)',
      delay: '0.1s'
    },
    {
      title: 'Fraud Rate',
      value: `${fraudRate.toFixed(1)}%`,
      icon: '⚠️',
      gradient: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
      delay: '0.2s'
    },
    {
      title: 'Total Amount',
      value: `$${totalAmount.toLocaleString()}`,
      icon: '💰',
      gradient: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
      delay: '0.3s'
    },
    {
      title: 'Average Amount',
      value: `$${avgAmount.toFixed(2)}`,
      icon: '📈',
      gradient: 'linear-gradient(135deg, #0984e3 0%, #00f2fe 100%)',
      delay: '0.4s'
    },
    {
      title: 'High Risk (>70%)',
      value: highRiskCount.toLocaleString(),
      icon: '🔴',
      gradient: 'linear-gradient(135deg, #e84393 0%, #fd79a8 100%)',
      delay: '0.5s'
    }
  ];

  return (
    <div className="fade-in">
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '1rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          📈 Fraud Detection Dashboard
        </h2>
        <p style={{
          color: 'var(--gray-600)',
          fontSize: '1.1rem',
          margin: '0'
        }}>
          Real-time analytics and comprehensive fraud detection insights
        </p>
      </div>

      <div className="stats-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="stat-card fade-in"
            style={{
              background: card.gradient,
              color: 'white',
              animationDelay: card.delay,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              animation: 'pulse 3s infinite'
            }}></div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: '1'
            }}>
              <div style={{
                fontSize: '2.5rem',
                opacity: '0.9'
              }}>
                {card.icon}
              </div>
              <div style={{
                fontSize: '0.8rem',
                opacity: '0.8',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                {card.title}
              </div>
            </div>

            <div className="stat-value" style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '0.5rem',
              position: 'relative',
              zIndex: '1'
            }}>
              {card.value}
            </div>

            <div style={{
              fontSize: '0.9rem',
              opacity: '0.8',
              position: 'relative',
              zIndex: '1'
            }}>
              {card.title.toLowerCase().includes('rate') ? 'Detection Rate' :
               card.title.toLowerCase().includes('amount') ? 'Transaction Value' :
               'Count'}
            </div>
          </div>
        ))}
      </div>

      {detection.fraud_detected_count > 0 && (
        <div className="card fade-in" style={{
          background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
          border: '1px solid #ffeaa7',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '2rem' }}>🚨</div>
            <h4 style={{
              margin: '0',
              color: '#d63031',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              Fraud Alert Detected
            </h4>
          </div>
          <p style={{
            margin: '0',
            color: '#2d3436',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            <strong>{detection.fraud_detected_count}</strong> suspicious transaction{detection.fraud_detected_count > 1 ? 's have' : ' has'} been flagged by our AI detection system.
            Review the detailed analysis below for comprehensive insights and recommended actions.
          </p>
        </div>
      )}

      {detection.fraud_detected_count === 0 && (
        <div className="card fade-in" style={{
          background: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)',
          border: '1px solid #55efc4',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '2rem' }}>✅</div>
            <h4 style={{
              margin: '0',
              color: '#00a085',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              All Clear - No Fraud Detected
            </h4>
          </div>
          <p style={{
            margin: '0',
            color: '#2d3436',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            Excellent! All transactions appear legitimate. Continue monitoring for any unusual patterns or upload additional data for analysis.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;