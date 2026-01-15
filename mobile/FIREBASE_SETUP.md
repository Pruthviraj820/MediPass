# Firebase Setup Guide

## Step 1: Install Firebase

Run this command in your terminal (in the mobile directory):

```bash
cd mobile
npm install firebase
```

## Step 2: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ > **Project Settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app, click **Add app** > **Web** (</> icon)
6. Copy the Firebase configuration object

It should look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

## Step 3: Update Firebase Config

Open `mobile/src/services/firebase.js` and replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAN5bv_lD0cVQp4XjFVHvJPwVEmfLxC6WQ",
  authDomain: "chatbot-2e9be.firebaseapp.com",
  projectId: "chatbot-2e9be",
  storageBucket: "chatbot-2e9be.firebasestorage.app",
  messagingSenderId: "778129422681",
  appId: "1:778129422681:web:c80d6aa08f13f82cfbf448",
  databaseURL : 'https://chatbot-2e9be-default-rtdb.firebaseio.com/' 
};
```

## Step 4: Enable Firebase Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Click **Save**

## Step 5: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select your preferred location
5. Click **Enable**

## Step 6: Create Firestore Collection Structure

The app expects a `users` collection with this structure:

```
users/
  {userId}/
    name: "John Doe"
    email: "john@example.com"
    role: "patient" or "doctor"
    phone: "+1234567890"
    createdAt: "2026-01-15T10:00:00Z"
```

## Step 7: Test the Setup

1. Restart your Expo app: `npm start`
2. Try signing up with a new email
3. Try logging in with the credentials

## Troubleshooting

### "Firebase auth not initialized"
- Make sure you've installed Firebase: `npm install firebase`
- Check that your Firebase config is correct in `firebase.js`

### "User data not found"
- Make sure Firestore is enabled
- Check that the user document was created in the `users` collection

### "Invalid role"
- Make sure when signing up, you select the correct role (patient/doctor)
- The role is stored in Firestore and checked during login

## Security Rules (For Production)

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Fallback Mode

If Firebase is not configured, the app will automatically fall back to mock authentication (for testing purposes). Once you add your Firebase credentials, it will use real authentication.

