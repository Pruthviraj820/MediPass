import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { mockPatients, mockPrescriptions } from '../../data/mockData'
import PatientQR from '../../components/patient/PatientQR'
import MedicalTimeline from '../../components/common/MedicalTimeline'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

// Safe import with fallback for LinearGradient
let LinearGradient = null
try {
  const gradientModule = require('expo-linear-gradient')
  LinearGradient = gradientModule.LinearGradient
} catch (error) {
  console.warn('expo-linear-gradient not available, using fallback')
  LinearGradient = ({ children, style, colors: _colors, ...props }) => (
    <View style={[{ backgroundColor: _colors?.[0] || colors.white }, style]} {...props}>
      {children}
    </View>
  )
}

const PatientDashboard = () => {
  const navigation = useNavigation()
  const patient = mockPatients[0]

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content}>
        <View style={styles.hero}>
          <LinearGradient
            colors={[colors.primary[500], colors.success[500]]}
            style={styles.badge}
          >
            <Ionicons name="heart" size={20} color={colors.white} />
            <Text style={styles.badgeText}>Your Health Records, Always Accessible</Text>
          </LinearGradient>
          <Text style={styles.title}>Welcome Back, {patient.name}</Text>
        </View>

        <View style={styles.grid}>
          <PatientQR />
          
          <View style={styles.statsGrid}>
            <TouchableOpacity
              style={styles.statCard}
              onPress={() => navigation.navigate('PatientPrescriptions')}
            >
              <View style={[styles.statIcon, { backgroundColor: colors.success[100] }]}>
                <Ionicons name="medical" size={40} color={colors.success[600]} />
              </View>
              <Text style={styles.statNumber}>{mockPrescriptions.length}</Text>
              <Text style={styles.statLabel}>Active Prescriptions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statCard}
              onPress={() => navigation.navigate('PatientEmergencyProfile')}
            >
              <View style={[styles.statIcon, { backgroundColor: colors.neutral[200] }]}>
                <Ionicons name="warning" size={40} color={colors.neutral[700]} />
              </View>
              <Text style={styles.statNumber}>{patient.allergies.length}</Text>
              <Text style={styles.statLabel}>Known Allergies</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    padding: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 24,
    gap: 8,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
    textAlign: 'center',
  },
  grid: {
    gap: 24,
    marginBottom: 32,
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
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
  },
})

export default PatientDashboard

