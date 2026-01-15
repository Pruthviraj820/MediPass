# Quick Start Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app installed on your iOS/Android device

## Setup Steps

1. **Navigate to the mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

4. **Run on your device:**
   - Open Expo Go app on your phone
   - Scan the QR code displayed in the terminal/browser
   - The app will load on your device

## Testing the App

### As a Patient:
1. Start at the Landing page
2. Click "Get Started Free" or navigate to Login
3. Login with:
   - Email: `john.doe@email.com`
   - Password: `password123`
   - Role: `Patient`
4. Explore:
   - Dashboard with QR code
   - Medical Timeline
   - Prescriptions
   - Emergency Profile

### As a Doctor:
1. Start at the Landing page
2. Click "Doctor Login" or navigate to Login
3. Login with:
   - Email: `john.doe@email.com`
   - Password: `password123`
   - Role: `Doctor`
4. Explore:
   - Dashboard with QR Scanner
   - Scan patient QR codes
   - View patient profiles
   - Add diagnoses

## Troubleshooting

- **Camera not working**: Make sure you've granted camera permissions in your device settings
- **App not loading**: Try clearing Expo Go cache and restarting
- **Navigation issues**: Ensure you're logged in with the correct role

## Building for Production

To create a production build:

```bash
# For Android
eas build --platform android

# For iOS
eas build --platform ios
```

Note: You'll need to set up EAS (Expo Application Services) for production builds.

