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
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { auth, db } from '../../services/firebase'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorPatientsList = () => {
  const navigation = useNavigation()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const doctorUid = auth?.currentUser?.uid
    if (!doctorUid || !db) {
      setLoading(false)
      return
    }

    // Set up real-time listener
    const patientsRef = collection(db, 'doctors', doctorUid, 'patients')
    const q = query(patientsRef, orderBy('addedAt', 'desc'))
    
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const patientsList = []
        querySnapshot.forEach((doc) => {
          patientsList.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPatients(patientsList)
        setLoading(false)
      },
      (error) => {
        console.error('Error loading patients:', error)
        Alert.alert('Error', 'Failed to load patients list')
        setLoading(false)
      }
    )

    // Cleanup listener on unmount
    return () => unsubscribe()
  }, [])

  const handlePatientPress = (patient) => {
    navigation.navigate('DoctorPatientProfile', {
      patientId: patient.patientId || patient.id,
      patientName: patient.name,
      patientEmail: patient.email,
    })
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Navbar />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text style={styles.loadingText}>Loading patients...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="people" size={32} color={colors.primary[600]} />
          </View>
          <View>
            <Text style={styles.title}>My Patients</Text>
            <Text style={styles.subtitle}>
              {patients.length} {patients.length === 1 ? 'patient' : 'patients'} total
            </Text>
          </View>
        </View>

        {patients.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={80} color={colors.neutral[300]} />
            <Text style={styles.emptyTitle}>No Patients Yet</Text>
            <Text style={styles.emptyText}>
              Scan a patient QR code to add them to your list
            </Text>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => navigation.navigate('DoctorQRScanner')}
            >
              <Ionicons name="qr-code" size={20} color={colors.white} />
              <Text style={styles.scanButtonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.patientsList}>
            {patients.map((patient) => {
              const avatarLetter = (patient.name || patient.email || 'P')[0].toUpperCase()
              return (
                <TouchableOpacity
                  key={patient.id}
                  style={styles.patientCard}
                  onPress={() => handlePatientPress(patient)}
                >
                  <View style={styles.patientAvatar}>
                    <Text style={styles.patientAvatarText}>{avatarLetter}</Text>
                  </View>
                  <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>{patient.name || 'Unknown Patient'}</Text>
                    <Text style={styles.patientEmail}>{patient.email || ''}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={colors.neutral[400]} />
                </TouchableOpacity>
              )
            })}
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[700],
  },
  emptyText: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 8,
  },
  scanButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  patientsList: {
    gap: 16,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 16,
  },
  patientAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientAvatarText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  patientEmail: {
    fontSize: 14,
    color: colors.neutral[600],
  },
})

export default DoctorPatientsList
