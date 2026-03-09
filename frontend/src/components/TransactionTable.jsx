const TransactionTable = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#6c757d',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
        <p style={{ margin: '0', fontSize: '16px' }}>No transactions to display. Upload data to see results.</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '20px 30px',
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ margin: '0', color: '#495057', fontSize: '18px' }}>
          📋 Transaction Details ({transactions.length} records)
        </h3>
      </div>

      <div style={{
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead style={{
            position: 'sticky',
            top: '0',
            backgroundColor: '#f8f9fa',
            zIndex: '1'
          }}>
            <tr>
              <th style={{
                padding: '15px 20px',
                textAlign: 'left',
                borderBottom: '2px solid #dee2e6',
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Transaction ID
              </th>
              <th style={{
                padding: '15px 20px',
                textAlign: 'left',
                borderBottom: '2px solid #dee2e6',
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Amount
              </th>
              <th style={{
                padding: '15px 20px',
                textAlign: 'left',
                borderBottom: '2px solid #dee2e6',
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Customer
              </th>
              <th style={{
                padding: '15px 20px',
                textAlign: 'left',
                borderBottom: '2px solid #dee2e6',
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Merchant
              </th>
              <th style={{
                padding: '15px 20px',
                textAlign: 'left',
                borderBottom: '2px solid #dee2e6',
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Location
              </th>
              <th style={{
                padding: '15px 20px',
                textAlign: 'center',
                borderBottom: '2px solid #dee2e6',
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Risk Score
              </th>
              <th style={{
                padding: '15px 20px',
                textAlign: 'center',
                borderBottom: '2px solid #dee2e6',
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx.transaction_id || index} style={{
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                borderBottom: '1px solid #e9ecef',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.closest('tr').style.backgroundColor = '#e3f2fd'}
              onMouseLeave={(e) => e.target.closest('tr').style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8f9fa'}
              >
                <td style={{ padding: '12px 20px', color: '#495057', fontWeight: '500' }}>
                  {tx.transaction_id || `TXN-${index + 1}`}
                </td>
                <td style={{ padding: '12px 20px', color: '#495057', fontWeight: '600', fontSize: '15px' }}>
                  ${tx.amount?.toFixed(2) || '0.00'}
                </td>
                <td style={{ padding: '12px 20px', color: '#495057' }}>
                  {tx.customer_id || 'N/A'}
                </td>
                <td style={{ padding: '12px 20px', color: '#495057' }}>
                  {tx.merchant_id || 'N/A'}
                </td>
                <td style={{ padding: '12px 20px', color: '#495057' }}>
                  {tx.location || 'N/A'}
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: tx.risk_score > 0.7 ? '#fee' : tx.risk_score > 0.4 ? '#fff3cd' : '#d4edda',
                    color: tx.risk_score > 0.7 ? '#721c24' : tx.risk_score > 0.4 ? '#856404' : '#155724'
                  }}>
                    {(tx.risk_score * 100).toFixed(1)}%
                  </span>
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backgroundColor: tx.is_fraud === 1 ? '#f8d7da' : '#d4edda',
                    color: tx.is_fraud === 1 ? '#721c24' : '#155724',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {tx.is_fraud === 1 ? '🚨 Fraud' : '✅ Normal'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;