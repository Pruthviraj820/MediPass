import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Smartphone, Zap, Users, HeartPulse } from 'lucide-react'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-root">
      
      {/* Hero */}
      <section className="hero">
        <div className="container text-center">
          
          <div className="badge">
            <Zap size={20} />
            <span>Hackathon Winner 2026 🚀</span>
          </div>

          <h1 className="hero-title">
            Your Complete Health Record
            <span>In One QR Code</span>
          </h1>

          <p className="hero-subtitle">
            MediPass unifies all your medical records, prescriptions, and emergency info into a secure,
            scannable QR code. Instant access for doctors, peace of mind for you.
          </p>

          <div className="hero-buttons">
            <Link to="/select-role" className="btn btn-primary">
              <HeartPulse size={22} />
              Get Started Free
              <ArrowRight size={22} />
            </Link>

            <Link to="/auth" className="btn btn-secondary">
              Doctor Login
            </Link>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">

          <div className="features-header">
            <h2>Everything You Need, Instantly Accessible</h2>
            <p>
              From emergency contacts to complete medical history — all secured and instantly available.
            </p>
          </div>

          <div className="features-grid">

            <div className="feature-card">
              <div className="icon-box blue">
                <Smartphone size={40} />
              </div>
              <h3>QR Code Access</h3>
              <p>One scan gives doctors instant access to your complete medical profile.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box green">
                <ShieldCheck size={40} />
              </div>
              <h3>Healthcare Grade Security</h3>
              <p>End-to-end encryption with healthcare compliance standards. Your data stays yours.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box emerald">
                <Users size={40} />
              </div>
              <h3>Works Everywhere</h3>
              <p>Compatible with any smartphone camera. No special apps required.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default LandingPage
