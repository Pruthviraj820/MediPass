import { mockPrescriptions } from '../../data/mockData'
import { Pill, Clock, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

const PatientPrescriptions = () => (
  <div className="max-w-6xl mx-auto space-y-12">
    <div className="flex items-center space-x-4">
      <div className="w-14 h-14 bg-success-100 rounded-2xl flex items-center justify-center">
        <Pill className="w-8 h-8 text-success-600" />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-neutral-900">Prescriptions</h1>
        <p className="text-neutral-600">Medication schedule and reminders</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockPrescriptions.map(prescription => (
        <div key={prescription.id} className="card p-8 group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-bold text-neutral-900">{prescription.name}</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              prescription.refills > 0 
                ? 'bg-success-100 text-success-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {prescription.refills} refills
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-neutral-700">
              <span className="font-semibold">Dosage:</span>
              <span className="ml-2">{prescription.dosage}</span>
            </div>
            <div className="flex items-center text-neutral-700">
              <span className="font-semibold">Frequency:</span>
              <span className="ml-2">{prescription.frequency}</span>
            </div>
            <div className="flex items-center text-neutral-700">
              <span className="font-semibold">Duration:</span>
              <span className="ml-2">{prescription.duration}</span>
            </div>
          </div>

          <div className="p-4 bg-primary-50 border border-primary-100 rounded-2xl mb-6">
            <p className="text-sm text-primary-800">{prescription.instructions}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-lg font-semibold text-primary-600">
              <Clock className="w-5 h-5" />
              <span>{format(new Date(prescription.nextDose), 'HH:mm')}</span>
            </div>
            <CheckCircle className="w-8 h-8 text-success-500" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default PatientPrescriptions
