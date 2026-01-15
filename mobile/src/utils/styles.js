import { StyleSheet } from 'react-native'
import { colors } from '../constants/colors'

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonPrimary: {
    backgroundColor: colors.primary[600],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.neutral[900],
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: 18,
    color: colors.neutral[600],
  },
  text: {
    fontSize: 16,
    color: colors.neutral[700],
  },
})

