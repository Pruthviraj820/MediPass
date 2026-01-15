import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { doc, getDoc, collection, query, getDocs, orderBy } from 'firebase/firestore'
import { format } from 'date-fns'
import { db } from '../../services/firebase'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorPatientProfile = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { patientId, patientName: routePatientName, patientEmail: routePatientEmail } = route.params || {}
  
  const [patient, setPatient] = useState(null)
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (patientId) {
      loadPatientData()
    } else {
      setLoading(false)
    }
  }, [patientId])

  const loadPatientData = async () => {
    try {
      if (!db || !patientId) {
        setLoading(false)
        return
      }

      // Load patient profile from Firestore
      const patientDocRef = doc(db, 'users', patientId)
      const patientDoc = await getDoc(patientDocRef)

      if (patientDoc.exists()) {
        const patientData = patientDoc.data()
        setPatient({
          id: patientId,
          name: patientData.name || routePatientName || 'Unknown Patient',
          email: patientData.email || routePatientEmail || '',
          phone: patientData.phone || '',
          bloodGroup: patientData.bloodGroup || 'Unknown',
          allergies: Array.isArray(patientData.allergies) ? patientData.allergies : [],
          medicalConditions: Array.isArray(patientData.medicalConditions) ? patientData.medicalConditions : [],
          emergencyContacts: Array.isArray(patientData.emergencyContacts) ? patientData.emergencyContacts : [],
        })
      } else {
        // Fallback to route params if doc doesn't exist
        setPatient({
          id: patientId,
          name: routePatientName || 'Unknown Patient',
          email: routePatientEmail || '',
          phone: '',
          bloodGroup: 'Unknown',
          allergies: [],
          medicalConditions: [],
          emergencyContacts: [],
        })
      }

      // Load prescriptions
      const prescriptionsRef = collection(db, 'users', patientId, 'prescriptions')
      const q = query(prescriptionsRef, orderBy('createdAt', 'desc'))
      const prescriptionsSnapshot = await getDocs(q)

      const prescriptionsList = []
      prescriptionsSnapshot.forEach((doc) => {
        const data = doc.data()
        prescriptionsList.push({
          id: doc.id,
          ...data,
        })
      })
      setPrescriptions(prescriptionsList)
    } catch (error) {
      console.error('Error loading patient data:', error)
      Alert.alert('Error', 'Failed to load patient data')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadRecords = () => {
    // TODO: Implement PDF generation and download
    Alert.alert(
      'Download Records',
      'PDF download functionality will be implemented soon.',
      [{ text: 'OK' }]
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Navbar />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text style={styles.loadingText}>Loading patient data...</Text>
        </View>
      </View>
    )
  }

  if (!patient) {
    return (
      <View style={styles.container}>
        <Navbar />
        <View style={styles.centerContent}>
          <Ionicons name="alert-circle" size={64} color={colors.neutral[400]} />
          <Text style={styles.errorText}>Patient not found</Text>
        </View>
      </View>
    )
  }

  const avatarLetter = (patient.name || 'P')[0].toUpperCase()

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Patient Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarLetter}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{patient.name}</Text>
              <View style={styles.detailsRow}>
                {patient.email && <Text style={styles.detail}>{patient.email}</Text>}
                {patient.phone && <Text style={styles.detail}>{patient.phone}</Text>}
                <Text style={[styles.detail, styles.bloodGroup]}>{patient.bloodGroup}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadRecords}>
              <Ionicons name="download" size={20} color={colors.white} />
              <Text style={styles.downloadButtonText}>Download Records</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('DoctorAddDiagnosis', { patientId: patient.id, patientName: patient.name })}
            >
              <Ionicons name="create" size={20} color={colors.primary[700]} />
              <Text style={styles.addButtonText}>Add Diagnosis</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.prescribeButton}
            onPress={() => navigation.navigate('DoctorPrescribeMedication', {
              patientId: patient.id,
              patientName: patient.name,
              patientEmail: patient.email,
            })}
          >
            <Ionicons name="medical" size={20} color={colors.white} />
            <Text style={styles.prescribeButtonText}>Prescribe Medication</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Info */}
        <View style={styles.emergencyGrid}>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <Ionicons name="warning" size={24} color={colors.error[600]} />
              <Text style={styles.emergencyTitle}>Allergies</Text>
            </View>
            <View style={styles.allergiesList}>
              {patient.allergies && patient.allergies.length > 0 ? (
                patient.allergies.map((allergy, index) => (
                  <View key={index} style={styles.allergyItem}>
                    <View style={styles.allergyDot} />
                    <Text style={styles.allergyText}>{allergy}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No known allergies</Text>
              )}
            </View>
          </View>

          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <Ionicons name="fitness" size={24} color={colors.error[600]} />
              <Text style={styles.emergencyTitle}>Medical Conditions</Text>
            </View>
            <View style={styles.allergiesList}>
              {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
                patient.medicalConditions.map((condition, index) => (
                  <View key={index} style={styles.allergyItem}>
                    <View style={styles.allergyDot} />
                    <Text style={styles.allergyText}>{condition}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No known conditions</Text>
              )}
            </View>
          </View>
        </View>

        {/* Emergency Contacts */}
        {patient.emergencyContacts && patient.emergencyContacts.length > 0 && (
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <Ionicons name="call" size={24} color={colors.success[600]} />
              <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
            </View>
            {patient.emergencyContacts.map((contact, index) => (
              <View key={index} style={styles.contactCard}>
                <Text style={styles.contactName}>{contact.name || 'Unknown'}</Text>
                <Text style={styles.contactPhone}>{contact.phone || ''}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Prescriptions */}
        <View style={styles.prescriptionsSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical" size={28} color={colors.primary[600]} />
            <Text style={styles.sectionTitle}>Prescriptions</Text>
          </View>

          {prescriptions.length === 0 ? (
            <View style={styles.emptyPrescriptions}>
              <Ionicons name="medical-outline" size={48} color={colors.neutral[300]} />
              <Text style={styles.emptyText}>No prescriptions yet</Text>
            </View>
          ) : (
            <View style={styles.prescriptionsList}>
              {prescriptions.map((prescription) => (
                <View key={prescription.id} style={styles.prescriptionCard}>
                  <View style={styles.prescriptionHeader}>
                    <Text style={styles.prescriptionName}>{prescription.name || 'Unknown Medication'}</Text>
                    {prescription.refills > 0 && (
                      <View style={styles.refillBadge}>
                        <Text style={styles.refillText}>{prescription.refills} refills</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.prescriptionDetails}>
                    <Text style={styles.prescriptionDetail}>
                      <Text style={styles.detailLabel}>Dosage: </Text>
                      {prescription.dosage || 'N/A'}
                    </Text>
                    <Text style={styles.prescriptionDetail}>
                      <Text style={styles.detailLabel}>Frequency: </Text>
                      {prescription.frequency || 'N/A'}
                    </Text>
                    <Text style={styles.prescriptionDetail}>
                      <Text style={styles.detailLabel}>Duration: </Text>
                      {prescription.duration || 'N/A'}
                    </Text>
                    {prescription.instructions && (
                      <View style={styles.instructionsContainer}>
                        <Text style={styles.instructions}>{prescription.instructions}</Text>
                      </View>
                    )}
                    {prescription.createdAt && (
                      <Text style={styles.prescriptionDate}>
                        Prescribed: {prescription.createdAt.toDate ? format(prescription.createdAt.toDate(), 'MMM dd, yyyy') : 'Unknown date'}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
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
  errorText: {
    fontSize: 18,
    color: colors.neutral[600],
    marginTop: 16,
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
    marginBottom: 12,
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
  prescribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success[600],
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  prescribeButtonText: {
    color: colors.white,
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
    padding: 16,
    marginBottom: 12,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success[800],
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 16,
    color: colors.success[700],
  },
  prescriptionsSection: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  emptyPrescriptions: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.neutral[500],
    fontStyle: 'italic',
  },
  prescriptionsList: {
    gap: 16,
  },
  prescriptionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  prescriptionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
    flex: 1,
  },
  refillBadge: {
    backgroundColor: colors.success[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  refillText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success[800],
  },
  prescriptionDetails: {
    gap: 8,
  },
  prescriptionDetail: {
    fontSize: 16,
    color: colors.neutral[700],
  },
  detailLabel: {
    fontWeight: '600',
    color: colors.neutral[900],
  },
  instructionsContainer: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[100],
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  instructions: {
    fontSize: 14,
    color: colors.primary[800],
  },
  prescriptionDate: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 8,
    fontStyle: 'italic',
  },
})

export default DoctorPatientProfile
