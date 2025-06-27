# Drone Parts Inventory Management System

A comprehensive, modern web application for managing drone parts inventory, build projects, flight logs, and related resources. Built with React, TypeScript, and Tailwind CSS, featuring a Progressive Web App (PWA) design for cross-platform compatibility.

![Drone Parts Inventory](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa)

## 🚀 All the installation methods below is experimental and not fully tested. These methods below is intended for the more experienced user. Build using the instructions below at your own risk.

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd drone-parts-inventory
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
# or
yarn build
```

## 🌐 Web Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`
3. Follow the prompts to connect your repository

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### GitHub Pages
1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Deploy: `npm run deploy`

### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🪟 Windows Deployment

### Electron App
1. Install Electron: `npm install --save-dev electron electron-builder`
2. Create `electron/main.js`:
```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  
  win.loadFile('dist/index.html')
}

app.whenReady().then(createWindow)
```

3. Update `package.json`:
```json
{
  "main": "electron/main.js",
  "scripts": {
    "electron": "electron .",
    "build-electron": "npm run build && electron-builder"
  },
  "build": {
    "appId": "com.droneinventory.app",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "electron/**/*"
    ]
  }
}
```

### Windows Store App
1. Use PWA Builder (https://www.pwabuilder.com/)
2. Generate Windows app package
3. Submit to Microsoft Store

## 🐧 Linux Deployment

### AppImage
1. Install electron-builder: `npm install --save-dev electron-builder`
2. Configure in `package.json`:
```json
{
  "build": {
    "appId": "com.droneinventory.app",
    "linux": {
      "target": "AppImage",
      "category": "Utility"
    }
  }
}
```
3. Build: `npm run build-electron`

### Snap Package
1. Create `snap/snapcraft.yaml`:
```yaml
name: drone-inventory
version: '1.0'
summary: Drone Parts Inventory Management
description: Manage your drone parts collection

apps:
  drone-inventory:
    command: desktop-launch $SNAP/usr/bin/drone-inventory
    desktop: usr/share/applications/drone-inventory.desktop

parts:
  drone-inventory:
    source: .
    plugin: nodejs
    build-scripts:
      - npm run build
```

2. Build: `snapcraft`

### Flatpak
1. Create `flatpak/com.example.DroneInventory.yml`
2. Build: `flatpak-builder build com.example.DroneInventory.yml`

## 🤖 Android Deployment

### PWA Installation
1. Build the PWA: `npm run build`
2. Deploy to web server
3. Users can install via Chrome/Edge "Add to Home Screen"

### TWA (Trusted Web Activity)
1. Install Bubblewrap: `npm install -g @bubblewrap/cli`
2. Initialize: `bubblewrap init --manifest https://your-app-url/manifest.json`
3. Build: `bubblewrap build`

### React Native (Alternative)
1. Create new React Native project
2. Port React components to React Native
3. Use React Native WebView for web version
4. Build APK: `npx react-native run-android --variant=release`

## 📱 iOS Deployment

### PWA Installation
1. Deploy PWA to web server
2. Users install via Safari "Add to Home Screen"
3. Works offline with service worker

### React Native iOS
1. Use React Native port (see Android section)
2. Build: `npx react-native run-ios --configuration Release`
3. Archive for App Store distribution

## 🔧 Configuration

### Environment Variables
Create `.env` file:
```env
VITE_APP_TITLE=Drone Parts Inventory
VITE_APP_VERSION=1.0.0
VITE_API_URL=https://your-api-url.com
```

### PWA Configuration
Update `vite.config.ts` for PWA settings:
```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['icons/*.png'],
  manifest: {
    name: 'Drone Parts Inventory',
    short_name: 'DroneInv',
    description: 'Track and manage your drone parts inventory',
    theme_color: '#131419',
    background_color: '#131419',
    display: 'standalone',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})
```

## 📊 Data Management

### Local Storage
- All data is stored locally in browser localStorage
- No external database required
- Data persists between sessions

### Export/Import
- Export data to JSON format
- Import data from JSON files
- Backup and restore functionality

### Data Structure
```typescript
interface Part {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  location: string;
  description: string;
  imageUrls: string[];
  manufacturer?: string;
  modelNumber?: string;
  dateAdded: string;
  status: 'in-stock' | 'in-use';
  condition: 'new' | 'good' | 'fair' | 'poor' | 'broken' | 'needs-repair';
}
```

## 🎨 Customization

### Themes
- Light and dark mode support
- Customizable color schemes
- CSS custom properties for easy theming

### Styling
- Tailwind CSS utility classes
- Custom component library
- Responsive design patterns

### Icons
- Lucide React icon library
- Custom icon support
- Scalable vector graphics

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

## 📈 Performance

### Optimization Features
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Service worker for caching
- Tree shaking for smaller bundles

### Bundle Analysis
```bash
npm run build -- --analyze
```

## 🔒 Security

### Best Practices
- Content Security Policy (CSP)
- HTTPS enforcement
- Input validation and sanitization
- XSS protection

### PWA Security
- Service worker security
- Manifest validation
- Secure context requirements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Issues
- Report bugs via GitHub Issues
- Request features through GitHub Discussions
- Check existing issues before creating new ones

### Community
- Join our Discord server
- Follow us on Twitter
- Subscribe to our newsletter

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Complete inventory management system
- PWA support
- Cross-platform compatibility
- Offline functionality

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS team for the utility-first CSS framework
- Lucide team for the beautiful icons
- All contributors and users

---

**Made with ❤️ for the drone community** 

# QuadParts - Drone Parts Inventory

A modern, mobile-first web application for tracking and managing drone parts inventory. Built with React, TypeScript, and Tailwind CSS, featuring a beautiful liquid glass effect design.

## 🌟 Features

### Core Functionality
- **Inventory Management**: Track parts, quantities, prices, and locations
- **Category Organization**: Organize parts into custom categories and subcategories
- **Storage Locations**: Manage where parts are stored
- **Build Notes**: Document drone builds and modifications
- **Flight Log**: Record flight experiences and notes
- **Gallery**: Store and tag drone photos
- **Links**: Save useful drone-related links
- **Todo List**: Track tasks and maintenance items
- **Settings**: Customize app behavior and appearance

### Mobile-First Design
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets and smooth interactions
- **Mobile Navigation**: Collapsible sidebar with mobile menu
- **PWA Support**: Install as a native app on mobile devices
- **Offline Capability**: Works without internet connection
- **Safe Area Support**: Proper display on notched devices

### Visual Design
- **Liquid Glass Effect**: Beautiful translucent UI elements
- **Theme System**: Multiple color themes (Dark, Light, Midnight, Cyberpunk, Matrix, etc.)
- **Smooth Animations**: Fluid transitions and hover effects
- **Modern UI**: Clean, professional interface

## 📱 Mobile Optimizations

### Touch Interactions
- Minimum 44px touch targets for all interactive elements
- Smooth touch feedback and haptic responses
- Gesture support for common actions
- Prevented zoom on input focus (iOS)

### Performance
- Optimized images with responsive sizing
- Efficient caching strategies
- Lazy loading for better performance
- Service worker for offline functionality

### Mobile-Specific Features
- **Mobile Search**: Full-screen search overlay on mobile
- **Responsive Tables**: Horizontal scrolling for data tables
- **Mobile Cards**: Optimized card layouts for small screens
- **Safe Area Support**: Proper display on devices with notches
- **Pull-to-Refresh Prevention**: Better mobile UX

### PWA Features
- **App Installation**: Install as native app on mobile devices
- **Offline Support**: Core functionality works without internet
- **Push Notifications**: Stay updated with inventory alerts
- **Background Sync**: Sync data when connection is restored
- **App Shortcuts**: Quick access to common actions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quadparts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Desktop: http://localhost:5173
   - Mobile: Use your device's browser or scan QR code from dev tools

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📱 Mobile Usage

### Installing as PWA
1. Open the app in your mobile browser
2. Look for the "Add to Home Screen" option
3. Follow the prompts to install
4. The app will now work like a native application

### Mobile Navigation
- **Menu Button**: Tap the hamburger menu in the top-left
- **Search**: Tap the search icon for full-screen search
- **Quick Actions**: Use the dashboard quick action buttons
- **Swipe Gestures**: Navigate between sections with swipe

### Offline Usage
- The app caches essential data for offline use
- Add parts, edit inventory, and view data without internet
- Changes sync automatically when connection is restored

## 🎨 Themes

The app includes multiple themes that automatically adapt to mobile:

- **Dark**: Default dark theme with blue accents
- **Light**: Clean light theme with dark text
- **Midnight**: Deep green and blue theme
- **Cyberpunk**: High contrast yellow and black
- **Matrix**: Green terminal-style theme
- **Black & Orange**: Bold orange accents on black
- **Sunset**: Warm sunset colors
- **Summer**: Bright green and yellow theme

## 🔧 Configuration

### Settings
- **Low Stock Threshold**: Set minimum quantity alerts
- **Theme Selection**: Choose your preferred color scheme
- **Data Management**: Export/import inventory data
- **Backup**: Automatic and manual backup options

### Mobile Settings
- **Touch Sensitivity**: Adjust touch target sizes
- **Haptic Feedback**: Enable/disable vibration feedback
- **Offline Mode**: Configure offline behavior
- **Notifications**: Manage push notification preferences

## 📊 Data Management

### Import/Export
- **CSV Export**: Download inventory as CSV file
- **JSON Backup**: Complete data backup in JSON format
- **Import Support**: Restore from backup files
- **Cloud Sync**: Future feature for cloud storage

### Storage
- **Local Storage**: Data stored locally on device
- **IndexedDB**: Efficient client-side database
- **Service Worker**: Caching for offline access
- **Backup**: Automatic backup to prevent data loss

## 🛠️ Development

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand for global state
- **Routing**: React Router for navigation
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development

### Mobile Development
- **Responsive Design**: Mobile-first CSS approach
- **Touch Events**: Optimized touch handling
- **Performance**: Lazy loading and code splitting
- **Accessibility**: ARIA labels and keyboard navigation

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── store/         # Zustand state management
├── models/        # TypeScript type definitions
├── utils/         # Utility functions
└── index.css      # Global styles and mobile optimizations
```

## 📱 Mobile Testing

### Device Testing
- **iOS**: Safari on iPhone/iPad
- **Android**: Chrome on Android devices
- **Responsive**: Test on various screen sizes
- **Touch**: Verify touch interactions work properly

### Performance Testing
- **Lighthouse**: Run mobile performance audits
- **Network**: Test offline functionality
- **Storage**: Verify data persistence
- **Installation**: Test PWA installation process

## 🚀 Deployment

### Static Hosting
The app can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Deploy directly from repository
- **Firebase Hosting**: Google's hosting platform

### PWA Deployment
- Ensure HTTPS is enabled (required for PWA)
- Verify manifest.json is accessible
- Test service worker registration
- Validate offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

### Mobile Testing Checklist
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify touch interactions
- [ ] Check responsive design
- [ ] Test offline functionality
- [ ] Validate PWA installation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Code.Carter**: Original development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **React Community**: Amazing ecosystem and tools

---

**QuadParts** - Making drone inventory management beautiful and mobile-friendly! 🚁✨ 