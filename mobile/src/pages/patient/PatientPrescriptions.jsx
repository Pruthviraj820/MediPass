import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { mockPrescriptions } from '../../data/mockData'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const PatientPrescriptions = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="medical" size={32} color={colors.success[600]} />
          </View>
          <View>
            <Text style={styles.title}>Prescriptions</Text>
            <Text style={styles.subtitle}>Medication schedule and reminders</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {mockPrescriptions.map(prescription => (
            <View key={prescription.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{prescription.name}</Text>
                <View style={[styles.refillBadge, prescription.refills > 0 ? styles.refillBadgeActive : styles.refillBadgeWarning]}>
                  <Text style={styles.refillText}>{prescription.refills} refills</Text>
                </View>
              </View>
              
              <View style={styles.details}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Dosage:</Text>
                  <Text style={styles.detailValue}>{prescription.dosage}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Frequency:</Text>
                  <Text style={styles.detailValue}>{prescription.frequency}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.detailValue}>{prescription.duration}</Text>
                </View>
              </View>

              <View style={styles.instructionsContainer}>
                <Text style={styles.instructions}>{prescription.instructions}</Text>
              </View>

              <View style={styles.footer}>
                <View style={styles.timeContainer}>
                  <Ionicons name="time" size={20} color={colors.primary[600]} />
                  <Text style={styles.timeText}>
                    {format(new Date(prescription.nextDose), 'HH:mm')}
                  </Text>
                </View>
                <Ionicons name="checkmark-circle" size={32} color={colors.success[500]} />
              </View>
            </View>
          ))}
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
    backgroundColor: colors.success[100],
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
  grid: {
    gap: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[900],
    flex: 1,
  },
  refillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  refillBadgeActive: {
    backgroundColor: colors.success[100],
  },
  refillBadgeWarning: {
    backgroundColor: colors.neutral[200],
  },
  refillText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success[800],
  },
  details: {
    gap: 12,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[700],
    marginRight: 8,
  },
  detailValue: {
    fontSize: 16,
    color: colors.neutral[700],
  },
  instructionsContainer: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: colors.primary[800],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary[600],
  },
})

export default PatientPrescriptions

