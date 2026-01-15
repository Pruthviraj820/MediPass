import { Link } from 'react-router-dom'
import { Camera, Users, FileText, Stethoscope } from 'lucide-react'
import { mockPatients } from '../../data/mockData'

const DoctorDashboard = () => (
  <div className="max-w-7xl mx-auto space-y-12">
    {/* Hero Scanner */}
    <div className="text-center">
      <Link to="/doctor/scanner" className="block">
        <div className="card p-12 mx-auto max-w-2xl group hover:scale-[1.02]">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto mb-8 flex items-center justify-center border-4 border-dashed border-gray-300 group-hover:border-primary-300 transition-all">
            <Camera className="w-20 h-20 text-gray-400 group-hover:text-primary-500 transition-colors" />
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Scan Patient QR</h2>
          <p className="text-xl text-neutral-600 mb-8">Hold any smartphone camera to scan</p>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-success-500 to-emerald-600 text-white rounded-3xl font-semibold text-lg shadow-2xl group-hover:shadow-3xl transition-all">
            <Stethoscope className="w-6 h-6 mr-3" />
            Start Scan
          </div>
        </div>
      </Link>
    </div>

    {/* Quick Stats */}
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="card p-10 text-center">
        <div className="w-24 h-24 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Users className="w-12 h-12 text-primary-600" />
        </div>
        <h3 className="text-4xl font-bold text-neutral-900 mb-2">24</h3>
        <p className="text-xl text-neutral-600">Patients Today</p>
      </div>
      
      <div className="card p-10 text-center">
        <div className="w-24 h-24 bg-success-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-success-600" />
        </div>
        <h3 className="text-4xl font-bold text-neutral-900 mb-2">8</h3>
        <p className="text-xl text-neutral-600">Pending Reports</p>
      </div>
      
      <div className="card p-10 text-center">
        <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Stethoscope className="w-12 h-12 text-orange-600" />
        </div>
        <h3 className="text-4xl font-bold text-neutral-900 mb-2">2</h3>
        <p className="text-xl text-neutral-600">New Diagnoses</p>
      </div>
    </div>

    {/* Recent Patients */}
    <div className="card overflow-hidden">
      <div className="p-8 border-b border-neutral-200">
        <h3 className="text-3xl font-bold flex items-center space-x-3">
          <Users className="w-9 h-9 text-primary-600" />
          <span>Recent Patients</span>
        </h3>
      </div>
      
      <div className="divide-y divide-neutral-100">
        {mockPatients.map(patient => (
          <Link 
            key={patient.id} 
            to={`/doctor/patient/${patient.id}`}
            className="p-8 hover:bg-gray-50 transition-colors flex items-center space-x-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {patient.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xl text-neutral-900 truncate">{patient.name}</h4>
              <p className="text-neutral-600">{patient.bloodGroup} | {patient.allergies[0]}</p>
            </div>
            <div className="text-right">
              <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-xl text-sm font-semibold">
                View Records
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
)

export default DoctorDashboard
