import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorHelpCenter = () => {
  const handleContactEmail = () => {
    Linking.openURL('mailto:support@medipass.app')
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Help Center</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Getting Started</Text>
          <Text style={styles.text}>
            MediPass helps you manage patient records, scan QR codes to access patient information,
            add diagnoses, prescribe medications, and maintain comprehensive medical histories.
          </Text>

          <Text style={styles.heading}>Common questions</Text>
          <Text style={styles.bullet}>
            • How do I scan a patient QR code?
          </Text>
          <Text style={styles.answer}>
            Go to the Dashboard and tap &quot;Scan Patient QR&quot;. Point your camera at the patient&apos;s QR code
            to instantly access their medical profile.
          </Text>
          <Text style={styles.bullet}>
            • How do I add a diagnosis?
          </Text>
          <Text style={styles.answer}>
            Navigate to a patient&apos;s profile and tap &quot;Add Diagnosis&quot;. Fill in the diagnosis details,
            optional prescription information, and upload lab reports if needed.
          </Text>
          <Text style={styles.bullet}>
            • Can I download patient records?
          </Text>
          <Text style={styles.answer}>
            Yes! In any patient profile, tap &quot;Download Records&quot; to generate a PDF of their complete
            medical history.
          </Text>
          <Text style={styles.bullet}>
            • How do I prescribe medication?
          </Text>
          <Text style={styles.answer}>
            You can add prescription details when adding a diagnosis, or use the separate
            &quot;Prescribe Medication&quot; option from the patient profile.
          </Text>

          <Text style={styles.heading}>Need more help?</Text>
          <TouchableOpacity style={styles.contactBtn} onPress={handleContactEmail}>
            <Ionicons name="mail" size={20} color={colors.white} />
            <Text style={styles.contactText}>Contact Support</Text>
          </TouchableOpacity>
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
  bullet: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  answer: {
    fontSize: 14,
    color: colors.neutral[700],
  },
  contactBtn: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary[600],
    paddingVertical: 12,
    borderRadius: 14,
  },
  contactText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
})

export default DoctorHelpCenter
