// services/firebase.js
// Firebase Configuration with proper ES6 imports for React Native

// Import Firebase modules
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN5bv_lD0cVQp4XjFVHvJPwVEmfLxC6WQ",
  authDomain: "chatbot-2e9be.firebaseapp.com",
  projectId: "chatbot-2e9be",
  storageBucket: "chatbot-2e9be.firebasestorage.app",
  messagingSenderId: "778129422681",
  appId: "1:778129422681:web:c80d6aa08f13f82cfbf448",
  databaseURL: 'https://chatbot-2e9be-default-rtdb.firebaseio.com/'
}

// Initialize Firebase
let app = null
let auth = null
let db = null
let storage = null

try {
  // Check if Firebase is already initialized
  const existingApps = getApps()
  if (existingApps.length > 0) {
    app = existingApps[0]
  } else {
    app = initializeApp(firebaseConfig)
  }
  
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  
  console.log('✅ Firebase initialized successfully')
} catch (error) {
  console.error('❌ Firebase initialization failed:', error)
  console.warn('📦 Make sure Firebase is installed: npm install firebase')
}

// Export Firebase instances
export { app, auth, db, storage }
export default app