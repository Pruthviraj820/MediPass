import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import gradientModule from 'expo-linear-gradient'
import Navbar from '../../components/common/Navbar'

// Safe import with fallback for LinearGradient
let LinearGradient = null
try {
  LinearGradient = gradientModule.LinearGradient
} catch (error) {
  console.warn('expo-linear-gradient not available, using fallback',error)
  LinearGradient = ({ children, style, colors: _colors, ...props }) => (
    <View style={[{ backgroundColor: _colors?.[0] || colors.white }, style]} {...props}>
      {children}
    </View>
  )
}

const LandingPage = () => {
  const navigation = useNavigation()

  return (
    <>
    <Navbar />
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient
        colors={[colors.white, colors.neutral[50], colors.primary[50]]}
        style={styles.hero}
      >
        <View style={styles.heroContent}>
          {/* <View style={styles.badge}>
            <Ionicons name="flash" size={20} color={colors.primary[600]} />
            <Text style={styles.badgeText}>Hackathon Winner 2026 🚀</Text>
          </View> */}
          
          <Text style={styles.title}>
            Your Complete Health Record{'\n'}
            <Text style={styles.titleHighlight}>In One QR Code</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            MediPass unifies all your medical records, prescriptions, and emergency info into a secure, 
            scannable QR code. Instant access for doctors, peace of mind for you.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => navigation.navigate('RoleSelection')}
            >
              <Ionicons name="heart" size={20} color={colors.white} />
              <Text style={styles.buttonPrimaryText}>Get Started Free</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonSecondaryText}>Already a user? Login</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Everything You Need, Instantly Accessible</Text>
        <Text style={styles.featuresSubtitle}>
          From emergency contacts to complete medical history - all secured and instantly available.
        </Text>

        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: colors.primary[100] }]}>
              <Ionicons name="phone-portrait" size={40} color={colors.primary[600]} />
            </View>
            <Text style={styles.featureTitle}>QR Code Access</Text>
            <Text style={styles.featureText}>
              One scan gives doctors instant access to your complete medical profile.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: colors.success[100] }]}>
              <Ionicons name="shield-checkmark" size={40} color={colors.success[600]} />
            </View>
            <Text style={styles.featureTitle}>Healthcare Reports</Text>
            <Text style={styles.featureText}>
              One-stop destination for all your medical reports and history. Accesible to both doctors and patients.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: colors.success[100] }]}>
              <Ionicons name="people" size={40} color={colors.success[600]} />
            </View>
            <Text style={styles.featureTitle}>Works Everywhere</Text>
            <Text style={styles.featureText}>
              Compatible with any smartphone camera. No special apps required.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  hero: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[100],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 32,
  },
  badgeText: {
    color: colors.primary[800],
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 44,
  },
  titleHighlight: {
    color: colors.primary[600],
  },
  subtitle: {
    fontSize: 18,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 28,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  buttonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[600],
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 8,
  },
  buttonPrimaryText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSecondary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  buttonSecondaryText: {
    color: colors.primary[600],
    fontSize: 18,
    fontWeight: '600',
  },
  features: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  featuresTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresSubtitle: {
    fontSize: 18,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: 48,
  },
  featureGrid: {
    gap: 24,
  },
  featureCard: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  featureIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 12,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
})

export default LandingPage

