import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Eye, EyeOff, ArrowRight, AlertCircle, Activity, BarChart3, Search, Layout } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { role: 'Admin', email: 'admin@mineguard.gov.in', password: 'admin123', color: '#1E3A5F', icon: '⚡' },
  { role: 'Inspector', email: 'inspector@mineguard.gov.in', password: 'inspector123', color: '#2C5282', icon: '🔍' },
  { role: 'Mine Operator', email: 'operator@coalmine.com', password: 'operator123', color: '#E8A838', icon: '⛏️' },
  { role: 'Auditor', email: 'auditor@mineguard.gov.in', password: 'auditor123', color: '#805AD5', icon: '📋' },
];

const FEATURES = [
  { label: 'AI Risk Scoring', desc: 'Predictive analytics', icon: BarChart3 },
  { label: 'Real-time Monitoring', desc: 'Compliance tracking', icon: Activity },
  { label: 'Smart Inspections', desc: 'AI-assisted detection', icon: Search },
  { label: 'Governance Dashboard', desc: 'Multi-mine oversight', icon: Layout },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div style={styles.wrapper}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex" style={styles.leftPanel}>
        {/* Animated background orbs */}
        <div style={styles.orbOne} />
        <div style={styles.orbTwo} />
        <div style={styles.orbThree} />

        {/* Subtle grid overlay */}
        <div style={styles.gridOverlay} />

        <div style={styles.leftContent}>
          {/* Logo */}
          <div style={styles.logoSection}>
            <div style={styles.logoBox}>
              <Shield style={{ width: 28, height: 28, color: 'white' }} />
            </div>
            <div>
              <h1 style={styles.logoTitle}>MineGuard AI</h1>
              <p style={styles.logoSubtitle}>Smart Governance Platform</p>
            </div>
          </div>

          {/* Hero text */}
          <div style={styles.heroSection}>
            <h2 style={styles.heroTitle}>
              AI-Powered Compliance
              <br />
              <span style={styles.heroAccent}>Monitoring System</span>
              <br />
              for Coal Mines
            </h2>

            <p style={styles.heroDesc}>
              Centralized governance platform enabling real-time compliance monitoring,
              AI-driven risk assessment, and intelligent violation detection across
              India's coal mining operations.
            </p>
          </div>

          {/* Feature grid */}
          <div style={styles.featureGrid}>
            {FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={styles.featureCard}>
                  <div style={styles.featureIconBox}>
                    <Icon style={{ width: 16, height: 16, color: '#E8A838' }} />
                  </div>
                  <div>
                    <p style={styles.featureLabel}>{item.label}</p>
                    <p style={styles.featureDesc}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer badge */}
          <div style={styles.footerBadge}>
            <span style={styles.sihBadge}>SIH 2026</span>
            <span style={styles.footerDot}>•</span>
            <span style={styles.footerText}>Directorate General of Mines Safety</span>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={styles.rightPanel}>
        <div style={styles.rightContent}>
          {/* Mobile logo */}
          <div className="lg:hidden" style={styles.mobileLogo}>
            <div style={{ ...styles.logoBox, width: 40, height: 40 }}>
              <Shield style={{ width: 20, height: 20, color: 'white' }} />
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1A202C' }}>MineGuard AI</h1>
              <p style={{ fontSize: 12, color: '#718096' }}>Smart Governance Platform</p>
            </div>
          </div>

          {/* Sign In Card */}
          <div style={styles.signInCard}>
            <div style={styles.signInHeader}>
              <h2 style={styles.signInTitle}>Welcome Back</h2>
              <p style={styles.signInSubtitle}>Sign in to access the compliance monitoring system</p>
            </div>

            {error && (
              <div style={styles.errorBox}>
                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your email"
                  required
                  onFocus={e => {
                    e.target.style.borderColor = '#1E3A5F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(30, 58, 95, 0.08)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={styles.label}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ ...styles.input, paddingRight: 44 }}
                    placeholder="Enter your password"
                    required
                    onFocus={e => {
                      e.target.style.borderColor = '#1E3A5F';
                      e.target.style.boxShadow = '0 0 0 3px rgba(30, 58, 95, 0.08)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = '#E2E8F0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                  >
                    {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!loading) e.target.style.background = 'linear-gradient(135deg, #152A45 0%, #1E3A5F 100%)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)';
                }}
              >
                {loading ? (
                  <div style={styles.spinner} />
                ) : (
                  <>
                    Sign In
                    <ArrowRight style={{ width: 18, height: 18 }} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Demo accounts */}
          <div style={styles.demoSection}>
            <div style={styles.demoHeader}>
              <div style={styles.demoLine} />
              <span style={styles.demoTitle}>Quick Access</span>
              <div style={styles.demoLine} />
            </div>

            <div style={styles.demoGrid}>
              {DEMO_ACCOUNTS.map(account => (
                <button
                  key={account.role}
                  onClick={() => handleDemoLogin(account)}
                  style={styles.demoCard}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#CBD5E0';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#EDF2F7';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      ...styles.demoAvatar,
                      background: `linear-gradient(135deg, ${account.color}, ${account.color}CC)`,
                    }}
                  >
                    {account.role[0]}
                  </div>
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <p style={styles.demoRole}>{account.role}</p>
                    <p style={styles.demoEmail}>{account.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 25px) scale(1.08); }
          66% { transform: translate(20px, -10px) scale(0.92); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, 20px) scale(0.96); }
          66% { transform: translate(-20px, -25px) scale(1.04); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },

  /* ─── Left Panel ─── */
  leftPanel: {
    width: '52%',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(160deg, #0B1120 0%, #0F172A 35%, #162544 65%, #0F172A 100%)',
  },

  orbOne: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(232, 168, 56, 0.12) 0%, transparent 70%)',
    top: '10%',
    left: '20%',
    animation: 'float1 12s ease-in-out infinite',
    filter: 'blur(40px)',
  },
  orbTwo: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(49, 130, 206, 0.1) 0%, transparent 70%)',
    bottom: '10%',
    right: '10%',
    animation: 'float2 15s ease-in-out infinite',
    filter: 'blur(40px)',
  },
  orbThree: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(128, 90, 213, 0.08) 0%, transparent 70%)',
    top: '60%',
    left: '5%',
    animation: 'float3 18s ease-in-out infinite',
    filter: 'blur(30px)',
  },

  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), 
                       linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
    backgroundSize: '60px 60px',
    zIndex: 1,
  },

  leftContent: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: '60px 72px 60px 80px',
    maxWidth: 680,
    margin: '0 auto',
  },

  /* Logo */
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 48,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    background: 'linear-gradient(135deg, #E8A838 0%, #D4922A 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(232, 168, 56, 0.25)',
  },
  logoTitle: {
    fontSize: 26,
    fontWeight: 800,
    color: 'white',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  logoSubtitle: {
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(232, 168, 56, 0.7)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },

  /* Hero */
  heroSection: {
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: 800,
    color: 'white',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    marginBottom: 20,
  },
  heroAccent: {
    background: 'linear-gradient(135deg, #E8A838, #F6C66B)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDesc: {
    fontSize: 16,
    lineHeight: 1.7,
    color: 'rgba(203, 213, 225, 0.8)',
    maxWidth: 480,
  },

  /* Features */
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    marginBottom: 40,
  },
  featureCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease',
  },
  featureIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: 'rgba(232, 168, 56, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: 'white',
    marginBottom: 1,
  },
  featureDesc: {
    fontSize: 11,
    color: 'rgba(148, 163, 184, 0.8)',
  },

  /* Footer */
  footerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  sihBadge: {
    padding: '4px 10px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    color: 'rgba(148, 163, 184, 0.7)',
    letterSpacing: '0.05em',
  },
  footerDot: {
    color: 'rgba(148, 163, 184, 0.3)',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(148, 163, 184, 0.5)',
  },

  /* ─── Right Panel ─── */
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
    background: 'linear-gradient(180deg, #FAFBFC 0%, #F1F5F9 100%)',
    position: 'relative',
    minHeight: '100vh',
  },

  rightContent: {
    width: '100%',
    maxWidth: 420,
  },

  mobileLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    justifyContent: 'center',
  },

  /* Sign In Card */
  signInCard: {
    background: 'white',
    borderRadius: 20,
    border: '1px solid rgba(226, 232, 240, 0.8)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
    padding: '36px 32px',
  },
  signInHeader: {
    marginBottom: 28,
  },
  signInTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#0F172A',
    letterSpacing: '-0.02em',
    marginBottom: 6,
  },
  signInSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 1.5,
  },

  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 13,
  },

  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: '#64748B',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #E2E8F0',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#1A202C',
    background: '#FAFBFC',
    outline: 'none',
    transition: 'all 0.15s ease',
  },

  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitBtn: {
    width: '100%',
    padding: '14px 24px',
    borderRadius: 12,
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "'Inter', system-ui, sans-serif",
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(30, 58, 95, 0.25)',
    marginTop: 4,
  },

  spinner: {
    width: 20,
    height: 20,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },

  /* ─── Demo Section ─── */
  demoSection: {
    marginTop: 28,
  },
  demoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  demoLine: {
    flex: 1,
    height: 1,
    background: 'linear-gradient(90deg, transparent, #E2E8F0, transparent)',
  },
  demoTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    whiteSpace: 'nowrap',
  },

  demoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
  },
  demoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 14px',
    background: 'white',
    border: '1px solid #EDF2F7',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },
  demoAvatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  demoRole: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1E293B',
    marginBottom: 1,
  },
  demoEmail: {
    fontSize: 10,
    color: '#94A3B8',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};


