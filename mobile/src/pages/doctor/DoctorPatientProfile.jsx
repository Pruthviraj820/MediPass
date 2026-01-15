import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { mockPatients, mockMedicalRecords } from '../../data/mockData'
import MedicalTimeline from '../../components/common/MedicalTimeline'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorPatientProfile = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { id } = route.params || { id: 'patient-001' }
  const patient = mockPatients.find(p => p.id === id) || mockPatients[0]
  
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Patient Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{patient.name[0]}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{patient.name}</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detail}>DOB: 15 Mar 1985 (40 yrs)</Text>
                <Text style={styles.detail}>{patient.phone}</Text>
                <Text style={[styles.detail, styles.bloodGroup]}>{patient.bloodGroup}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download" size={20} color={colors.white} />
              <Text style={styles.downloadButtonText}>Download Records</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('DoctorAddDiagnosis', { patientId: id })}
            >
              <Ionicons name="create" size={20} color={colors.primary[700]} />
              <Text style={styles.addButtonText}>Add Diagnosis</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Info */}
        <View style={styles.emergencyGrid}>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <Ionicons name="document-text" size={32} color={colors.neutral[700]} />
              <Text style={styles.emergencyTitle}>Critical Alerts</Text>
            </View>
            <View style={styles.allergiesList}>
              {patient.allergies.map((allergy, index) => (
                <View key={index} style={styles.allergyItem}>
                  <View style={styles.allergyDot} />
                  <Text style={styles.allergyText}>{allergy}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.emergencyCard}>
            <Text style={styles.emergencyTitle}>Emergency Contact</Text>
            <View style={styles.contactCard}>
              <Text style={styles.contactText}>{patient.emergencyContact}</Text>
            </View>
          </View>
        </View>

        {/* Medical History */}
        <MedicalTimeline />
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
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 32,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 24,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 48,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detail: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  bloodGroup: {
    fontWeight: '600',
    color: colors.primary[600],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  downloadButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[50],
    borderWidth: 2,
    borderColor: colors.primary[200],
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  addButtonText: {
    color: colors.primary[700],
    fontSize: 18,
    fontWeight: '600',
  },
  emergencyGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  emergencyCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  allergiesList: {
    gap: 12,
  },
  allergyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  allergyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral[700],
  },
  allergyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  contactCard: {
    backgroundColor: colors.success[50],
    borderWidth: 2,
    borderColor: colors.success[200],
    borderRadius: 16,
    padding: 24,
  },
  contactText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.success[800],
  },
})

export default DoctorPatientProfile

