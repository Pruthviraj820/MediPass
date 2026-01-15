import PatientQR from "../../components/patient/PatientQR"
import { Download, Share2, Shield } from 'lucide-react'
// import { mockPatients } from '../../data/mockData'

const PatientQRCode = () => (
  <div className="max-w-4xl mx-auto p-8">
    <div className="card p-12 text-center">
      <PatientQR patientId="patient-001" />
      
      <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl border-2 border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-3 text-success-700">
            <Shield className="w-8 h-8" />
            <span className="font-semibold text-lg">Healthcare Grade Security</span>
          </div>
          <div className="w-px h-12 bg-success-200 md:block hidden" />
          <div className="text-center">
            <p className="text-success-600 font-semibold">✅ End-to-end encryption</p>
            <p className="text-success-600 font-semibold">✅ HIPAA compliant</p>
            <p className="text-success-600 font-semibold">✅ Zero-knowledge proof</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default PatientQRCode
