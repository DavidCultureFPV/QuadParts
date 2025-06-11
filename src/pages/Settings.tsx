import React, { useState } from 'react';
import { useToaster } from '../components/ui/Toaster';
import { useThemeStore } from '../store/themeStore';
import { useInventoryStore } from '../store/inventoryStore';
import { useStorageLocationStore } from '../store/storageLocationStore';
import { useBuildStore } from '../store/buildStore';
import { useGalleryStore } from '../store/galleryStore';
import { useLinkStore } from '../store/linkStore';
import { useTodoStore } from '../store/todoStore';
import { Download, Upload, AlertTriangle } from 'lucide-react';

const Settings: React.FC = () => {
  const { addToast } = useToaster();
  const { theme, setTheme } = useThemeStore();
  
  // Get all current data from stores
  const { parts, categories } = useInventoryStore();
  const { locations } = useStorageLocationStore();
  const { builds } = useBuildStore();
  const { items: galleryItems } = useGalleryStore();
  const { links } = useLinkStore();
  const { todos } = useTodoStore();
  
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Mock settings
  const [settings, setSettings] = useState({
    lowStockThreshold: 3,
    defaultCategory: 'Uncategorized',
    currencyFormat: 'USD',
    backupLocation: 'Downloads',
    enableAutoBackup: true,
    autoBackupFrequency: '7',
  });
  
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name === 'theme') {
      // Handle theme change immediately
      console.log('Theme change requested:', value);
      setTheme(value);
      addToast('success', `Theme changed to ${value.charAt(0).toUpperCase() + value.slice(1)}`);
      return; // Don't update settings state for theme
    } else {
      setSettings({
        ...settings,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      });
    }
  };
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Settings saved successfully');
  };
  
  // Create comprehensive backup data with all current state
  const createBackupData = () => {
    const backupData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      appInfo: {
        name: 'Drone Parts Inventory',
        version: '1.0.0',
        description: 'Complete backup of all inventory data'
      },
      data: {
        // Inventory data
        parts: parts || [],
        categories: categories || [],
        
        // Storage locations
        storageLocations: locations || [],
        
        // Build notes
        builds: builds || [],
        
        // Gallery items
        galleryItems: galleryItems || [],
        
        // Links
        links: links || [],
        
        // Todo items
        todos: todos || [],
        
        // Application settings
        settings: {
          theme: theme || 'dark',
          lowStockThreshold: settings.lowStockThreshold,
          defaultCategory: settings.defaultCategory,
          currencyFormat: settings.currencyFormat,
          enableAutoBackup: settings.enableAutoBackup,
          autoBackupFrequency: settings.autoBackupFrequency,
        },
        
        // Metadata
        metadata: {
          totalParts: parts?.length || 0,
          totalCategories: categories?.length || 0,
          totalLocations: locations?.length || 0,
          totalBuilds: builds?.length || 0,
          totalGalleryItems: galleryItems?.length || 0,
          totalLinks: links?.length || 0,
          totalTodos: todos?.length || 0,
          exportDate: new Date().toISOString(),
          exportedBy: 'QuadParts Inventory System'
        }
      }
    };
    
    console.log('Creating backup with data:', backupData);
    return backupData;
  };
  
  // Enhanced backup download with multiple methods
  const handleBackupData = async () => {
    setBackupInProgress(true);
    
    try {
      const backupData = createBackupData();
      const dataStr = JSON.stringify(backupData, null, 2);
      
      // Create filename with current date and time
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD format
      const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS format
      const filename = `quadparts-backup-${dateStr}-${timeStr}.json`;
      
      console.log('Backup data size:', dataStr.length, 'characters');
      console.log('Filename:', filename);
      
      // Method 1: Try using the modern File System Access API if available
      if ('showSaveFilePicker' in window) {
        try {
          const fileHandle = await (window as any).showSaveFilePicker({
            suggestedName: filename,
            types: [{
              description: 'JSON backup files',
              accept: { 'application/json': ['.json'] }
            }]
          });
          
          const writable = await fileHandle.createWritable();
          await writable.write(dataStr);
          await writable.close();
          
          setBackupInProgress(false);
          addToast('success', `Backup saved successfully as "${filename}"!`);
          return;
        } catch (err: any) {
          if (err.name !== 'AbortError') {
            console.log('File System Access API failed:', err);
          }
          // User cancelled or API failed, fall back to traditional method
        }
      }
      
      // Method 2: Traditional blob download method
      const dataBlob = new Blob([dataStr], { 
        type: 'application/json;charset=utf-8' 
      });
      
      // Create download URL
      const url = URL.createObjectURL(dataBlob);
      
      // Create and trigger download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      
      // Add to DOM, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up the URL object
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
      setBackupInProgress(false);
      addToast('success', `Backup file "${filename}" downloaded successfully!`);
      
    } catch (error) {
      console.error('Backup error:', error);
      setBackupInProgress(false);
      addToast('error', 'Failed to create backup. Please try again or check your browser settings.');
    }
  };
  
  // Alternative backup method using data URI
  const handleBackupDataAlternative = () => {
    setBackupInProgress(true);
    
    try {
      const backupData = createBackupData();
      const dataStr = JSON.stringify(backupData, null, 2);
      
      // Create filename
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
      const filename = `quadparts-backup-${dateStr}-${timeStr}.json`;
      
      // Create data URI
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      // Create and trigger download
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        setBackupInProgress(false);
        addToast('success', `Backup file "${filename}" downloaded successfully!`);
      }, 500);
      
    } catch (error) {
      console.error('Alternative backup error:', error);
      setBackupInProgress(false);
      addToast('error', 'Failed to create backup. Please try again.');
    }
  };
  
  // Handle file selection for restore
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        addToast('error', 'Please select a valid JSON backup file');
        e.target.value = ''; // Clear the input
        return;
      }
      setSelectedFile(file);
      setShowRestoreConfirm(true);
    }
  };
  
  // Enhanced backup data validation
  const validateBackupData = (data: any): boolean => {
    console.log('Validating backup data:', data);
    
    if (!data || typeof data !== 'object') {
      console.error('Invalid backup data: not an object');
      return false;
    }
    
    if (!data.version || !data.timestamp || !data.data) {
      console.error('Invalid backup data: missing required fields');
      return false;
    }
    
    // Check for required data arrays
    const requiredFields = ['parts', 'categories', 'storageLocations', 'builds', 'galleryItems', 'links', 'todos'];
    const missingFields = requiredFields.filter(field => !Array.isArray(data.data[field]));
    
    if (missingFields.length > 0) {
      console.error('Invalid backup data: missing or invalid fields:', missingFields);
      return false;
    }
    
    console.log('Backup data validation passed');
    return true;
  };
  
  // Enhanced restore data functionality
  const handleRestoreData = async () => {
    if (!selectedFile) {
      addToast('error', 'No file selected');
      return;
    }
    
    setRestoreInProgress(true);
    
    try {
      const fileContent = await selectedFile.text();
      console.log('File content length:', fileContent.length);
      
      const backupData = JSON.parse(fileContent);
      console.log('Parsed backup data:', backupData);
      
      // Validate backup data
      if (!validateBackupData(backupData)) {
        throw new Error('Invalid backup file format or corrupted data');
      }
      
      // Restore data to localStorage with proper keys
      const dataToRestore = backupData.data;
      
      // Store each data type with the correct localStorage key
      if (dataToRestore.parts) {
        localStorage.setItem('droneParts', JSON.stringify(dataToRestore.parts));
        console.log('Restored parts:', dataToRestore.parts.length);
      }
      
      if (dataToRestore.categories) {
        localStorage.setItem('droneCategories', JSON.stringify(dataToRestore.categories));
        console.log('Restored categories:', dataToRestore.categories.length);
      }
      
      if (dataToRestore.storageLocations) {
        localStorage.setItem('storageLocations', JSON.stringify(dataToRestore.storageLocations));
        console.log('Restored storage locations:', dataToRestore.storageLocations.length);
      }
      
      if (dataToRestore.builds) {
        localStorage.setItem('droneBuilds', JSON.stringify(dataToRestore.builds));
        console.log('Restored builds:', dataToRestore.builds.length);
      }
      
      if (dataToRestore.galleryItems) {
        localStorage.setItem('galleryItems', JSON.stringify(dataToRestore.galleryItems));
        console.log('Restored gallery items:', dataToRestore.galleryItems.length);
      }
      
      if (dataToRestore.links) {
        localStorage.setItem('droneLinks', JSON.stringify(dataToRestore.links));
        console.log('Restored links:', dataToRestore.links.length);
      }
      
      if (dataToRestore.todos) {
        localStorage.setItem('droneTodos', JSON.stringify(dataToRestore.todos));
        console.log('Restored todos:', dataToRestore.todos.length);
      }
      
      // Restore theme and settings if available
      if (dataToRestore.settings?.theme) {
        localStorage.setItem('theme', dataToRestore.settings.theme);
        setTheme(dataToRestore.settings.theme);
        console.log('Restored theme:', dataToRestore.settings.theme);
      }
      
      // Update local settings state if available
      if (dataToRestore.settings) {
        setSettings(prev => ({
          ...prev,
          lowStockThreshold: dataToRestore.settings.lowStockThreshold || prev.lowStockThreshold,
          defaultCategory: dataToRestore.settings.defaultCategory || prev.defaultCategory,
          currencyFormat: dataToRestore.settings.currencyFormat || prev.currencyFormat,
          enableAutoBackup: dataToRestore.settings.enableAutoBackup ?? prev.enableAutoBackup,
          autoBackupFrequency: dataToRestore.settings.autoBackupFrequency || prev.autoBackupFrequency,
        }));
      }
      
      setTimeout(() => {
        setRestoreInProgress(false);
        setShowRestoreConfirm(false);
        setSelectedFile(null);
        
        // Clear the file input
        const fileInput = document.getElementById('restore-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        addToast('success', 'Data restored successfully! Please refresh the page to see your restored data.');
        
        // Suggest page refresh
        setTimeout(() => {
          if (window.confirm('Would you like to refresh the page now to load your restored data?')) {
            window.location.reload();
          }
        }, 2000);
      }, 2000);
      
    } catch (error) {
      console.error('Restore error:', error);
      setRestoreInProgress(false);
      addToast('error', `Failed to restore data: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your backup file and try again.`);
    }
  };
  
  // Calculate total items for backup info
  const getTotalItems = () => {
    return (parts?.length || 0) + 
           (categories?.length || 0) + 
           (locations?.length || 0) + 
           (builds?.length || 0) + 
           (galleryItems?.length || 0) + 
           (links?.length || 0) + 
           (todos?.length || 0);
  };
  
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <h2 className="text-2xl font-bold text-neutral-200">Settings</h2>
      
      <div className="bg-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Application Settings</h3>
        
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-neutral-300 mb-1">
                Low Stock Threshold
              </label>
              <input
                type="number"
                id="lowStockThreshold"
                name="lowStockThreshold"
                min="0"
                value={settings.lowStockThreshold}
                onChange={handleSettingChange}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Items with quantity below or equal to this threshold will show as "Low Stock"
              </p>
            </div>
            
            <div>
              <label htmlFor="defaultCategory" className="block text-sm font-medium text-neutral-300 mb-1">
                Default Category
              </label>
              <input
                type="text"
                id="defaultCategory"
                name="defaultCategory"
                value={settings.defaultCategory}
                onChange={handleSettingChange}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Default category for new parts
              </p>
            </div>
            
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-neutral-300 mb-1">
                Application Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={theme}
                onChange={handleSettingChange}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="midnight">Midnight Blue</option>
                <option value="cyberpunk">Cyberpunk</option>
                <option value="matrix">Matrix Green</option>
                <option value="blackOrange">Black & Orange</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="currencyFormat" className="block text-sm font-medium text-neutral-300 mb-1">
                Currency Format
              </label>
              <select
                id="currencyFormat"
                name="currencyFormat"
                value={settings.currencyFormat}
                onChange={handleSettingChange}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Data Management</h3>
        
        <div className="space-y-6">
          {/* Backup Section */}
          <div>
            <h4 className="text-md font-medium text-neutral-300 mb-2">Backup Data</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Download a complete backup of your inventory data including parts, categories, storage locations, builds, gallery items, links, and todos.
            </p>
            
            <div className="bg-neutral-700/50 rounded-lg p-4 mb-4">
              <h5 className="text-sm font-medium text-neutral-300 mb-2">Current Data Summary:</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-neutral-400">Parts:</span>
                  <span className="text-white ml-2">{parts?.length || 0}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Categories:</span>
                  <span className="text-white ml-2">{categories?.length || 0}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Locations:</span>
                  <span className="text-white ml-2">{locations?.length || 0}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Builds:</span>
                  <span className="text-white ml-2">{builds?.length || 0}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Gallery:</span>
                  <span className="text-white ml-2">{galleryItems?.length || 0}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Links:</span>
                  <span className="text-white ml-2">{links?.length || 0}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Todos:</span>
                  <span className="text-white ml-2">{todos?.length || 0}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Total:</span>
                  <span className="text-white ml-2 font-medium">{getTotalItems()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleBackupData}
                disabled={backupInProgress}
                className="flex items-center gap-2 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                {backupInProgress ? 'Creating Backup...' : 'Download Backup'}
              </button>
              
              <button
                onClick={handleBackupDataAlternative}
                disabled={backupInProgress}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Download size={14} />
                {backupInProgress ? 'Creating...' : 'Alternative Download'}
              </button>
            </div>
            
            <p className="text-xs text-neutral-500 mt-2">
              If the main download doesn't work, try the alternative download method or check your browser's download settings.
            </p>
          </div>
          
          {/* Restore Section */}
          <div className="border-t border-neutral-700 pt-6">
            <h4 className="text-md font-medium text-neutral-300 mb-2">Restore Data</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Restore your inventory data from a previously downloaded backup file. This will replace all current data.
            </p>
            
            <div className="flex items-center gap-4 mb-4">
              <input
                type="file"
                id="restore-file"
                accept=".json,application/json"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="restore-file"
                className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                <Upload size={16} />
                Choose Backup File
              </label>
              
              {selectedFile && (
                <div className="text-sm text-neutral-300">
                  Selected: {selectedFile.name}
                </div>
              )}
            </div>
            
            <div className="bg-yellow-900/30 border border-yellow-800/50 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-yellow-400 text-sm">
                  <strong>Warning:</strong> Restoring data will completely replace all your current inventory data including parts, categories, storage locations, builds, gallery items, links, and todos. This action cannot be undone.
                </div>
              </div>
            </div>
          </div>
          
          {/* Clear Data Section */}
          <div className="border-t border-neutral-700 pt-6">
            <h4 className="text-md font-medium text-red-400">Danger Zone</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Permanently delete all inventory data. This action cannot be undone.
            </p>
            <button
              onClick={() => {
                addToast('error', 'This feature is disabled in the demo version');
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
      
      {/* Restore Confirmation Modal */}
      {showRestoreConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in">
            <h3 className="text-lg font-medium text-white mb-4">Confirm Data Restore</h3>
            
            <div className="bg-yellow-900/30 border border-yellow-800/50 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-yellow-400 text-sm">
                  This will replace all your current data with the backup file. Make sure you have a current backup if you want to keep your existing data.
                </div>
              </div>
            </div>
            
            {selectedFile && (
              <div className="bg-neutral-700/50 rounded-lg p-3 mb-4">
                <div className="text-sm">
                  <div className="text-neutral-400">File:</div>
                  <div className="text-white font-medium">{selectedFile.name}</div>
                  <div className="text-neutral-400 mt-1">Size:</div>
                  <div className="text-white">{(selectedFile.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowRestoreConfirm(false);
                  setSelectedFile(null);
                  // Clear the file input
                  const fileInput = document.getElementById('restore-file') as HTMLInputElement;
                  if (fileInput) fileInput.value = '';
                }}
                disabled={restoreInProgress}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRestoreData}
                disabled={restoreInProgress}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {restoreInProgress ? 'Restoring...' : 'Restore Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;