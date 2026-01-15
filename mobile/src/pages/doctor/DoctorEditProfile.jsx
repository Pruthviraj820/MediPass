import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../services/firebase'
import { useAuthStore } from '../../stores/authStore'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorEditProfile = () => {
  const navigation = useNavigation()
  const { user } = useAuthStore()
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
      Alert.alert('Error', 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name')
      return
    }

    try {
      setSaving(true)
      const doctorUid = auth?.currentUser?.uid || user?.uid || user?.id
      if (!doctorUid || !db) {
        Alert.alert('Error', 'Unable to save. Please check your connection.')
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

      Alert.alert('Success', 'Profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ])
    } catch (error) {
      console.error('Error saving profile:', error)
      Alert.alert('Error', 'Failed to save profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Navbar />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Ionicons name="person-circle" size={48} color={colors.primary[600]} />
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="person" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>Full Name *</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="mail" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={formData.email}
              editable={false}
              placeholder="Email (cannot be changed)"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="call" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>Phone</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="medical" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>Specialization</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.specialization}
              onChangeText={(text) => setFormData({ ...formData, specialization: text })}
              placeholder="e.g., Cardiology, Pediatrics"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="business" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>Hospital/Clinic</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.hospital}
              onChangeText={(text) => setFormData({ ...formData, hospital: text })}
              placeholder="Enter hospital or clinic name"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="document-text" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>License Number</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.licenseNumber}
              onChangeText={(text) => setFormData({ ...formData, licenseNumber: text })}
              placeholder="Medical license number"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <Ionicons name="save" size={20} color={colors.white} />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: colors.neutral[900],
  },
  inputDisabled: {
    backgroundColor: colors.neutral[50],
    color: colors.neutral[500],
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
})

export default DoctorEditProfile
