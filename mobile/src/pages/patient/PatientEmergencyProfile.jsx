import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { mockPatients } from '../../data/mockData'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const PatientEmergencyProfile = () => {
  const patient = mockPatients[0]
  
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="warning" size={32} color={colors.neutral[700]} />
          </View>
          <View>
            <Text style={styles.title}>Emergency Profile</Text>
            <Text style={styles.subtitle}>Critical information for healthcare providers</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.grid}>
            {/* Profile Info */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="shield" size={32} color={colors.primary[600]} />
                <Text style={styles.sectionTitle}>Patient Information</Text>
              </View>
              
              <View style={styles.profileInfo}>
                <View style={styles.profileCard}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{patient.name[0]}</Text>
                  </View>
                  <View>
                    <Text style={styles.name}>{patient.name}</Text>
                    <Text style={styles.email}>{patient.email}</Text>
                  </View>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoCard}>
                    <Ionicons name="water" size={32} color={colors.primary[600]} />
                    <Text style={styles.infoValue}>{patient.bloodGroup}</Text>
                    <Text style={styles.infoLabel}>Blood Group</Text>
                  </View>
                  <View style={styles.infoCard}>
                    <Ionicons name="call" size={32} color={colors.success[600]} />
                    <Text style={styles.infoValue}>{patient.phone}</Text>
                    <Text style={styles.infoLabel}>Emergency Contact</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Allergies */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="warning" size={32} color={colors.neutral[700]} />
                <Text style={styles.sectionTitle}>Allergies & Conditions</Text>
              </View>
              
              <View style={styles.allergiesList}>
                {patient.allergies.map((allergy, index) => (
                  <View key={index} style={styles.allergyItem}>
                    <View style={styles.allergyDot} />
                    <Text style={styles.allergyText}>{allergy}</Text>
                  </View>
                ))}
                
                {patient.allergies.length === 0 && (
                  <View style={styles.noAllergies}>
                    <Ionicons name="shield-checkmark" size={64} color={colors.success[600]} />
                    <Text style={styles.noAllergiesText}>No known allergies</Text>
                  </View>
                )}
              </View>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.neutral[200],
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
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  grid: {
    gap: 32,
  },
  section: {
    gap: 24,
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
  profileInfo: {
    gap: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary[600],
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  email: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary[800],
    marginTop: 12,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.primary[700],
  },
  allergiesList: {
    gap: 16,
  },
  allergyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  allergyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.neutral[700],
  },
  allergyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  noAllergies: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.success[50],
    borderWidth: 2,
    borderColor: colors.success[200],
    borderRadius: 16,
  },
  noAllergiesText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.success[800],
    marginTop: 16,
  },
})

export default PatientEmergencyProfile

