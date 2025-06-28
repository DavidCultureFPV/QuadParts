# How to Turn QuadParts (Vite/React) Into a Windows Executable (.exe)

This guide explains how to package your Vite/React app as a Windows desktop executable. The most common and robust way is to use **Electron**. Alternative methods are also listed.

---

## Method 1: Using Electron (Recommended)

Electron lets you run web apps as native desktop applications.

### Steps:

1. **Build your Vite app:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with your static files.

2. **Install Electron and required tools:**
   ```bash
   npm install --save-dev electron electron-builder
   ```

3. **Create an Electron main process file:**
   Create a file named `main.js` in your project root:
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

4. **Add Electron start/build scripts to `package.json`:**
   ```json
   "main": "main.js",
   "scripts": {
     "electron": "electron .",
     "electron:build": "electron-builder --win --x64"
   }
   ```

5. **Run your app in Electron:**
   ```bash
   npm run electron
   ```

6. **Build the Windows .exe installer:**
   ```bash
   npm run electron:build
   ```
   The output `.exe` will be in the `dist_electron` or `dist` folder (check your config).

---

## Method 2: Using Webview (Lightweight Alternative)

[Webview](https://webview.dev/) is a lightweight alternative to Electron.
- See [webview/webview-examples](https://github.com/webview/webview-examples) for templates.
- You will need to write a small Go or Rust wrapper to load your `dist/index.html`.

---

## Method 3: Package Node.js Server with `pkg` (Not for pure static apps)

If your app needs a Node.js backend, you can use [`pkg`](https://github.com/vercel/pkg) to create an .exe from a Node.js script.
- This is not recommended for pure static Vite/React apps.

---

## Notes
- Electron is the most popular and robust way to turn a web app into a Windows executable.
- You can customize the Electron window, add icons, splash screens, and more.
- For advanced configuration, see the [Electron Builder docs](https://www.electron.build/).

---

