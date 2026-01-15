import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { LogOut, User, Home, Barcode, FileText, Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = ({ showPatientNav = false, showDoctorNav = false }) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-success-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
              <Barcode className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              MediPass
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {showPatientNav && (
              <>
                <Link to="/patient" className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  location.pathname === '/patient' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:text-primary-600'
                }`}>
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/patient/qr-code" className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  location.pathname === '/patient/qr-code' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:text-primary-600'
                }`}>
                  <Barcode className="w-5 h-5" />
                  <span>QR Code</span>
                </Link>
              </>
            )}
            
            {showDoctorNav && (
              <>
                <Link to="/doctor" className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  location.pathname === '/doctor' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:text-primary-600'
                }`}>
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/doctor/scanner" className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  location.pathname === '/doctor/scanner' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:text-primary-600'
                }`}>
                  <Barcode className="w-5 h-5" />
                  <span>Scan QR</span>
                </Link>
              </>
            )}

            {/* User Menu */}
            {user && (
              <div className="flex items-center space-x-4 ml-8 border-l border-neutral-200 pl-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white font-semibold shadow-lg">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="font-semibold text-neutral-900 hidden lg:block">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl hover:bg-gray--100 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray--100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-4">
              {showPatientNav && (
                <>
                  <Link to="/patient" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50">
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/patient/qr-code" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50">
                    <Barcode className="w-5 h-5" />
                    <span>QR Code</span>
                  </Link>
                </>
              )}
              {showDoctorNav && (
                <>
                  <Link to="/doctor" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50">
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/doctor/scanner" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50">
                    <Barcode className="w-5 h-5" />
                    <span>Scan QR</span>
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
