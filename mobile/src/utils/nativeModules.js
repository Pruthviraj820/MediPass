/**
 * Safe native module imports with fallbacks
 * This ensures the app doesn't crash if native modules aren't available
 */

// LinearGradient fallback
export let LinearGradient = null
try {
  const gradientModule = require('expo-linear-gradient')
  LinearGradient = gradientModule.LinearGradient
} catch (error) {
  console.warn('expo-linear-gradient not available, using fallback')
  LinearGradient = ({ children, style, colors: _colors, ...props }) => {
    const React = require('react')
    const { View } = require('react-native')
    const { colors } = require('../constants/colors')
    return React.createElement(View, {
      style: [{ backgroundColor: _colors?.[0] || colors.white }, style],
      ...props
    }, children)
  }
}

// QRCode fallback
export let QRCode = null
export let qrCodeAvailable = false
try {
  QRCode = require('react-native-qrcode-svg').default
  qrCodeAvailable = true
} catch (error) {
  console.warn('react-native-qrcode-svg not available, using fallback')
  qrCodeAvailable = false
}

// BarCodeScanner fallback
export let BarCodeScanner = null
export let scannerAvailable = false
try {
  const scannerModule = require('expo-barcode-scanner')
  BarCodeScanner = scannerModule.BarCodeScanner
  scannerAvailable = true
} catch (error) {
  console.warn('expo-barcode-scanner not available, using fallback')
  scannerAvailable = false
}

// AsyncStorage - should always be available, but add error handling
export let AsyncStorage = null
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default
} catch (error) {
  console.error('AsyncStorage not available - this is critical!', error)
  // Fallback to in-memory storage (not persistent)
  AsyncStorage = {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
    clear: async () => {},
  }
}

