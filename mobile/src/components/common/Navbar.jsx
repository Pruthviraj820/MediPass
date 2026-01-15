import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'

const Navbar = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => {
            // Navigate to dashboard based on current route
            const state = navigation.getState()
            const currentRoute = state?.routes[state?.index]?.name
            if (currentRoute?.includes('Patient')) {
              navigation.navigate('PatientDashboard')
            } else if (currentRoute?.includes('Doctor')) {
              navigation.navigate('DoctorDashboard')
            }
          }}
        >
          <View style={styles.logo}>
            <Ionicons name="qr-code" size={24} color={colors.white} />
          </View>
          <Text style={styles.logoText}>MediPass</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    paddingTop: 32,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
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
})

export default Navbar

