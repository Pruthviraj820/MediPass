import { mockPatients } from '../../data/mockData'
import { Shield, Phone, Droplets, AlertTriangle } from 'lucide-react'

const PatientEmergencyProfile = () => {
  const patient = mockPatients[0]
  
  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Emergency Profile</h1>
          <p className="text-neutral-600">Critical information for healthcare providers</p>
        </div>
      </div>

      <div className="card p-10 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary-600" />
              <span>Patient Information</span>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">{patient.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl">{patient.name}</h4>
                  <p className="text-neutral-600">{patient.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-xl text-blue-800">{patient.bloodGroup}</div>
                  <div className="text-sm text-blue-700">Blood Group</div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-xl">{patient.phone}</div>
                  <div className="text-sm text-green-700">Emergency Contact</div>
                </div>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <span>Allergies & Conditions</span>
            </h3>
            
            <div className="space-y-4">
              {patient.allergies.map((allergy, index) => (
                <div key={index} className="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-2xl">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-4" />
                  <span className="font-semibold text-orange-900">{allergy}</span>
                </div>
              ))}
              
              {patient.allergies.length === 0 && (
                <div className="p-8 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-center">
                  <Shield className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-emerald-800">No known allergies</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientEmergencyProfile
