import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert 
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import { useAuthStore } from '../../stores/authStore'

const LoginPage = () => {
  const navigation = useNavigation()
  const { login, isLoading } = useAuthStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient' // Default role
  })

  const handleSubmit = async () => {
    // Validation
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please enter email and password')
      return
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }

    try {
      const result = await login(formData.email, formData.password, formData.role)
      
      if (!result.success) {
        Alert.alert('Login Failed', result.error || 'Please check your credentials')
      }
      // Navigation happens automatically via AppNavigator when auth state changes
    } catch (error) {
      console.error('Login error:', error)
      Alert.alert('Error', 'An unexpected error occurred. Please try again.')
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="shield" size={40} color={colors.white} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Access secure health records instantly</Text>
        </View>

        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="mail" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text.trim() })}
              placeholder="john.doe@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="lock-closed" size={16} color={colors.neutral[700]} />
              <Text style={styles.label}>Password</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Role Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Login as</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'patient' && styles.roleButtonActive
                ]}
                onPress={() => setFormData({ ...formData, role: 'patient' })}
              >
                <Ionicons 
                  name="person" 
                  size={20} 
                  color={formData.role === 'patient' ? colors.white : colors.neutral[700]} 
                />
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === 'patient' && styles.roleButtonTextActive
                  ]}
                >
                  Patient
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'doctor' && styles.roleButtonActive
                ]}
                onPress={() => setFormData({ ...formData, role: 'doctor' })}
              >
                <Ionicons 
                  name="medical" 
                  size={20} 
                  color={formData.role === 'doctor' ? colors.white : colors.neutral[700]} 
                />
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === 'doctor' && styles.roleButtonTextActive
                  ]}
                >
                  Doctor
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <Ionicons name="shield" size={20} color={colors.white} />
                <Text style={styles.submitButtonText}>Login</Text>
                <Ionicons name="arrow-forward" size={20} color={colors.white} />
              </>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate('RoleSelection')}
            disabled={isLoading}
          >
            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>Create Account</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.primary[600]} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 32,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: colors.neutral[900],
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    backgroundColor: colors.white,
  },
  roleButtonActive: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  roleButtonText: {
    fontSize: 16,
    color: colors.neutral[700],
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    alignItems: 'center',
    marginTop: 8,
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
})

export default LoginPage