import { useState } from "react"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Shield, Mail, Lock, UserPlus, ArrowRight } from "lucide-react"
import { app } from "../../firebase"
import "./AuthPage.css"



const auth = getAuth(app)
const provider = new GoogleAuthProvider()

import { useEffect } from "react"




const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  })




  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const role = searchParams.get("role")
    const mode = searchParams.get("mode")

    if (role) {
      setFormData(prev => ({ ...prev, role }))
    }

    if (mode === "signup") setIsSignup(true)
    if (mode === "login") setIsSignup(false)

  }, [])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleAuth(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      let userCred

      if (isSignup) {
        userCred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )

        await updateProfile(userCred.user, {
          displayName: formData.name
        })
      } else {
        userCred = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )
      }

      const redirectTo =
        searchParams.get("redirect") || formData.role || "patient"

      navigate(`/${redirectTo}`)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError("")
    setLoading(true)

    try {
      await signInWithPopup(auth, provider)
      const redirectTo = searchParams.get("role") || "dashboard"
      navigate(`/${redirectTo}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-logo">
            {isSignup ? <UserPlus size={34} /> : <Shield size={34} />}
          </div>
          <h1>{isSignup ? "Join MediPass" : "Welcome Back"}</h1>
          <p>
            {isSignup
              ? "Create your secure health identity"
              : "Access your secure health records"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="auth-form">

          {isSignup && (
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">👤 Patient</option>
              <option value="doctor">👨‍⚕️ Doctor</option>
            </select>
          </div>

          {error && <div className="error-box">{error}</div>}

          <button className="main-btn" disabled={loading}>
            {loading
              ? "Please wait..."
              : isSignup ? "Create Account" : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="google-btn"
          >
            Continue with Google
          </button>

        </form>

        <p className="footer-text">
          {isSignup ? "Already have an account?" : "New to MediPass?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Sign In" : " Create one"}
          </span>
        </p>

      </div>
    </div>
  )
}

export default AuthPage
