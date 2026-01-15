import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorTermsConditions = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms & Conditions</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>1. Service</Text>
          <Text style={styles.text}>
            MediPass is a digital health record platform designed to help healthcare
            providers manage patient medical records securely and efficiently.
          </Text>

          <Text style={styles.heading}>2. Professional Responsibility</Text>
          <Text style={styles.text}>
            As a healthcare provider, you are responsible for maintaining accurate
            patient records and ensuring all diagnoses and prescriptions are properly
            documented. Always follow medical best practices and regulatory requirements.
          </Text>

          <Text style={styles.heading}>3. Patient Privacy</Text>
          <Text style={styles.text}>
            You must maintain patient confidentiality and comply with HIPAA and other
            applicable privacy regulations. Patient data should only be accessed for
            legitimate medical purposes.
          </Text>

          <Text style={styles.heading}>4. Data Accuracy</Text>
          <Text style={styles.text}>
            Ensure all medical records, diagnoses, and prescriptions entered into the
            system are accurate and complete. Review patient information before making
            entries.
          </Text>

          <Text style={styles.heading}>5. Use of the Platform</Text>
          <Text style={styles.text}>
            Do not misuse the platform, attempt to break security, or access patient
            data without proper authorization. Violations may result in account suspension
            and legal action.
          </Text>

          <Text style={styles.heading}>6. Liability</Text>
          <Text style={styles.text}>
            MediPass provides a platform for medical record management but is not
            responsible for medical decisions or treatment outcomes. Healthcare providers
            are solely responsible for their professional judgment and patient care.
          </Text>
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
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    gap: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[900],
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    color: colors.neutral[700],
  },
})

export default DoctorTermsConditions
