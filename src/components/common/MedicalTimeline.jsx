import { Calendar, User, FileText, Stethoscope } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { mockMedicalRecords } from '../../data/mockData'

const MedicalTimeline = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-neutral-900 flex items-center space-x-3">
        <Stethoscope className="w-8 h-8 text-primary-600" />
        <span>Medical History</span>
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 to-success-200"></div>
        
        {mockMedicalRecords.map((record, index) => (
          <div key={record.id} className="relative flex items-start space-x-4 group">
            {/* Timeline Dot */}
            <div className={`absolute left-7 w-4 h-4 rounded-full z-10 border-4 transition-all ${
              index === 0 
                ? 'bg-primary-600 border-primary-200 shadow-lg' 
                : 'bg-success-600 border-success-200'
            }`}></div>
            
            <div className="card p-6 w-full ml-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <span className="text-sm font-semibold text-neutral-500">
                    {format(parseISO(record.date), 'MMM dd, yyyy')}
                  </span>
                  <User className="w-5 h-5 text-neutral-400" />
                  <span className="font-semibold text-neutral-900">{record.doctor}</span>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                {record.diagnosis}
              </h4>
              
              {record.prescription && (
                <div className="mb-4 p-3 bg-primary-50 border border-primary-100 rounded-xl">
                  <p className="font-semibold text-primary-800 mb-1">Prescription:</p>
                  <p className="text-primary-700">{record.prescription}</p>
                </div>
              )}
              
              {record.reports?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {record.reports.map((report, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray--100 text-neutral-700 text-sm rounded-full font-medium">
                      📄 {report}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MedicalTimeline
