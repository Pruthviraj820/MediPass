import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../services/firebase'
import { useAuthStore } from '../../stores/authStore'
import Navbar from '../../components/common/Navbar'
import { colors } from '../../constants/colors'

const DoctorPrivacySecurity = () => {
  const { user } = useAuthStore()
  const [shareData, setShareData] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
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
        setShareData(data.privacySettings?.shareData ?? true)
        setTwoFactor(data.privacySettings?.twoFactor ?? false)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (key, value) => {
    try {
      const doctorUid = auth?.currentUser?.uid || user?.uid || user?.id
      if (!doctorUid || !db) return

      const settingsDocRef = doc(db, 'users', doctorUid)
      await setDoc(
        settingsDocRef,
        {
          privacySettings: {
            shareData: key === 'shareData' ? value : shareData,
            twoFactor: key === 'twoFactor' ? value : twoFactor,
          },
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error saving settings:', error)
      Alert.alert('Error', 'Failed to save settings')
    }
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy & Security</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="shield-checkmark"
                size={22}
                color={colors.success[600]}
              />
              <View>
                <Text style={styles.rowTitle}>Share patient data</Text>
                <Text style={styles.rowSubtitle}>
                  Allow other authorized doctors to access patient records you've created.
                </Text>
              </View>
            </View>
            <Switch
              value={shareData}
              onValueChange={(value) => {
                setShareData(value)
                saveSettings('shareData', value)
              }}
              thumbColor={shareData ? colors.primary[600] : '#f4f3f4'}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="key" size={22} color={colors.primary[600]} />
              <View>
                <Text style={styles.rowTitle}>Two-factor authentication</Text>
                <Text style={styles.rowSubtitle}>
                  Add an extra layer of security to your account.
                </Text>
              </View>
            </View>
            <Switch
              value={twoFactor}
              onValueChange={(value) => {
                setTwoFactor(value)
                saveSettings('twoFactor', value)
              }}
              thumbColor={twoFactor ? colors.primary[600] : '#f4f3f4'}
            />
          </View>

          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle"
              size={20}
              color={colors.neutral[600]}
            />
            <Text style={styles.infoText}>
              Your privacy settings are synced across all your devices.
            </Text>
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.neutral[600],
  },
})

export default DoctorPrivacySecurity
