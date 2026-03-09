import { useState } from 'react';
import { useDataContext } from '../contexts/DataContext';
import DashboardStats from '../components/DashboardStats';
import LocationDeviceChart from '../components/LocationDeviceChart';
import AmountChart from '../components/AmountChart';
import FraudStats from '../components/FraudStats';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { uploadedData } = useDataContext();
  const [chartType, setChartType] = useState('location');
  const [amountType, setAmountType] = useState('customer_id');

  return (
    <div className="fade-in">
      <DashboardStats />

      {uploadedData && uploadedData.detection && uploadedData.detection.all_records && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Charts Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem'
          }}>
            {/* Distribution Chart */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">📊 Transaction Distribution</div>
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  <label style={{
                    fontWeight: '600',
                    color: 'var(--gray-700)',
                    fontSize: '0.95rem'
                  }}>
                    Analyze by:
                  </label>
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="form-control"
                    style={{
                      width: 'auto',
                      minWidth: '140px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="location">📍 Location</option>
                    <option value="device">📱 Device</option>
                  </select>
                </div>
                <LocationDeviceChart data={uploadedData.detection.all_records} type={chartType} />
              </div>
            </div>

            {/* Amount Chart */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">💰 Transaction Amounts</div>
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  <label style={{
                    fontWeight: '600',
                    color: 'var(--gray-700)',
                    fontSize: '0.95rem'
                  }}>
                    Group by:
                  </label>
                  <select
                    value={amountType}
                    onChange={(e) => setAmountType(e.target.value)}
                    className="form-control"
                    style={{
                      width: 'auto',
                      minWidth: '140px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="customer_id">👤 Customer</option>
                    <option value="merchant_id">🏪 Merchant</option>
                  </select>
                </div>
                <AmountChart data={uploadedData.detection.all_records} type={amountType} />
              </div>
            </div>
          </div>

          {/* Fraud Statistics Chart */}
          <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="card-header">
              <div className="card-title">🎯 Fraud Detection Overview</div>
            </div>
            <div style={{ padding: '1rem' }}>
              <FraudStats summary={{
                total_transactions: uploadedData.detection.total_transactions,
                fraud_count: uploadedData.detection.fraud_detected_count
              }} />
            </div>
          </div>

          {/* Bar Chart for Fraud vs Non-Fraud */}
          <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="card-header">
              <div className="card-title">📊 Fraud vs Non-Fraud Transactions</div>
            </div>
            <div style={{ padding: '1rem', height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: 'Transactions',
                      'Non-Fraud': uploadedData.detection.total_transactions - uploadedData.detection.fraud_detected_count,
                      'Fraud': uploadedData.detection.fraud_detected_count
                    }
                  ]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Non-Fraud" fill="#82ca9d" />
                  <Bar dataKey="Fraud" fill="#ff7c7c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Suspicious Transactions Table */}
          {uploadedData.detection.fraud_detected_count > 0 && (
            <div className="card">
              <div className="card-header">
                <div style={{ fontSize: '1.5rem' }}>🚨</div>
                <div>
                  <div className="card-title" style={{ color: 'var(--danger-color)' }}>
                    Suspicious Transactions Detected
                  </div>
                  <p style={{
                    margin: '0.5rem 0 0 0',
                    color: 'var(--gray-600)',
                    fontSize: '0.9rem'
                  }}>
                    {uploadedData.detection.fraud_detected_count} transaction{uploadedData.detection.fraud_detected_count > 1 ? 's' : ''} flagged for review
                  </p>
                </div>
              </div>

              <div style={{
                maxHeight: '500px',
                overflowY: 'auto'
              }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ fontSize: '0.85rem' }}>Transaction ID</th>
                      <th style={{ fontSize: '0.85rem' }}>Amount</th>
                      <th style={{ fontSize: '0.85rem' }}>Risk Score</th>
                      <th style={{ fontSize: '0.85rem' }}>Z-Score</th>
                      <th style={{ fontSize: '0.85rem' }}>ISO-Score</th>
                      <th style={{ fontSize: '0.85rem' }}>Customer</th>
                      <th style={{ fontSize: '0.85rem' }}>Merchant</th>
                      <th style={{ fontSize: '0.85rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedData.detection.details.map((tx, index) => (
                      <tr key={index}>
                        <td style={{ fontWeight: '600', color: 'var(--gray-800)' }}>
                          {tx.transaction_id || `TXN-${index + 1}`}
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--success-color)' }}>
                          ${tx.amount?.toFixed(2) || '0.00'}
                        </td>
                        <td>
                          <span className={`badge ${tx.risk_score > 0.7 ? 'badge-danger' : tx.risk_score > 0.4 ? 'badge-warning' : 'badge-success'}`}>
                            {(tx.risk_score * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {tx.z_score?.toFixed(2) || 'N/A'}
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {tx.iso_score?.toFixed(3) || 'N/A'}
                        </td>
                        <td>{tx.customer_id || 'N/A'}</td>
                        <td>{tx.merchant_id || 'N/A'}</td>
                        <td>
                          <span className="badge badge-danger">
                            🚨 Flagged
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {!uploadedData && (
        <div className="card fade-in" style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          marginTop: '2rem'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📊</div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Welcome to FraudGuard AI
          </h2>
          <p style={{
            fontSize: '1.2rem',
            opacity: '0.9',
            marginBottom: '2rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Advanced fraud detection powered by machine learning. Upload your transaction data to uncover suspicious patterns and protect your business.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/upload" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              🚀 Start Analysis
            </a>
            <a href="/report" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              📋 View Reports
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;