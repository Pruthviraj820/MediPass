import MedicalTimeline from '../../components/common/MedicalTimeline'
// import { mockMedicalRecords } from '../../data/mockData'
import { Calendar, FileText, Activity } from 'lucide-react'

const PatientMedicalTimeline = () => (
  <div className="max-w-4xl mx-auto space-y-12">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
        <Activity className="w-7 h-7 text-primary-600" />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-neutral-900">Medical History</h1>
        <p className="text-neutral-600">Complete timeline of your healthcare journey</p>
      </div>
    </div>

    <MedicalTimeline />
    
    <div className="card p-10 text-center">
      <FileText className="w-16 h-16 text-neutral-400 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">No more records?</h3>
      <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
        Your medical timeline will automatically update as healthcare providers add new records.
      </p>
      <div className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all">
        Show QR to Doctor <Calendar className="w-5 h-5 ml-2" />
      </div>
    </div>
  </div>
)

export default PatientMedicalTimeline
