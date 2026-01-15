import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../services/firebase'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorAddDiagnosis = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { patientId, patientName: routePatientName } = route.params || {}
  
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    dosage: '',
    instructions: '',
  })

  useEffect(() => {
    if (patientId && db) {
      loadPatient()
    } else {
      setLoading(false)
    }
  }, [patientId])

  const loadPatient = async () => {
    try {
      const patientDocRef = doc(db, 'users', patientId)
      const patientDoc = await getDoc(patientDocRef)
      
      if (patientDoc.exists()) {
        const patientData = patientDoc.data()
        setPatient({
          id: patientId,
          name: patientData.name || routePatientName || 'Unknown Patient',
        })
      } else {
        setPatient({
          id: patientId,
          name: routePatientName || 'Unknown Patient',
        })
      }
    } catch (error) {
      console.error('Error loading patient:', error)
      setPatient({
        id: patientId,
        name: routePatientName || 'Unknown Patient',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!formData.diagnosis.trim()) {
      Alert.alert('Error', 'Please enter a diagnosis')
      return
    }

    if (!db || !auth?.currentUser || !patientId) {
      Alert.alert('Error', 'Unable to save. Please check your connection.')
      return
    }

    try {
      setSaving(true)

      const doctorUid = auth.currentUser.uid
      const doctorDoc = await getDoc(doc(db, 'users', doctorUid))
      const doctorData = doctorDoc.exists() ? doctorDoc.data() : {}
      const doctorName = doctorData.name || 'Dr. Unknown'

      // Save diagnosis to patient's medical records
      const medicalRecordsRef = collection(db, 'users', patientId, 'medicalRecords')
      await addDoc(medicalRecordsRef, {
        diagnosis: formData.diagnosis.trim(),
        prescription: formData.prescription.trim() || null,
        dosage: formData.dosage.trim() || null,
        instructions: formData.instructions.trim() || null,
        doctorId: doctorUid,
        doctorName: doctorName,
        createdAt: serverTimestamp(),
        date: new Date().toISOString(),
      })

      Alert.alert('Success', 'Diagnosis saved successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to patient profile with correct params
            navigation.navigate('DoctorPatientProfile', {
              patientId: patientId,
              patientName: patient?.name || routePatientName,
            })
          }
        }
      ])
    } catch (error) {
      console.error('Error saving diagnosis:', error)
      Alert.alert('Error', 'Failed to save diagnosis. Please try again.')
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
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{patient?.name?.[0]?.toUpperCase() || 'P'}</Text>
          </View>
          <View>
            <Text style={styles.title}>Add Diagnosis</Text>
            <Text style={styles.subtitle}>For {patient?.name || 'Patient'}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.formGrid}>
            {/* Diagnosis */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="medical" size={24} color={colors.primary[600]} />
                <Text style={styles.label}>Diagnosis *</Text>
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.diagnosis}
                onChangeText={(text) => setFormData({...formData, diagnosis: text})}
                placeholder="Enter diagnosis details..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Prescription */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="medical" size={24} color={colors.success[600]} />
                <Text style={styles.label}>Prescription (Optional)</Text>
              </View>
              <TextInput
                style={styles.input}
                value={formData.prescription}
                onChangeText={(text) => setFormData({...formData, prescription: text})}
                placeholder="Medication name"
              />
              <TextInput
                style={styles.input}
                value={formData.dosage}
                onChangeText={(text) => setFormData({...formData, dosage: text})}
                placeholder="Dosage & frequency"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Ionicons name="document-text" size={24} color={colors.neutral[700]} />
              <Text style={styles.label}>Instructions (Optional)</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.instructions}
              onChangeText={(text) => setFormData({...formData, instructions: text})}
              placeholder="Special instructions to patient..."
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
              disabled={saving}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, saving && styles.saveButtonDisabled]}
              onPress={handleSubmit}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Ionicons name="save" size={24} color={colors.white} />
                  <Text style={styles.saveButtonText}>Save Diagnosis</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
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
    gap: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.success[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: 20,
    color: colors.neutral[600],
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 32,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    gap: 24,
  },
  formGrid: {
    gap: 24,
  },
  inputGroup: {
    gap: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: colors.neutral[900],
  },
  textArea: {
    minHeight: 100,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 16,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
})

export default DoctorAddDiagnosis
