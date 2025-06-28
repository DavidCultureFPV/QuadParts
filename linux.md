# How to Package QuadParts (Vite/React) as a Linux .deb and AppImage

This guide explains how to turn your Vite/React app into a Linux desktop application, packaged as a `.deb` (Debian/Ubuntu) and an AppImage (portable Linux app). The recommended approach is to use **Electron** and **electron-builder**.

---

## Prerequisites
- Node.js and npm installed
- Your Vite/React app builds successfully (`npm run build`)
- Linux system or WSL/VM for building

---

## 1. Prepare Your App for Electron

1. **Build your Vite app:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with your static files.

2. **Install Electron and electron-builder:**
   ```bash
   npm install --save-dev electron electron-builder
   ```

3. **Create an Electron main process file (`main.js`):**
   ```js
   const { app, BrowserWindow } = require('electron');
   const path = require('path');

   function createWindow() {
     const win = new BrowserWindow({
       width: 1200,
       height: 800,
       webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
       },
     });
     win.loadFile(path.join(__dirname, 'dist/index.html'));
   }

   app.whenReady().then(createWindow);
   app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') app.quit();
   });
   ```

4. **Update your `package.json`:**
   Add or update these fields:
   ```json
   "main": "main.js",
   "build": {
     "appId": "com.example.quadparts",
     "productName": "QuadParts",
     "files": [
       "dist/**/*",
       "main.js"
     ],
     "linux": {
       "target": ["deb", "AppImage"],
       "category": "Utility"
     }
   },
   "scripts": {
     "electron": "electron .",
     "electron:build": "electron-builder --linux"
   }
   ```

---

## 2. Build .deb and AppImage Packages

Run:
```bash
npm run electron:build
```
- This will generate `.deb` and `.AppImage` files in the `dist/` or `dist_electron/` directory.

---

## 3. Test and Distribute
- Test the generated files on a Linux system.
- `.deb` can be installed on Debian/Ubuntu with:
  ```bash
  sudo dpkg -i QuadParts*.deb
  ```
- `.AppImage` is portable; make it executable and run:
  ```bash
  chmod +x QuadParts*.AppImage
  ./QuadParts*.AppImage
  ```

---

## Notes
- You can customize icons, metadata, and more in the `build` section of `package.json`.
- For advanced options, see the [electron-builder Linux docs](https://www.electron.build/configuration/linux).
- You can also build on Windows/macOS, but cross-compiling for Linux may require extra setup (see electron-builder docs).

--- 