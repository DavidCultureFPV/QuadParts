import React, { useState } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { Plus, Edit, Trash2, ChevronRight, Package } from 'lucide-react';
import { Category, Subcategory } from '../models/types';
import { useToaster } from '../components/ui/Toaster';

const Categories: React.FC = () => {
  const { categories, parts, addCategory, updateCategory, deleteCategory, addSubcategory, deleteSubcategory } = useInventoryStore();
  const { addToast } = useToaster();
  
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#3B82F6' });
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newSubcategory, setNewSubcategory] = useState({ name: '', description: '', categoryId: '' });
  const [showNewSubcategoryForm, setShowNewSubcategoryForm] = useState(false);
  
  // Toggle category expansion
  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  // Submit new category
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      addToast('error', 'Category name is required');
      return;
    }
    
    addCategory({
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color
    });
    
    setNewCategory({ name: '', description: '', color: '#3B82F6' });
    setShowNewCategoryForm(false);
    addToast('success', `Category "${newCategory.name}" created successfully`);
  };
  
  // Submit new subcategory
  const handleSubcategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubcategory.name.trim() || !newSubcategory.categoryId) {
      addToast('error', 'Subcategory name and parent category are required');
      return;
    }
    
    addSubcategory(
      newSubcategory.categoryId,
      newSubcategory.name,
      newSubcategory.description
    );
    
    setNewSubcategory({ name: '', description: '', categoryId: '' });
    setShowNewSubcategoryForm(false);
    addToast('success', `Subcategory "${newSubcategory.name}" created successfully`);
  };
  
  // Delete a category
  const handleDeleteCategory = (category: Category) => {
    // Check if parts are using this category
    const partsUsingCategory = parts.filter(part => part.category === category.name);
    
    if (partsUsingCategory.length > 0) {
      addToast('error', `Cannot delete category "${category.name}" because it's in use by ${partsUsingCategory.length} parts`);
      return;
    }
    
    deleteCategory(category.id);
    addToast('success', `Category "${category.name}" deleted successfully`);
  };
  
  // Delete a subcategory
  const handleDeleteSubcategory = (categoryId: string, subcategory: Subcategory) => {
    // Check if parts are using this subcategory
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const partsUsingSubcategory = parts.filter(
      part => part.category === category.name && part.subcategory === subcategory.name
    );
    
    if (partsUsingSubcategory.length > 0) {
      addToast('error', `Cannot delete subcategory "${subcategory.name}" because it's in use by ${partsUsingSubcategory.length} parts`);
      return;
    }
    
    deleteSubcategory(categoryId, subcategory.id);
    addToast('success', `Subcategory "${subcategory.name}" deleted successfully`);
  };
  
  // Count parts in category and subcategories
  const countPartsInCategory = (categoryName: string, subcategoryName?: string) => {
    if (subcategoryName) {
      return parts.filter(
        part => part.category === categoryName && part.subcategory === subcategoryName
      ).length;
    }
    
    return parts.filter(part => part.category === categoryName).length;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-200">Categories</h2>
          <p className="text-neutral-400">Organize your drone parts by category</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setShowNewSubcategoryForm(false);
              setShowNewCategoryForm(!showNewCategoryForm);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span>New Category</span>
          </button>
          
          <button
            onClick={() => {
              setShowNewCategoryForm(false);
              setShowNewSubcategoryForm(!showNewSubcategoryForm);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span>New Subcategory</span>
          </button>
        </div>
      </div>
      
      {/* New Category Form */}
      {showNewCategoryForm && (
        <div className="bg-neutral-800 p-4 rounded-lg shadow-lg animate-fade-in">
          <h3 className="text-lg font-medium text-white mb-4">Add New Category</h3>
          
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Category name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Category description (optional)"
                rows={2}
              />
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-neutral-300 mb-1">
                Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="h-10 w-10 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-32 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="#RRGGBB"
                  pattern="^#([A-Fa-f0-9]{6})$"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewCategoryForm(false)}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* New Subcategory Form */}
      {showNewSubcategoryForm && (
        <div className="bg-neutral-800 p-4 rounded-lg shadow-lg animate-fade-in">
          <h3 className="text-lg font-medium text-white mb-4">Add New Subcategory</h3>
          
          <form onSubmit={handleSubcategorySubmit} className="space-y-4">
            <div>
              <label htmlFor="parent-category" className="block text-sm font-medium text-neutral-300 mb-1">
                Parent Category *
              </label>
              <select
                id="parent-category"
                value={newSubcategory.categoryId}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, categoryId: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select a parent category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="subcategory-name" className="block text-sm font-medium text-neutral-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="subcategory-name"
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Subcategory name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subcategory-description" className="block text-sm font-medium text-neutral-300 mb-1">
                Description
              </label>
              <textarea
                id="subcategory-description"
                value={newSubcategory.description}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Subcategory description (optional)"
                rows={2}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewSubcategoryForm(false)}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors"
              >
                Create Subcategory
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Categories List */}
      <div className="bg-neutral-800 rounded-lg overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 text-center">
            <Package size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-xl font-medium text-neutral-300 mb-2">No categories yet</h3>
            <p className="text-neutral-400 max-w-md mx-auto">
              Create categories to organize your drone parts and make them easier to find.
            </p>
            <button
              onClick={() => setShowNewCategoryForm(true)}
              className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Add Your First Category
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-neutral-700 py-3 px-4 bg-neutral-700/50">
              <div className="grid grid-cols-12 text-sm text-neutral-400">
                <div className="col-span-5">Name</div>
                <div className="col-span-3">Parts Count</div>
                <div className="col-span-2">Color</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>
            
            <div className="divide-y divide-neutral-700">
              {categories.map(category => (
                <div key={category.id} className="py-1">
                  <div 
                    className="grid grid-cols-12 items-center py-3 px-4 hover:bg-neutral-700/30 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(category.id)}
                  >
                    <div className="col-span-5 flex items-center space-x-2">
                      <ChevronRight
                        size={18}
                        className={`text-neutral-500 transition-transform ${
                          expandedCategories.includes(category.id) ? 'rotate-90' : ''
                        }`}
                      />
                      <span className="font-medium text-white">{category.name}</span>
                      {category.description && (
                        <span className="text-neutral-400 text-sm truncate">
                          - {category.description}
                        </span>
                      )}
                    </div>
                    <div className="col-span-3 text-neutral-300">
                      {countPartsInCategory(category.name)} parts
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div
                        className="w-5 h-5 rounded mr-2"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-neutral-400 text-sm">{category.color}</span>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit category logic here
                        }}
                        className="p-1.5 bg-neutral-700 hover:bg-neutral-600 rounded text-white transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category);
                        }}
                        className="p-1.5 bg-red-500/80 hover:bg-red-600 rounded text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Subcategories */}
                  {expandedCategories.includes(category.id) && category.subcategories.length > 0 && (
                    <div className="bg-neutral-800 border-t border-neutral-700 animate-fade-in">
                      {category.subcategories.map(subcategory => (
                        <div 
                          key={subcategory.id}
                          className="grid grid-cols-12 items-center py-2 px-4 pl-10 hover:bg-neutral-700/30 transition-colors"
                        >
                          <div className="col-span-5 flex items-center space-x-2">
                            <span className="text-neutral-300">{subcategory.name}</span>
                            {subcategory.description && (
                              <span className="text-neutral-500 text-sm truncate">
                                - {subcategory.description}
                              </span>
                            )}
                          </div>
                          <div className="col-span-3 text-neutral-400 text-sm">
                            {countPartsInCategory(category.name, subcategory.name)} parts
                          </div>
                          <div className="col-span-2"></div>
                          <div className="col-span-2 flex justify-end space-x-2">
                            <button
                              onClick={() => {
                                // Edit subcategory logic here
                              }}
                              className="p-1.5 bg-neutral-700 hover:bg-neutral-600 rounded text-white transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteSubcategory(category.id, subcategory)}
                              className="p-1.5 bg-red-500/80 hover:bg-red-600 rounded text-white transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div 
                        className="py-2 px-4 pl-10 text-primary-400 hover:text-primary-300 hover:bg-neutral-700/30 transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewSubcategory({ 
                            name: '', 
                            description: '', 
                            categoryId: category.id 
                          });
                          setShowNewSubcategoryForm(true);
                        }}
                      >
                        <div className="flex items-center">
                          <Plus size={16} className="mr-2" />
                          <span>Add subcategory</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;