import { Link } from 'react-router-dom'
import PatientQR from '../../components/patient/PatientQR'
import MedicalTimeline from '../../components/common/MedicalTimeline'
import { mockPrescriptions, mockPatients } from '../../data/mockData'
import { Pill, Clock, AlertCircle, HeartPulse, LayoutDashboard } from 'lucide-react'

const PatientDashboard = () => {
  const patient = mockPatients[0]
  
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-success-500 text-white rounded-full font-semibold mb-6 shadow-2xl">
          <HeartPulse className="w-5 h-5 mr-2" />
          Your Health Records, Always Accessible
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent mb-6">
          Welcome Back, {patient.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* QR Code */}
        <PatientQR patientId="patient-001" />
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/patient/prescriptions" className="card p-8 text-center group hover:scale-[1.02]">
            <div className="w-20 h-20 bg-success-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-success-200 transition-all">
              <Pill className="w-10 h-10 text-success-600 group-hover:scale-110" />
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-2">{mockPrescriptions.length}</h3>
            <p className="text-neutral-600 text-lg">Active Prescriptions</p>
          </Link>

          <Link to="/patient/emergency-profile" className="card p-8 text-center group hover:scale-[1.02]">
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-all">
              <AlertCircle className="w-10 h-10 text-orange-600 group-hover:scale-110" />
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-2">{patient.allergies.length}</h3>
            <p className="text-neutral-600 text-lg">Known Allergies</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <MedicalTimeline />
    </div>
  )
}

export default PatientDashboard
