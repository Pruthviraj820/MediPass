import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../services/firebase'
import { useAuthStore } from '../../stores/authStore'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorNotifications = () => {
  const { user } = useAuthStore()
  const [appointment, setAppointment] = useState(true)
  const [patientUpdates, setPatientUpdates] = useState(true)
  const [system, setSystem] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const doctorUid = auth?.currentUser?.uid || user?.uid || user?.id
      if (!doctorUid || !db) {
        setLoading(false)
        return
      }

      const settingsDocRef = doc(db, 'users', doctorUid)
      const settingsDoc = await getDoc(settingsDocRef)
      
      if (settingsDoc.exists()) {
        const data = settingsDoc.data()
        setAppointment(data.notificationSettings?.appointment ?? true)
        setPatientUpdates(data.notificationSettings?.patientUpdates ?? true)
        setSystem(data.notificationSettings?.system ?? true)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      const doctorUid = auth?.currentUser?.uid || user?.uid || user?.id
      if (!doctorUid || !db) return

      const settingsDocRef = doc(db, 'users', doctorUid)
      await setDoc(
        settingsDocRef,
        {
          notificationSettings: {
            appointment,
            patientUpdates,
            system,
          },
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error saving settings:', error)
      Alert.alert('Error', 'Failed to save notification settings')
    }
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Notifications</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="calendar"
                size={22}
                color={colors.primary[600]}
              />
              <View>
                <Text style={styles.rowTitle}>Appointment reminders</Text>
                <Text style={styles.rowSubtitle}>
                  Get notified before upcoming patient appointments.
                </Text>
              </View>
            </View>
            <Switch
              value={appointment}
              onValueChange={(value) => {
                setAppointment(value)
                saveSettings()
              }}
              thumbColor={appointment ? colors.primary[600] : '#f4f3f4'}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="people" size={22} color={colors.success[600]} />
              <View>
                <Text style={styles.rowTitle}>Patient updates</Text>
                <Text style={styles.rowSubtitle}>
                  Notifications when patients update their emergency profiles.
                </Text>
              </View>
            </View>
            <Switch
              value={patientUpdates}
              onValueChange={(value) => {
                setPatientUpdates(value)
                saveSettings()
              }}
              thumbColor={patientUpdates ? colors.primary[600] : '#f4f3f4'}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="notifications"
                size={22}
                color={colors.neutral[700]}
              />
              <View>
                <Text style={styles.rowTitle}>System updates</Text>
                <Text style={styles.rowSubtitle}>
                  Announcements about new features and security updates.
                </Text>
              </View>
            </View>
            <Switch
              value={system}
              onValueChange={(value) => {
                setSystem(value)
                saveSettings()
              }}
              thumbColor={system ? colors.primary[600] : '#f4f3f4'}
            />
          </View>

          <Text style={styles.footerText}>
            Notification preferences are synced across all your devices.
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
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.neutral[900],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  rowSubtitle: {
    fontSize: 13,
    color: colors.neutral[600],
    marginTop: 2,
  },
  footerText: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 8,
  },
})

export default DoctorNotifications
