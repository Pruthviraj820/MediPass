import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { mockPatients } from '../../data/mockData'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorAddDiagnosis = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { patientId } = route.params || { patientId: 'patient-001' }
  const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0]
  
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    dosage: '',
    instructions: '',
  })

  const handleSubmit = () => {
    // Mock save
    Alert.alert('Success', 'Diagnosis saved successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('DoctorPatientProfile', { id: patientId })
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{patient?.name?.[0]}</Text>
          </View>
          <View>
            <Text style={styles.title}>Add Diagnosis</Text>
            <Text style={styles.subtitle}>For {patient?.name}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.formGrid}>
            {/* Diagnosis */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="medical" size={24} color={colors.primary[600]} />
                <Text style={styles.label}>Diagnosis</Text>
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
                <Text style={styles.label}>Prescription</Text>
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
              <Text style={styles.label}>Instructions</Text>
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
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit}
            >
              <Ionicons name="save" size={24} color={colors.white} />
              <Text style={styles.saveButtonText}>Save Diagnosis</Text>
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
  saveButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
})

export default DoctorAddDiagnosis

