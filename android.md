# How to Turn QuadParts (Vite/React) Into an Android APK

This guide explains how to package your Vite/React app as an Android APK. The most common way is to use **Capacitor** (by the creators of Ionic), which wraps your web app in a native Android WebView. Alternatives like Cordova are also mentioned.

---

## Method 1: Using Capacitor (Recommended)

[Capacitor](https://capacitorjs.com/) lets you run web apps as native mobile apps.

### Steps:

1. **Build your Vite app:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with your static files.

2. **Install Capacitor:**
   ```bash
   npm install --save @capacitor/core @capacitor/cli
   npx cap init
   ```
   - App name: `QuadParts`
   - App ID: e.g. `com.example.quadparts`

3. **Add Android platform:**
   ```bash
   npx cap add android
   ```

4. **Copy your build to the native project:**
   ```bash
   npx cap copy
   ```

5. **Open the Android project in Android Studio:**
   ```bash
   npx cap open android
   ```
   - You can now run, build, and generate an APK using Android Studio's tools.

6. **Build the APK in Android Studio:**
   - Click "Build > Build Bundle(s) / APK(s) > Build APK(s)".
   - The APK will be in the `app/build/outputs/apk/` directory.

---

## Method 2: Using Cordova (Alternative)

[Cordova](https://cordova.apache.org/) is another tool for wrapping web apps as mobile apps.

### Steps:
1. **Install Cordova:**
   ```bash
   npm install -g cordova
   ```
2. **Create a Cordova project and copy your `dist` files into the `www` folder.**
3. **Add the Android platform:**
   ```bash
   cordova platform add android
   ```
4. **Build the APK:**
   ```bash
   cordova build android
   ```

---

## Method 3: Use a WebView Wrapper App

There are tools and templates (like [WebViewGold](https://www.webviewgold.com/)) that let you create an Android app from a URL or local files with minimal coding.
- These are commercial or template-based solutions.

---

## Notes
- For best results, test your app thoroughly on mobile devices.
- You can access native device features using Capacitor or Cordova plugins.
- For advanced configuration, see the [Capacitor docs](https://capacitorjs.com/docs) or [Cordova docs](https://cordova.apache.org/docs/).

--- 