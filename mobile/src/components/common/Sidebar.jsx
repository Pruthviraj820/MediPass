import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../../stores/authStore'
import { colors } from '../../constants/colors'

const Sidebar = ({ role = 'patient' }) => {
  const { user, logout } = useAuthStore()
  const navigation = useNavigation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const patientLinks = [
    { screen: 'PatientDashboard', icon: 'grid', label: 'Dashboard' },
    { screen: 'PatientQRCode', icon: 'qr-code', label: 'QR Code' },
    { screen: 'PatientMedicalTimeline', icon: 'document-text', label: 'Medical History' },
    { screen: 'PatientPrescriptions', icon: 'time', label: 'Prescriptions' },
    { screen: 'PatientEmergencyProfile', icon: 'shield', label: 'Emergency Profile' },
  ]

  const doctorLinks = [
    { screen: 'DoctorDashboard', icon: 'grid', label: 'Dashboard' },
    { screen: 'DoctorQRScanner', icon: 'camera', label: 'Scan QR' },
    { screen: 'DoctorPatientProfile', icon: 'person', label: 'Patients' },
    { screen: 'DoctorAddDiagnosis', icon: 'medical', label: 'Add Diagnosis' },
  ]

  const links = role === 'doctor' ? doctorLinks : patientLinks

  return (
    <View style={[styles.container, isCollapsed && styles.containerCollapsed]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logo}>
            <Ionicons name="qr-code" size={24} color={colors.white} />
          </View>
          {!isCollapsed && <Text style={styles.logoText}>MediPass</Text>}
        </View>
        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)} style={styles.collapseButton}>
          <Ionicons name={isCollapsed ? "chevron-forward" : "chevron-back"} size={20} color={colors.neutral[600]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.nav}>
        {links.map((link) => (
          <TouchableOpacity
            key={link.screen}
            style={styles.navItem}
            onPress={() => navigation.navigate(link.screen)}
          >
            <Ionicons name={link.icon} size={24} color={colors.neutral[700]} />
            {!isCollapsed && <Text style={styles.navItemText}>{link.label}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || 'U'}</Text>
          </View>
          {!isCollapsed && (
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
              <Text style={styles.userRole}>{user?.role || role}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out" size={24} color={colors.neutral[600]} />
          {!isCollapsed && <Text style={styles.logoutText}>Logout</Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 256,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.neutral[200],
  },
  containerCollapsed: {
    width: 80,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  collapseButton: {
    padding: 8,
  },
  nav: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    marginBottom: 8,
  },
  navItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[700],
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.neutral[50],
    borderRadius: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  userRole: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[600],
  },
})

export default Sidebar

