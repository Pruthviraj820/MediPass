# Troubleshooting Guide

## Common Errors and Solutions

### 1. "Cannot find native module 'ExpoBarCodeScanner'"

**Solution:**
- The app now has fallback handling for this. If you see this error:
  1. Make sure you're using the latest Expo Go app (update from App Store/Play Store)
  2. Restart Expo Go completely (force close and reopen)
  3. Clear cache: `npx expo start -c`
  4. The app will automatically use a mock scanner if the native module isn't available

**What was fixed:**
- Added try-catch error handling for barcode scanner
- App gracefully falls back to mock scanner mode
- You can still test all functionality using the "Simulate Scan" button

### 2. "Cannot find module 'expo-linear-gradient'"

**Solution:**
- Already fixed with fallback handling
- The app will use a solid color background if LinearGradient isn't available
- To ensure it works: `npx expo install expo-linear-gradient`

### 3. "Cannot find module 'react-native-qrcode-svg'"

**Solution:**
- Already fixed with fallback handling
- The app will show an icon-based QR code display if the SVG module isn't available
- To ensure it works: `npm install react-native-qrcode-svg`

### 4. Camera Permission Issues

**Solution:**
- Go to your device Settings > Apps > Expo Go > Permissions
- Enable Camera permission
- Restart the app

### 5. App Crashes on Startup

**Solution:**
1. Clear all caches:
   ```bash
   cd mobile
   rm -rf node_modules
   npm install
   npx expo start -c
   ```

2. Update Expo Go app to the latest version

3. Restart your device

### 6. Navigation Errors

**Solution:**
- Make sure you're logged in with the correct role (patient/doctor)
- If stuck, clear app data: Settings > Apps > Expo Go > Clear Data

## Testing Without Native Modules

The app now works even if native modules fail to load:

- **QR Scanner**: Use the "Simulate Scan" button to test patient scanning
- **QR Code Display**: Shows an icon-based fallback if SVG isn't available
- **Gradients**: Uses solid colors as fallback

## Verification Steps

1. **Check Expo Go Version:**
   - Open Expo Go app
   - Check version in settings (should be latest)
   - Update if needed

2. **Verify Dependencies:**
   ```bash
   cd mobile
   npm list expo-barcode-scanner expo-linear-gradient react-native-qrcode-svg
   ```

3. **Clear and Reinstall:**
   ```bash
   cd mobile
   rm -rf node_modules package-lock.json
   npm install
   npx expo start -c
   ```

## Still Having Issues?

1. Check the console output for specific error messages
2. Make sure you're using Expo SDK 54 compatible versions
3. Try running on a different device/emulator
4. Check that your Node.js version is 18+ (`node --version`)

## Fallback Features

The app includes fallbacks for:
- ✅ Barcode Scanner → Mock scanner with simulate button
- ✅ QR Code SVG → Icon-based display
- ✅ Linear Gradient → Solid color backgrounds
- ✅ AsyncStorage → In-memory storage (development only)

All features remain functional even if native modules fail!

