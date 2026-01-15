import { useState } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, UserPlus, Shield, Mail, Phone, Lock } from 'lucide-react'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'patient'
  })
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(async () => {
      await signup(formData)
      setIsLoading(false)
      navigate(`/${formData.role}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-md w-full card p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Join MediPass</h1>
          <p className="text-neutral-600">Create your secure health record</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center space-x-3 py-4 text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage  // ✅ DEFAULT EXPORT
