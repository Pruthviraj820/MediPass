import { useParams } from 'react-router-dom'
import { mockPatients, mockMedicalRecords } from '../../data/mockData'
import MedicalTimeline from '../../components/common/MedicalTimeline'
import { Download, Edit3, FileText } from 'lucide-react'

const DoctorPatientProfile = () => {
  const { id } = useParams()
  const patient = mockPatients.find(p => p.id === id)
  
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Patient Header */}
      <div className="card p-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-28 h-28 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
              {patient.name[0]}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">{patient.name}</h1>
              <div className="flex items-center space-x-6 text-neutral-600">
                <span>DOB: 15 Mar 1985 (40 yrs)</span>
                <span>{patient.phone}</span>
                <span className="font-semibold text-primary-600">{patient.bloodGroup}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary px-8 py-4 text-lg flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Records</span>
            </button>
            <Link to={`/doctor/add-diagnosis/${id}`} className="px-8 py-4 border-2 border-primary-200 bg-primary-50 text-primary-700 rounded-2xl font-semibold text-lg hover:bg-primary-100 transition-all flex items-center space-x-2">
              <Edit3 className="w-5 h-5" />
              <span>Add Diagnosis</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
            <FileText className="w-8 h-8 text-orange-600" />
            <span>Critical Alerts</span>
          </h3>
          <div className="space-y-4">
            {patient.allergies.map((allergy, index) => (
              <div key={index} className="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4 flex-shrink-0" />
                <span className="font-semibold text-orange-900 text-lg">{allergy}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-6">Emergency Contact</h3>
          <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
            <p className="text-2xl font-bold text-emerald-800">{patient.emergencyContact}</p>
          </div>
        </div>
      </div>

      {/* Medical History */}
      <MedicalTimeline />
    </div>
  )
}

export default DoctorPatientProfile
