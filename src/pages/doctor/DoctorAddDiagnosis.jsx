import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockPatients } from '../../data/mockData'
import { Plus, Pill, FileText, Save, Stethoscope } from 'lucide-react'

const DoctorAddDiagnosis = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const patient = mockPatients.find(p => p.id === patientId)
  
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    dosage: '',
    instructions: '',
    reports: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock save
    setTimeout(() => {
      alert('Diagnosis saved successfully!')
      navigate(`/doctor/patient/${patientId}`)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-r from-success-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          {patient?.name?.[0]}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Add Diagnosis</h1>
          <p className="text-xl text-neutral-600">For {patient?.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-12 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Diagnosis */}
          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <Stethoscope className="w-6 h-6 text-primary-600" />
              <span>Diagnosis</span>
            </label>
            <textarea
              value={formData.diagnosis}
              onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
              rows={4}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all resize-vertical"
              placeholder="Enter diagnosis details..."
              required
            />
          </div>

          {/* Prescription */}
          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <Pill className="w-6 h-6 text-success-600" />
              <span>Prescription</span>
            </label>
            <input
              type="text"
              value={formData.prescription}
              onChange={(e) => setFormData({...formData, prescription: e.target.value})}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-success-200 focus:border-success-500 transition-all mb-4"
              placeholder="Medication name"
              required
            />
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({...formData, dosage: e.target.value})}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-success-200 focus:border-success-500 transition-all"
              placeholder="Dosage & frequency"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
            <FileText className="w-6 h-6 text-orange-600" />
            <span>Instructions</span>
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData({...formData, instructions: e.target.value})}
            rows={3}
            className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all resize-vertical"
            placeholder="Special instructions to patient..."
          />
        </div>

        <div className="flex justify-end space-x-4 pt-8 border-t border-neutral-200">
          <button
            type="button"
            onClick={() => navigate(`/doctor/patient/${patientId}`)}
            className="px-10 py-4 border border-neutral-300 text-neutral-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary px-12 py-4 text-xl flex items-center space-x-3 shadow-2xl hover:shadow-3xl"
          >
            <Save className="w-6 h-6" />
            <span>Save Diagnosis</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default DoctorAddDiagnosis
