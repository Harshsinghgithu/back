import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '📊 Dashboard', description: 'Analytics & Charts' },
    { path: '/upload', label: '🚀 Upload', description: 'Analyze CSV Files' },
    { path: '/report', label: '📋 Report', description: 'Detailed Reports' }
  ];

  return (
    <nav className="navbar">
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" className="navbar-brand">
          <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>
            FraudGuard
          </span>
          <span style={{
            fontSize: '0.75rem',
            opacity: '0.8',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Advanced Fraud Detection
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="nav-link"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius)',
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  backdropFilter: 'blur(10px)',
                  transition: 'var(--transition)',
                  minWidth: '140px'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                  display: 'block'
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  opacity: '0.9',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '500'
                }}>
                  {item.description}
                </span>
                {location.pathname === item.path && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '3px',
                    backgroundColor: 'var(--white)',
                    borderRadius: '2px',
                    animation: 'fadeIn 0.3s ease'
                  }}></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;