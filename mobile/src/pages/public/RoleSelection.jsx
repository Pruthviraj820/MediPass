import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import Navbar from '../../components/common/Navbar'

const RoleSelection = () => {
  const navigation = useNavigation()

  return (
    <>
    <Navbar/>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.grid}>
        {/* Patient Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Signup', { role: 'patient' })}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.primary[500] }]}>
            <Ionicons name="person" size={48} color={colors.white} />
          </View>
          <Text style={styles.cardTitle}>Patient</Text>
          <Text style={styles.cardText}>
            Access your medical records, QR code, prescriptions, and emergency information instantly.
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>Continue as Patient</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.primary[600]} />
          </View>
        </TouchableOpacity>

        {/* Doctor Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Signup', { role: 'doctor' })}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.success[500] }]}>
            <Ionicons name="medical" size={48} color={colors.white} />
          </View>
          <Text style={styles.cardTitle}>Doctor</Text>
          <Text style={styles.cardText}>
            Scan patient QR codes, view medical history, add diagnoses and generate digital prescriptions.
          </Text>
          <View style={styles.cardFooter}>
            <Text style={[styles.cardFooterText, { color: colors.success[600] }]}>Continue as Doctor</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.success[600]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Security Badge */}
      {/* <View style={styles.securityCard}>
        <Ionicons name="shield-checkmark" size={64} color={colors.success[500]} />
        <Text style={styles.securityTitle}>Healthcare Grade Security</Text>
        <Text style={styles.securityText}>
          End-to-end encryption • HIPAA compliant • Your data stays yours
        </Text>
      </View> */}
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  grid: {
    gap: 24,
    marginBottom: 48,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardFooterText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[600],
  },
  securityCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  securityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginTop: 24,
    marginBottom: 12,
  },
  securityText: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
})

export default RoleSelection

