import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { format, parseISO } from 'date-fns'
import { mockMedicalRecords } from '../../data/mockData'
import { colors } from '../../constants/colors'

const MedicalTimeline = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="medical" size={32} color={colors.primary[600]} />
        <Text style={styles.title}>Medical History</Text>
      </View>

      <View style={styles.timeline}>
        {mockMedicalRecords.map((record, index) => (
          <View key={record.id} style={styles.timelineItem}>
            <View style={styles.timelineLine} />
            <View style={[styles.timelineDot, index === 0 && styles.timelineDotActive]} />
            
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar" size={20} color={colors.primary[600]} />
                  <Text style={styles.date}>
                    {format(parseISO(record.date), 'MMM dd, yyyy')}
                  </Text>
                </View>
                <View style={styles.doctorContainer}>
                  <Ionicons name="person" size={16} color={colors.neutral[400]} />
                  <Text style={styles.doctor}>{record.doctor}</Text>
                </View>
              </View>
              
              <Text style={styles.diagnosis}>{record.diagnosis}</Text>
              
              {record.prescription && (
                <View style={styles.prescriptionContainer}>
                  <Text style={styles.prescriptionLabel}>Prescription:</Text>
                  <Text style={styles.prescription}>{record.prescription}</Text>
                </View>
              )}
              
              {record.reports?.length > 0 && (
                <View style={styles.reportsContainer}>
                  {record.reports.map((report, idx) => (
                    <View key={idx} style={styles.reportTag}>
                      <Text style={styles.reportText}>📄 {report}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  timeline: {
    position: 'relative',
  },
  timelineItem: {
    position: 'relative',
    marginLeft: 32,
    marginBottom: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: -24,
    top: 0,
    bottom: -24,
    width: 2,
    backgroundColor: colors.primary[200],
  },
  timelineDot: {
    position: 'absolute',
    left: -32,
    top: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.success[600],
    borderWidth: 4,
    borderColor: colors.success[200],
    zIndex: 10,
  },
  timelineDotActive: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[200],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[500],
  },
  doctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  doctor: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  diagnosis: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 12,
  },
  prescriptionContainer: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[100],
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  prescriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[800],
    marginBottom: 4,
  },
  prescription: {
    fontSize: 16,
    color: colors.primary[700],
  },
  reportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reportTag: {
    backgroundColor: colors.neutral[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reportText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[700],
  },
})

export default MedicalTimeline

