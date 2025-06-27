# QuadParts - updated 06-26-2025 

Drone / FPV inventory application where you can keep track of your parts, builds, notes and more
---
![image](https://github.com/user-attachments/assets/4fb90958-0977-45b0-87c6-5324d1d288e9)


<BR>
Demo: https://fpv.builders/
---
<b>Notable Updates:</b>

  1. Added the liquid glass effect as seen on Iphones. demo page can be see at https://fpv.builders/liquid-demo or on your local machine at localhost:5173/liquid-demo
  2. Themes are now working and you have the option to to customize your own ( still working threw kinks on the "custom" theming)
  3. Distiguish if inventory items is "In Use" or "In Stock".
  4. Editing inventory item issues seen in previous versions is now fixed
  5.  Currency selection formatting fixed
  6.  Added A Flight Log Section so you can add relevant information about your flights rips
---
INSTALLING from Previous Versions:
FOR THOSE WHO'S UPGRADING FROM THE RELEASE ON 6/10/2025, PLEASE EXPORT YOUR DATA BEFORE INSTALLING THIS VERSION. ONCE YOU INSTALL THIS VERSION, PLEASE GO TO THE "SETTINGS" PAGE AND IMPORT YOUR DATA. IF ANY OF YOU INVENTORY ITEMS OR ITEMS IN ANY CATEGORY IS NOT PRESENT, PLEASE GO TO THE "SETTINGS" AND AND CLICK "MIGRATE<category-name> in the Data Management section. for example:
---
![image](https://github.com/user-attachments/assets/0bab302a-6785-447d-8ec1-a3846d9a4e66)
---
**First time user INSTALL Instructions- For New Users of QuadParts**
1. Clone this repo.
2. Ensure that you have Node installed on your development machine ( windows, linux or other)
   Follow the tutorial here to install the latest version of node https://www.geeksforgeeks.org/how-to-download-and-install-node-js-and-npm/

   After Node /NPM  is installed on your system, open up your terminal or command prompt screen and run the two commands below to deploy:
   
   <code>npm install  #installs dependencies</code>

   <code>npm run dev  #to deploy the code</code>

   **Note:** _If you want to be able to get to QuadParts from other devices on your network, run the command below_
   <code> npm run dev -- --host</code>
   <i> You might have to run the npm audit fix if prompted to do so. Dont worry the app wont break by doing so</i>

   On your local machine, pull up the browser and go to this address localhost:5173
   Note: All your personal exports can be modified on the official site fpv.builders if needed. just be sure to export your data once completed. 
---
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
