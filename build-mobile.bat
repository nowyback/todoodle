@echo off
echo Building Todoodle v0.9.0 for Android...
echo.
echo 1. Initialize Capacitor (if not done):
npm run capacitor:add
echo.
echo 2. Sync web files to Android:
npm run capacitor:sync
echo.
echo 3. Open Android Studio:
npm run capacitor:open
echo.
echo 4. In Android Studio: Build ^> Build Bundle(s) ^> Build APK(s)
echo.
echo Alternative - Build directly:
cordova build android
pause
