import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, User, Phone } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useAuthStore } from '../../stores/authStore'

const PatientEditProfile = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setPhone(user.phone || '')
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    
    if (!name.trim()) {
      alert('Error: Name cannot be empty')
      return
    }

    try {
      setSaving(true)
      const currentUser = auth?.currentUser

      if (!currentUser || !db) {
        alert('Error: User not logged in')
        return
      }

      const ref = doc(db, 'users', currentUser.uid)
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        updatedAt: new Date().toISOString(),
      }

      await setDoc(ref, payload, { merge: true })

      // Update local store so the rest of the app reflects changes
      useAuthStore.setState((state) => ({
        user: {
          ...state.user,
          name: payload.name,
          phone: payload.phone,
        },
      }))

      alert('Success: Profile updated')
      navigate('/patient')
    } catch (error) {
      console.error('Edit profile error:', error)
      alert('Error: Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Edit Profile</h1>
          <p className="text-xl text-neutral-600">Update your personal information</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="card p-12 space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <User className="w-6 h-6 text-primary-600" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-3">
              <Phone className="w-6 h-6 text-primary-600" />
              <span>Phone</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-6 border-2 border-neutral-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-8 border-t border-neutral-200">
          <button
            type="button"
            onClick={() => navigate('/patient')}
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

export default PatientEditProfile
