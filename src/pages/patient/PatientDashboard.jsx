import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import PatientQR from '../../components/patient/PatientQR'
import MedicalTimeline from '../../components/common/MedicalTimeline'
import { Pill, AlertCircle, HeartPulse } from 'lucide-react'
import api from '../../services/api'

const PatientDashboard = () => {
  const { user } = useAuthStore() // Get logged-in user
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)

  // Wait for user to be available before fetching prescriptions
  useEffect(() => {
    if (!user) return // Skip if user is not set yet

    const fetchPrescriptions = async () => {
      try {
        const response = await api.get('/patient/prescriptions') // Adjust endpoint
        setPrescriptions(response.data?.prescriptions || [])
      } catch (err) {
        console.error('Failed to fetch prescriptions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrescriptions()
  }, [user]) // Dependency on `user` ensures re-run when user becomes available

  // If user is still null (not logged in)
  if (!user) {
    return <p className="text-center py-20">Please log in to view your dashboard.</p>
  }

  // While prescriptions are loading
  if (loading) {
    return <p className="text-center py-20">Loading dashboard...</p>
  }

  // Safe fallback values
  const userName = user.name || "Patient"
  const userAllergies = user.allergies || []

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-success-500 text-white rounded-full font-semibold mb-6 shadow-2xl">
          <HeartPulse className="w-5 h-5 mr-2" />
          Your Health Records, Always Accessible
        </div>

        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          Welcome Back, {userName}
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code */}
        <PatientQR patientId={user.id} />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/patient/prescriptions" className="card p-8 text-center group hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 bg-success-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-success-200 transition-all">
              <Pill className="w-10 h-10 text-success-600 group-hover:scale-110" />
            </div>
            <h3 className="text-3xl font-bold">{prescriptions.length}</h3>
            <p className="text-neutral-600 text-lg">Active Prescriptions</p>
          </Link>

          <Link to="/patient/emergency-profile" className="card p-8 text-center group hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-all">
              <AlertCircle className="w-10 h-10 text-orange-600 group-hover:scale-110" />
            </div>
            <h3 className="text-3xl font-bold">{userAllergies.length}</h3>
            <p className="text-neutral-600 text-lg">Known Allergies</p>
          </Link>
        </div>
      </div>

      {/* Medical Timeline */}
      <MedicalTimeline />
    </div>
  )
}

export default PatientDashboard
