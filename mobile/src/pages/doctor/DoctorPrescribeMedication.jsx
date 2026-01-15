import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'
import { auth, db } from '../../services/firebase'
import { useAuthStore } from '../../stores/authStore'

const DoctorPrescribeMedication = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { user: doctorUser } = useAuthStore()

  const { patientId, patientName, patientEmail } = route.params || {}

  const patientLabel = useMemo(() => {
    if (patientName || patientEmail) return `${patientName || 'Patient'} (${patientEmail || ''})`
    return patientId || 'Patient'
  }, [patientEmail, patientId, patientName])

  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    refills: '0',
  })
  const [saving, setSaving] = useState(false)

  const savePrescription = async () => {
    if (!patientId) {
      Alert.alert('Error', 'Missing patient information')
      return
    }
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Medication name is required')
      return
    }

    try {
      setSaving(true)

      const doctorUid = auth?.currentUser?.uid
      if (!db || !doctorUid) {
        Alert.alert('Error', 'Doctor not logged in')
        return
      }

      const refillsNum = Number.parseInt(formData.refills || '0', 10)

      const payload = {
        name: formData.name.trim(),
        dosage: formData.dosage.trim(),
        frequency: formData.frequency.trim(),
        duration: formData.duration.trim(),
        instructions: formData.instructions.trim(),
        refills: Number.isFinite(refillsNum) ? refillsNum : 0,
        patientId,
        patientName: patientName || '',
        patientEmail: patientEmail || '',
        doctorId: doctorUid,
        doctorName: doctorUser?.name || '',
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'users', patientId, 'prescriptions'), payload)

      Alert.alert('Success', 'Prescription added')
      navigation.goBack()
    } catch (error) {
      console.error('Prescribe medication error:', error)
      Alert.alert('Error', error?.message || 'Failed to save prescription')
    } finally {
      setSaving(false)
    }
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Prescribe Medication</Text>
        <Text style={styles.subtitle}>For: {patientLabel}</Text>

        <View style={styles.card}>
          <Field
            label="Medication Name *"
            icon="medkit"
            value={formData.name}
            placeholder="e.g. Amlodipine"
            onChangeText={(t) => setFormData({ ...formData, name: t })}
          />
          <Field
            label="Dosage"
            icon="flask"
            value={formData.dosage}
            placeholder="e.g. 5mg"
            onChangeText={(t) => setFormData({ ...formData, dosage: t })}
          />
          <Field
            label="Frequency"
            icon="time"
            value={formData.frequency}
            placeholder="e.g. 1 tablet daily"
            onChangeText={(t) => setFormData({ ...formData, frequency: t })}
          />
          <Field
            label="Duration"
            icon="calendar"
            value={formData.duration}
            placeholder="e.g. 30 days"
            onChangeText={(t) => setFormData({ ...formData, duration: t })}
          />
          <Field
            label="Instructions"
            icon="document-text"
            value={formData.instructions}
            placeholder="e.g. Take in the morning with water"
            onChangeText={(t) => setFormData({ ...formData, instructions: t })}
            multiline
          />
          <Field
            label="Refills"
            icon="refresh"
            value={formData.refills}
            placeholder="0"
            onChangeText={(t) => setFormData({ ...formData, refills: t })}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={savePrescription}
            disabled={saving}
          >
            <Ionicons name="save" size={20} color={colors.white} />
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Save Prescription'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const Field = ({
  label,
  icon,
  value,
  placeholder,
  onChangeText,
  multiline,
  keyboardType,
}) => (
  <View style={styles.inputGroup}>
    <View style={styles.labelRow}>
      <Ionicons name={icon} size={16} color={colors.neutral[700]} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput
      style={[styles.input, multiline && styles.inputMultiline]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
    />
  </View>
)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutral[50] },
  content: { padding: 24, paddingBottom: 40, gap: 8 },
  title: { fontSize: 26, fontWeight: '800', color: colors.neutral[900] },
  subtitle: { fontSize: 14, color: colors.neutral[600], marginBottom: 8 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    gap: 16,
  },
  inputGroup: { gap: 8 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: colors.neutral[700] },
  input: {
    backgroundColor: '#F4F4F5',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: colors.neutral[900],
  },
  inputMultiline: { minHeight: 90, textAlignVertical: 'top' },
  saveButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary[600],
    paddingVertical: 14,
    borderRadius: 14,
  },
  saveButtonDisabled: { opacity: 0.7 },
  saveButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
})

export default DoctorPrescribeMedication

