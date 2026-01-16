import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, User, Phone, Mail, Stethoscope, Building, FileText } from 'lucide-react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useAuthStore } from '../../stores/authStore'

const DoctorEditProfile = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    hospital: '',
    licenseNumber: '',
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const doctorUid = auth?.currentUser?.uid || user?.uid || user?.id
      if (!doctorUid || !db) {
        // Use auth store data as fallback
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          specialization: user?.specialization || '',
          hospital: user?.hospital || '',
          licenseNumber: user?.licenseNumber || '',
        })
        setLoading(false)
        return
      }

      const doctorDocRef = doc(db, 'users', doctorUid)
      const doctorDoc = await getDoc(doctorDocRef)

      if (doctorDoc.exists()) {
        const doctorData = doctorDoc.data()
        setFormData({
          name: doctorData.name || user?.name || '',
          email: doctorData.email || user?.email || '',
          phone: doctorData.phone || user?.phone || '',
          specialization: doctorData.specialization || '',
          hospital: doctorData.hospital || '',
          licenseNumber: doctorData.licenseNumber || '',
        })
      } else {
        // Use auth store data
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          specialization: '',
          hospital: '',
          licenseNumber: '',
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      alert('Error: Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('Error: Please enter your name')
      return
    }

    try {
      setSaving(true)
      const doctorUid = auth?.currentUser?.uid || user?.uid || user?.id
      if (!doctorUid || !db) {
        alert('Error: Unable to save. Please check your connection.')
        return
      }

      const doctorDocRef = doc(db, 'users', doctorUid)
      await setDoc(
        doctorDocRef,
        {
          name: formData.name.trim(),
          phone: formData.phone.trim() || '',
          specialization: formData.specialization.trim() || '',
          hospital: formData.hospital.trim() || '',
          licenseNumber: formData.licenseNumber.trim() || '',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      )

      // Update auth store
      useAuthStore.setState({
        user: {
          ...user,
          name: formData.name.trim(),
          phone: formData.phone.trim() || '',
          specialization: formData.specialization.trim() || '',
          hospital: formData.hospital.trim() || '',
          licenseNumber: formData.licenseNumber.trim() || '',
        },
      })

      alert('Success: Profile updated successfully!')
      navigate('/doctor')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error: Failed to save profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-r from-success-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Edit Profile</h1>
          <p className="text-xl text-neutral-600">Update your professional information</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="card p-12 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <User className="w-6 h-6 text-primary-600" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <Mail className="w-6 h-6 text-primary-600" />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl bg-neutral-50 text-neutral-500 cursor-not-allowed"
              placeholder="Email (cannot be changed)"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <Phone className="w-6 h-6 text-primary-600" />
              <span>Phone</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <Stethoscope className="w-6 h-6 text-success-600" />
              <span>Specialization</span>
            </label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-success-200 focus:border-success-500 transition-all"
              placeholder="e.g., Cardiology, Pediatrics"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <Building className="w-6 h-6 text-orange-600" />
              <span>Hospital/Clinic</span>
            </label>
            <input
              type="text"
              value={formData.hospital}
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
              placeholder="Enter hospital or clinic name"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <span>License Number</span>
            </label>
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
              placeholder="Medical license number"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-8 border-t border-neutral-200">
          <button
            type="button"
            onClick={() => navigate('/doctor')}
            disabled={saving}
            className="px-10 py-4 border border-neutral-300 text-neutral-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`btn-primary px-12 py-4 text-xl flex items-center space-x-3 shadow-2xl hover:shadow-3xl disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DoctorEditProfile
