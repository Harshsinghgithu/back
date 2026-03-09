import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/report" element={<ReportPage />} />
            </Routes>
          </main>

          <footer style={{
            background: 'var(--gray-800)',
            color: 'var(--gray-300)',
            padding: '2rem 0',
            marginTop: '4rem',
            borderTop: '1px solid var(--gray-700)'
          }}>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 2rem',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem' }}>🛡️</div>
                <div>
                  <h4 style={{
                    margin: '0',
                    color: 'var(--white)',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    FraudGuard
                  </h4>
                  <p style={{
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.9rem',
                    opacity: '0.8'
                  }}>
                    Advanced Fraud Detection System
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  <span>🔒</span>
                  <span>Secure & Private</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  <span>⚡</span>
                  <span>Real-time Analysis</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  <span>🎯</span>
                  <span>AI-Powered Detection</span>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--gray-700)',
                paddingTop: '1rem',
                fontSize: '0.8rem',
                opacity: '0.7'
              }}>
                <p style={{ margin: '0' }}>
                  © 2026 FraudGuard AI. Built with advanced machine learning for fraud detection.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;