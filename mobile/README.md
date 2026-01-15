# MediPass Mobile App

React Native Expo Go application for MediPass - Your Complete Health Record In One QR Code.

## Features

- **Patient Features:**
  - View medical dashboard
  - Generate and display QR code
  - View medical timeline/history
  - Manage prescriptions
  - Emergency profile with critical information

- **Doctor Features:**
  - Scan patient QR codes
  - View patient profiles and medical history
  - Add diagnoses and prescriptions
  - Download patient records

## Tech Stack

- **React Native** with **Expo SDK 54**
- **React Navigation** for navigation
- **Zustand** for state management
- **AsyncStorage** for data persistence
- **Expo Barcode Scanner** for QR code scanning
- **React Native QR Code SVG** for QR code generation
- **Axios** for API calls
- **Date-fns** for date formatting

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Scan the QR code with Expo Go app on your iOS or Android device.

## Running on Different Platforms

- **iOS Simulator**: `npm run ios`
- **Android Emulator**: `npm run android`
- **Web**: `npm run web`

## Project Structure

```
mobile/
├── src/
│   ├── components/       # Reusable components
│   │   ├── common/       # Common components (Navbar, Sidebar, MedicalTimeline)
│   │   └── patient/      # Patient-specific components (PatientQR)
│   ├── constants/        # Constants (colors, etc.)
│   ├── data/            # Mock data
│   ├── navigation/      # Navigation setup
│   ├── pages/          # Screen components
│   │   ├── doctor/     # Doctor screens
│   │   ├── patient/    # Patient screens
│   │   └── public/     # Public screens (Landing, Login, Signup)
│   ├── services/       # API services
│   ├── stores/         # Zustand stores
│   └── utils/          # Utility functions
├── App.js              # Main app component
└── app.json            # Expo configuration
```

## Demo Credentials

- **Email**: john.doe@email.com
- **Password**: password123
- **Role**: Patient or Doctor

## Permissions

The app requires camera permission for QR code scanning functionality.

## Compatibility

- **Expo SDK**: 54.0.31
- **React**: 19.1.0
- **React Native**: 0.81.5
- **Compatible with Expo Go** app

## Notes

- Currently uses mock data for demonstration purposes
- Replace API endpoints in `src/services/api.js` with your actual backend URLs
- Update authentication logic in `src/stores/authStore.js` to connect with your backend

