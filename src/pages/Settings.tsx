import React, { useState } from 'react';
import { useToaster } from '../components/ui/Toaster';
import { useThemeStore } from '../store/themeStore';

const Settings: React.FC = () => {
  const { addToast } = useToaster();
  const { theme, setTheme } = useThemeStore();
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);
  
  // Mock settings
  const [settings, setSettings] = useState({
    lowStockThreshold: 3,
    defaultCategory: 'Uncategorized',
    currencyFormat: 'USD',
    backupLocation: 'C:\\DroneInventory\\Backups',
    enableAutoBackup: true,
    autoBackupFrequency: '7',
  });
  
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name === 'theme') {
      setTheme(value);
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
  
  const handleBackupData = () => {
    setBackupInProgress(true);
    setTimeout(() => {
      setBackupInProgress(false);
      addToast('success', 'Data backup completed successfully');
    }, 2000);
  };
  
  const handleRestoreData = () => {
    setRestoreInProgress(true);
    setTimeout(() => {
      setRestoreInProgress(false);
      addToast('success', 'Data restored successfully');
    }, 2000);
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
                <option value="system">Use System Setting</option>
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
          
          <div className="border-t border-neutral-700 pt-4">
            <h4 className="text-md font-medium text-white mb-3">Backup Settings</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="backupLocation" className="block text-sm font-medium text-neutral-300 mb-1">
                  Backup Location
                </label>
                <input
                  type="text"
                  id="backupLocation"
                  name="backupLocation"
                  value={settings.backupLocation}
                  onChange={handleSettingChange}
                  className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="enableAutoBackup"
                    name="enableAutoBackup"
                    checked={settings.enableAutoBackup}
                    onChange={handleSettingChange}
                    className="mr-2"
                  />
                  <label htmlFor="enableAutoBackup" className="text-sm font-medium text-neutral-300">
                    Enable Automatic Backup
                  </label>
                </div>
                
                {settings.enableAutoBackup && (
                  <div className="flex items-center">
                    <span className="text-sm text-neutral-400 mr-2">Every</span>
                    <select
                      id="autoBackupFrequency"
                      name="autoBackupFrequency"
                      value={settings.autoBackupFrequency}
                      onChange={handleSettingChange}
                      className="px-2 py-1 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="1">1</option>
                      <option value="7">7</option>
                      <option value="14">14</option>
                      <option value="30">30</option>
                    </select>
                    <span className="text-sm text-neutral-400 ml-2">days</span>
                  </div>
                )}
              </div>
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
        
        <div className="space-y-4">
          <div>
            <h4 className="text-md font-medium text-neutral-300">Backup Data</h4>
            <p className="text-neutral-400 text-sm mb-2">
              Create a backup of your inventory data that can be restored later.
            </p>
            <button
              onClick={handleBackupData}
              disabled={backupInProgress}
              className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {backupInProgress ? 'Backing up...' : 'Backup Now'}
            </button>
          </div>
          
          <div className="border-t border-neutral-700 pt-4">
            <h4 className="text-md font-medium text-neutral-300">Restore Data</h4>
            <p className="text-neutral-400 text-sm mb-2">
              Restore your inventory data from a previous backup.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="restore-file"
                accept=".json"
                className="hidden"
              />
              <label
                htmlFor="restore-file"
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Choose Backup File
              </label>
              <button
                onClick={handleRestoreData}
                disabled={restoreInProgress}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {restoreInProgress ? 'Restoring...' : 'Restore'}
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Warning: Restoring data will overwrite your current inventory.
            </p>
          </div>
          
          <div className="border-t border-neutral-700 pt-4">
            <h4 className="text-md font-medium text-red-400">Danger Zone</h4>
            <p className="text-neutral-400 text-sm mb-2">
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
    </div>
  );
};

export default Settings;