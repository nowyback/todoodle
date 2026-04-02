# Todoodle Mobile App - APK Build Guide

This guide shows how to create an Android APK version of Todoodle for your phone.

## 📱 Mobile App Options

### Option 1: Capacitor (Recommended - Modern)
### Option 2: Cordova (Legacy)
### Option 3: React Native (Full Rewrite)
### Option 4: PWA (Easiest - No APK needed)

---

## 🚀 Option 1: Capacitor (Recommended)

### Step 1: Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard
npm install @capacitor/push-notifications
```

### Step 2: Initialize Capacitor
```bash
npx cap init Todoodle com.todoodle.app
```

### Step 3: Configure Android
```bash
# Add Android platform
npx cap add android

# Build your web app
npm run build  # (if you have a build step)

# Sync with Android
npx cap sync android
```

### Step 4: Create APK
```bash
# Open Android Studio
npx cap open android

# Or build via command line
cd android
./gradlew assembleDebug
```

### APK Location
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🚀 Option 2: Cordova (Simpler)

### Step 1: Install Cordova
```bash
npm install -g cordova
npm install cordova-android
```

### Step 2: Create Cordova Project
```bash
# Create new Cordova project
cordova create todoodle-mobile com.todoodle.app Todoodle
cd todoodle-mobile
```

### Step 3: Add Platforms
```bash
cordova platform add android
```

### Step 4: Copy Web Files
```bash
# Copy your index.html, styles.css, script.js to www/
cp ../index.html www/
cp ../styles.css www/
cp ../script.js www/
```

### Step 5: Build APK
```bash
cordova build android
```

### APK Location
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🚀 Option 3: PWA (No APK Needed)

### Step 1: Add PWA Manifest
```javascript
// Add to index.html head
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#6366f1">
<meta name="apple-mobile-web-app-capable" content="yes">
```

### Step 2: Create manifest.json
```json
{
  "name": "Todoodle",
  "short_name": "Todoodle",
  "description": "Minimalist task manager for developers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020202",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Step 3: Add Service Worker
```javascript
// Create sw.js
const CACHE_NAME = 'todoodle-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### Step 4: Register Service Worker
```javascript
// Add to script.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## 🚀 Option 4: React Native (Full Mobile App)

### Step 1: Setup React Native
```bash
npx react-native init TodoodleMobile
cd TodoodleMobile
```

### Step 2: Install Dependencies
```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-sqlite-storage
npm install react-native-vector-icons
```

### Step 3: Create Components
```javascript
// App.js - Main mobile interface
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Your mobile logic here
  // Similar to your web app but React Native components
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>todoodle</Text>
      {/* Mobile UI components */}
    </View>
  );
}
```

---

## 🎯 Recommended Approach: PWA + Capacitor

### Why PWA + Capacitor is Best:
1. **Single codebase** - Web app works everywhere
2. **PWA features** - Works in mobile browsers
3. **Native APK** - Via Capacitor when needed
4. **Easy updates** - Update web, sync to mobile
5. **No Play Store needed** - Install directly

### Quick Setup:
```bash
# 1. Make your app PWA-ready
# 2. Add Capacitor for APK
# 3. Build both PWA and APK
```

---

## 📱 Mobile Features to Add

### Phone-Specific Features:
- **Push notifications** for task reminders
- **Camera integration** for photo notes
- **GPS location** for location-based tasks
- **Offline storage** with SQLite
- **Biometric auth** for security
- **Voice input** for hands-free task creation
- **Widget** for home screen
- **Share integration** from other apps

### Mobile UI Adjustments:
- **Touch-friendly** buttons and sliders
- **Mobile keyboard** optimizations
- **Gesture support** for swipe actions
- **Responsive design** for all screen sizes
- **Dark mode** system integration

---

## 🛠️ Build Commands Summary

### Capacitor (Recommended):
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init Todoodle com.todoodle.app
npx cap add android
npx cap sync android
npx cap open android  # Build APK in Android Studio
```

### Cordova (Alternative):
```bash
npm install -g cordova
cordova create todoodle-mobile com.todoodle.app Todoodle
cd todoodle-mobile
cordova platform add android
cp ../index.html ../styles.css ../script.js www/
cordova build android
```

### PWA (Easiest):
```bash
# Just add manifest.json and sw.js
# Works in mobile browsers
# No build tools needed
```

---

## 📲 Installation on Phone

### APK Installation:
1. **Enable unknown sources** in Android settings
2. **Download APK** to phone
3. **Install** the APK file
4. **Grant permissions** as needed

### PWA Installation:
1. **Open** todoodle in mobile browser
2. **Tap "Add to Home Screen"**
3. **Install** PWA
4. **Works offline** with service worker

---

## 🎉 Next Steps

1. **Choose your approach** (PWA + Capacitor recommended)
2. **Make app mobile-friendly** (touch, responsive)
3. **Add mobile features** (notifications, camera)
4. **Build APK** for distribution
5. **Test on real devices**

---

**Your Todoodle app will soon be available on Android phones!** 📱
