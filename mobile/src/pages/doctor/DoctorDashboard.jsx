import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { mockPatients } from '../../data/mockData'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorDashboard = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Hero Scanner */}
        <TouchableOpacity
          style={styles.scannerCard}
          onPress={() => navigation.navigate('DoctorQRScanner')}
        >
          <View style={styles.scannerIconContainer}>
            <Ionicons name="camera" size={80} color={colors.neutral[400]} />
          </View>
          <Text style={styles.scannerTitle}>Scan Patient QR</Text>
          <Text style={styles.scannerSubtitle}>Hold any smartphone camera to scan</Text>
          <View style={styles.scannerButton}>
            <Ionicons name="medical" size={24} color={colors.white} />
            <Text style={styles.scannerButtonText}>Start Scan</Text>
          </View>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary[100] }]}>
              <Ionicons name="people" size={48} color={colors.primary[600]} />
            </View>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Patients Today</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.success[100] }]}>
              <Ionicons name="document-text" size={48} color={colors.success[600]} />
            </View>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Pending Reports</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.neutral[200] }]}>
              <Ionicons name="medical" size={48} color={colors.neutral[700]} />
            </View>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>New Diagnoses</Text>
          </View>
        </View>

        {/* Recent Patients */}
        <View style={styles.patientsCard}>
          <View style={styles.patientsHeader}>
            <Ionicons name="people" size={36} color={colors.primary[600]} />
            <Text style={styles.patientsTitle}>Recent Patients</Text>
          </View>
          
          <View style={styles.patientsList}>
            {mockPatients.map(patient => (
              <TouchableOpacity
                key={patient.id}
                style={styles.patientItem}
                onPress={() => navigation.navigate('DoctorPatientProfile', { id: patient.id })}
              >
                <View style={styles.patientAvatar}>
                  <Text style={styles.patientAvatarText}>{patient.name[0]}</Text>
                </View>
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>{patient.name}</Text>
                  <Text style={styles.patientDetails}>
                    {patient.bloodGroup} | {patient.allergies[0]}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Records</Text>
                </View>
              </TouchableOpacity>
            ))}
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
    gap: 32,
  },
  scannerCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  scannerIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 24,
    backgroundColor: colors.neutral[100],
    borderWidth: 4,
    borderColor: colors.neutral[300],
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  scannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 12,
  },
  scannerSubtitle: {
    fontSize: 20,
    color: colors.neutral[600],
    marginBottom: 32,
  },
  scannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success[500],
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    gap: 12,
  },
  scannerButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 18,
    color: colors.neutral[600],
    textAlign: 'center',
  },
  patientsCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  patientsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    gap: 12,
  },
  patientsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  patientsList: {
    gap: 0,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    gap: 16,
  },
  patientAvatar: {
    width: 64,
    height: 64,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  viewButton: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[800],
  },
})

export default DoctorDashboard

