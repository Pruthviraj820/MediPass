import { create } from "zustand"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  initializeAuth: () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        set({ user: null, loading: false })
        return
      }

      // ✅ Just use Firebase Auth user (no Firestore)
      set({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
          role: "patient" // default for now
        },
        loading: false
      })
    })
  },

  logout: async () => {
    await signOut(auth)
    set({ user: null })
  }
}))
