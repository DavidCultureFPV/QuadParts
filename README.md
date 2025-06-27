# QuadParts - updated 06-26-2025 

Drone / FPV inventory application where you can keep track of your parts, builds, notes and more
<BR>

![Drone Parts Inventory](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa)
### 📦 App Features
- **Complete Parts Tracking**: Add, edit, and delete drone parts with detailed information
- **Multi-Image Support**: Upload and manage multiple images per part
- **Advanced Filtering**: Filter by category, status, condition, and search terms
- **Stock Management**: Track quantities, in-use items, and low stock alerts
- **Condition Tracking**: Monitor part conditions (new, good, fair, poor, broken, needs-repair)
- **Price Tracking**: Monitor inventory value and individual part costs
- **Grid & List Views**: Flexible viewing options for different preferences
- **Plus much more...
---
![image](https://github.com/user-attachments/assets/73340e88-a524-4f4d-9b30-5d2abfee0017)



<BR>
Demo: https://fpv.builders/


---
<b>Notable Updates:</b>

  1. Added the liquid glass effect as seen on Iphones. demo page can be see at https://fpv.builders/liquid-demo or on your local machine at http://localhost:5173/liquid-demo
  2. Themes are now working and you have the option to to customize your own ( still working threw kinks on the "custom" theming)
  3. Distiguish if inventory items is "In Use" or "In Stock".
  4. Editing inventory item issues seen in previous versions is now fixed
  5.  Currency selection formatting fixed
  6.  Added A Flight Log Section so you can add relevant information about your flights rips
  7.  Other minor tweaks to the UI along with better local storage management.
---
INSTALLING from Previous Versions:
<BR>
FOR THOSE WHO'S UPGRADING FROM THE RELEASE ON 6/10/2025, PLEASE EXPORT YOUR DATA BEFORE INSTALLING THIS VERSION. ONCE YOU INSTALL THIS VERSION, PLEASE GO TO THE "SETTINGS" PAGE AND IMPORT YOUR DATA. IF ANY OF YOU INVENTORY ITEMS OR ITEMS IN ANY CATEGORY IS NOT PRESENT, PLEASE GO TO THE "SETTINGS" AND AND CLICK "MIGRATE<category-name> in the Data Management section. for example:
---
![image](https://github.com/user-attachments/assets/0bab302a-6785-447d-8ec1-a3846d9a4e66)
---
**First time user INSTALL Instructions- For New Users of QuadParts**
<BR>
1. Clone this repo. unzip the file. 
2. Ensure that you have Node installed on your development machine ( windows, linux or other)
   Follow the tutorial here to install the latest version of node https://www.geeksforgeeks.org/how-to-download-and-install-node-js-and-npm/

   After Node /NPM  is installed on your system, open up your terminal  or command prompt screen and run the two commands below to deploy:
   
   <code>npm install  #installs dependencies</code>

   <code>npm run dev  #to deploy the code</code>
   <BR>
_above commands needs to be ran from from within the QuadParts folder. terminal-->cd /where/you/have/quadparts/unzipped_
   **Note:** _If you want to be able to get to QuadParts from other devices on your network, run the command below_
   <code> npm run dev -- --host</code> _(note: your data from the host wont be seen on the network client. export from the host and load on the client. currently working on fixing this issue for the next version. )_
   <i> You might have to run the npm audit fix if prompted to do so. Dont worry the app wont break by doing so</i>

   On your local machine, pull up the browser and go to this address localhost:5173
   Note: All your personal exports can be modified on the official site fpv.builders if needed. just be sure to export your data once completed. 
---
Alternate installations methods-Advanced- https://github.com/hasmeni/QuadParts/blob/main/Alternate_install_methods.md
   <b>Note:</b> If the new version does not show up in your browser, you might have to clear your browser cache.
    Unfortunately by doing so you might loose your data if you installed the initial version released before 6/10/2025.
    For all others, who installed the version after 6/10/2025, simply export your data from the settings page, and import your complete date into this version 6/26/2025.
   
---
   <b> Previous Notable Changes: 06 10 2025</b>
   1. Added the ability to export/import your data. This function also works with the demo site so if you happen to have a copy of your
   exported data on your phone or pc, you can simpy upload your file to the demo site and modify your data anywhere. you will find this feature
   in the settings section.
   3. Added "Storage locations" section for inventory items so you can add where items are stored physically. Dropdown also available when adding
      new inventory items.
   4. Fixed category issues in the inventory section. Now a dropdown will be seen with all available categories.
   5. Fixed the inventory search function
---
   To DO:
   Making Progress with the Android Implementation of this app. Also the Docker version should be released next week.... hopefully :) .
---

   Alternate Project Soon: Currently working on a client/ server variation of this app. 

Demo: https://fpv.builders/
---
<BR>
<b>FULL APP FEATURE SET</b>
### 🏷️ Categories & Organization
- **Hierarchical Categories**: Create main categories with subcategories
- **Custom Colors & Icons**: Visual organization with color-coded categories
- **Flexible Classification**: Organize parts by type, manufacturer, or custom criteria

### 📍 Storage Locations
- **Location Management**: Track where parts are stored (shelves, drawers, boxes, etc.)
- **Capacity Tracking**: Monitor storage capacity and current usage
- **Smart Organization**: Keep inventory organized across multiple storage areas

### 🔧 Build Projects
- **Build Notes**: Document drone builds with detailed notes and progress tracking
- **Parts Integration**: Link parts to specific builds and track usage
- **Progress Tracking**: Monitor build status (planning, in-progress, completed, archived)
- **Cost Calculation**: Track total build costs and individual part expenses
- **Image Documentation**: Add multiple images to document build progress
- **Specifications**: Record technical specifications for each build

### 📊 Dashboard & Analytics
- **Real-time Statistics**: View total parts, inventory value, and low stock alerts
- **Quick Overview**: See recent parts, pending tasks, and important metrics
- **Visual Indicators**: Color-coded status indicators and progress bars
- **Export Capabilities**: Export data in various formats

### ✅ Task Management
- **Todo Lists**: Create and manage tasks related to drone projects
- **Priority Levels**: Set high, medium, or low priority for tasks
- **Due Dates**: Track task deadlines and completion dates
- **Part Integration**: Link tasks to specific parts or builds

### 📸 Gallery
- **Image Management**: Organize drone photos and project images
- **Tagging System**: Add tags for easy categorization and search
- **Detailed Viewing**: Full-screen image viewing with metadata
- **Specifications**: Store technical details with gallery items

### 🔗 Resource Links
- **Bookmark Management**: Save useful websites, YouTube videos, and resources
- **Categorization**: Organize links by type (website, YouTube, blog, store, other)
- **Favorites System**: Mark important links for quick access
- **Visit Tracking**: Monitor when links were last visited

### ✈️ Flight Log
- **Flight Recording**: Log flight details including date, location, and duration
- **Issue Tracking**: Document problems encountered during flights
- **Drone Tracking**: Associate flights with specific drones
- **Export Functionality**: Export flight logs to CSV format
- **Search & Filter**: Find specific flights by various criteria

### ⚙️ Settings & Customization
- **Theme Support**: Light and dark mode with customizable themes
- **Data Management**: Import/export functionality for data backup
- **User Preferences**: Customize application behavior and appearance
- **System Configuration**: Adjust application settings and defaults

### 📱 Progressive Web App (PWA)
- **Offline Support**: Access core features without internet connection
- **App-like Experience**: Install as a native app on supported devices
- **Push Notifications**: Get alerts for low stock and important updates
- **Responsive Design**: Optimized for all screen sizes and devices

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 with TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.1 with custom design system
- **State Management**: Zustand for lightweight state management
- **Routing**: React Router DOM 6.22.3
- **Build Tool**: Vite 6.3.5 for fast development and building
- **PWA**: Vite PWA plugin with service worker support
- **Icons**: Lucide React for consistent iconography
- **Linting**: ESLint with TypeScript and React rules

