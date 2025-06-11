# QuadParts - updated 06-10-2025 

Drone / FPV inventory application where you can keep track of your parts, builds, notes and more

![quadparts06102025](https://github.com/user-attachments/assets/e92889c4-d31a-459c-9575-65d1cc65e361)
---

INSTALLING:
1. Clone this repo.
2. Ensure that you have Node installed on your development machine ( windows, linux or other)
   Follow the tutorial here to install the latest version of node https://www.geeksforgeeks.org/how-to-download-and-install-node-js-and-npm/

   After Node /NPM  is installed on your system, open up your terminal or command prompt screen and run the two commands below to deploy:
   
   <code>npm install  #installs dependencies</code>

   <code>npm run dev  #to deploy the code</code>
   <i> You might have to run the npm audit fix if prompted to do so. Dont worry the app wont break by doing so</i>

   On your local machine, pull up the browser and go to this address localhost:5173
---
   <b>Note:</b> If the new version does not show up in your browser, you might have to clear your browser cache.
    Unfortunately by doing so you might loose your data if you installed the initial version released before 6/10/2025.
    From here on out, before upgrading, you now have the ability to export your data prior and import your data into
    any future versions.
---
   <b>Notable Changes: 06 10 2025</b>
   1. Added the ability to export/import your data. This function also works with the demo site so if you happen to have a copy of your
   exported data on your phone or pc, you can simpy upload your file to the demo site and modify your data anywhere. you will find this feature
   in the settings section.
   3. Added "Storage locations" section for inventory items so you can add where items are stored physically. Dropdown also available when adding
      new inventory items.
   4. Fixed category issues in the inventory section. Now a dropdown will be seen with all available categories.
   5. Fixed the inventory search function
---
   To DO:
   I plan on releasing android, windows and linux standalone versions of this app as well. 
  Currently working on the docker-compose version of this app.
---

   Alternate Project Soon: Currently working on a client/ server variation of this app. 

Demo: https://fpv.builders/
