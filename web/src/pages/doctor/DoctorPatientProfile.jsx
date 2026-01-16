import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Download, Edit3, FileText, AlertTriangle, Heart, Phone, Pill, Calendar, Activity } from 'lucide-react'
import { format } from 'date-fns'
import { doc, getDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import MedicalTimeline from '../../components/common/MedicalTimeline'

const DoctorPatientProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { patientName: routePatientName, patientEmail: routePatientEmail } = location.state || {}
  
  const [patient, setPatient] = useState(null)
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!db || !id) {
      setLoading(false)
      return
    }

    let unsubscribePrescriptions = null

    const loadPatientData = async () => {
      try {
        const patientDocRef = doc(db, 'users', id)
        const patientDoc = await getDoc(patientDocRef)

        if (patientDoc.exists()) {
          const patientData = patientDoc.data()
          setPatient({
            id: id,
            name: patientData.name || routePatientName || 'Unknown Patient',
            email: patientData.email || routePatientEmail || '',
            phone: patientData.phone || '',
            bloodGroup: patientData.bloodGroup || 'Unknown',
            allergies: Array.isArray(patientData.allergies) ? patientData.allergies : [],
            medicalConditions: Array.isArray(patientData.medicalConditions) ? patientData.medicalConditions : [],
            emergencyContacts: Array.isArray(patientData.emergencyContacts) ? patientData.emergencyContacts : [],
          })
        } else {
          setPatient({
            id: id,
            name: routePatientName || 'Unknown Patient',
            email: routePatientEmail || '',
            phone: '',
            bloodGroup: 'Unknown',
            allergies: [],
            medicalConditions: [],
            emergencyContacts: [],
          })
        }

        const prescriptionsRef = collection(db, 'users', id, 'prescriptions')
        const q = query(prescriptionsRef, orderBy('createdAt', 'desc'))
        
        unsubscribePrescriptions = onSnapshot(
          q,
          (querySnapshot) => {
            const prescriptionsList = []
            querySnapshot.forEach((doc) => {
              const data = doc.data()
              prescriptionsList.push({
                id: doc.id,
                ...data,
              })
            })
            setPrescriptions(prescriptionsList)
          },
          (error) => {
            console.error('Error loading prescriptions:', error)
          }
        )
      } catch (error) {
        console.error('Error loading patient data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPatientData()

    return () => {
      if (unsubscribePrescriptions) {
        unsubscribePrescriptions()
      }
    }
  }, [id, routePatientName, routePatientEmail])

  const handleDownloadRecords = () => {
    alert('PDF download functionality will be implemented soon.')
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-violet-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading patient data...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Patient not found</p>
        </div>
      </div>
    )
  }

  const avatarLetter = (patient.name || 'P')[0].toUpperCase()

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Patient Header Card */}
      <div 
        className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 px-8 py-6 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-400/10 rounded-full translate-y-48 -translate-x-48 blur-3xl"></div>
          
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-2 border-white/40 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  {avatarLetter}
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">{patient.name}</h1>
                <div className="flex items-center space-x-4 text-white/90 text-sm flex-wrap gap-2">
                  {patient.email && <span className="backdrop-blur-sm bg-white/10 px-2 py-1 rounded">{patient.email}</span>}
                  {patient.phone && <span>•</span>}
                  {patient.phone && <span className="backdrop-blur-sm bg-white/10 px-2 py-1 rounded">{patient.phone}</span>}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={handleDownloadRecords}
                className="group px-4 py-2 bg-white text-violet-600 rounded-xl font-medium text-sm hover:bg-violet-50 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                <span>Download</span>
              </button>
              <button
                onClick={() => navigate(`/doctor/add-diagnosis/${id}`, {
                  state: { patientName: patient.name }
                })}
                className="group px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl font-medium text-sm hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Diagnosis</span>
              </button>
              <button
                onClick={() => navigate(`/doctor/prescribe/${id}`, {
                  state: {
                    patientName: patient.name,
                    patientEmail: patient.email,
                  }
                })}
                className="group px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl font-medium text-sm hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <Pill className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Prescribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="px-8 py-5 bg-gradient-to-r from-gray-50 to-violet-50/30 border-t border-gray-100">
          <div className="flex items-center justify-start space-x-8">
            <div className="group cursor-default">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>Blood Group</span>
              </span>
              <p className="text-xl font-bold text-violet-600 group-hover:scale-110 transition-transform">{patient.bloodGroup}</p>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <div className="group cursor-default">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Allergies</span>
              <p className="text-xl font-bold text-gray-900 group-hover:scale-110 transition-transform">{patient.allergies?.length || 0}</p>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <div className="group cursor-default">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Conditions</span>
              <p className="text-xl font-bold text-gray-900 group-hover:scale-110 transition-transform">{patient.medicalConditions?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div 
          className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 ${
            mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-2.5 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Allergies</h3>
          </div>
          <div className="space-y-2">
            {patient.allergies && patient.allergies.length > 0 ? (
              patient.allergies.map((allergy, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-2 h-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mr-3 flex-shrink-0 animate-pulse" />
                  <span className="font-semibold text-red-900">{allergy}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic text-sm py-6 text-center">No known allergies</p>
            )}
          </div>
        </div>

        <div 
          className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 ${
            mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-2.5 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Medical Conditions</h3>
          </div>
          <div className="space-y-2">
            {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
              patient.medicalConditions.map((condition, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-3 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-xl hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-2 h-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mr-3 flex-shrink-0 animate-pulse" />
                  <span className="font-semibold text-pink-900">{condition}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic text-sm py-6 text-center">No known conditions</p>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      {patient.emergencyContacts && patient.emergencyContacts.length > 0 && (
        <div 
          className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patient.emergencyContacts.map((contact, index) => (
              <div 
                key={index} 
                className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <p className="font-bold text-emerald-900 mb-1">{contact.name || 'Unknown'}</p>
                <p className="text-sm text-emerald-700 flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone || 'No phone'}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medical History */}
      <div 
        className={`transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <MedicalTimeline patientId={id} />
      </div>

      {/* Prescriptions */}
      <div 
        className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
            <Pill className="w-5 h-5 text-violet-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Prescriptions</h3>
        </div>

        {prescriptions.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-violet-50/20 rounded-xl">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-violet-200 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Pill className="relative w-14 h-14 text-gray-300 mx-auto mb-3" />
            </div>
            <p className="text-gray-500 font-medium">No prescriptions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prescriptions.map((prescription, index) => (
              <div 
                key={prescription.id} 
                className="group border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-violet-200 transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-violet-50/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-violet-600 transition-colors">{prescription.name || 'Unknown Medication'}</h4>
                  {prescription.refills > 0 && (
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-bold animate-pulse">
                      {prescription.refills} refills
                    </span>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-violet-50 transition-colors">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Dosage</span>
                    <p className="text-sm font-bold text-gray-900">{prescription.dosage || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-violet-50 transition-colors">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Frequency</span>
                    <p className="text-sm font-bold text-gray-900">{prescription.frequency || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-violet-50 transition-colors">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Duration</span>
                    <p className="text-sm font-bold text-gray-900">{prescription.duration || 'N/A'}</p>
                  </div>
                </div>
                {prescription.instructions && (
                  <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-xl">
                    <p className="text-sm text-violet-900 font-medium">{prescription.instructions}</p>
                  </div>
                )}
                {prescription.createdAt && (
                  <p className="text-xs text-gray-500 mt-3 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Prescribed: {prescription.createdAt.toDate ? format(prescription.createdAt.toDate(), 'MMM dd, yyyy') : 'Unknown date'}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorPatientProfile