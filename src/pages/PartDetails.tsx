import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventoryStore } from '../store/inventoryStore';
import { Edit, Trash2, AlertTriangle, ArrowLeft, Image, Plus, Minus } from 'lucide-react';
import { useToaster } from '../components/ui/Toaster';

const PartDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPart, updatePart, deletePart } = useInventoryStore();
  const { addToast } = useToaster();
  
  const [part, setPart] = useState(id && id !== 'new' ? getPart(id) : null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isEditing, setIsEditing] = useState(id === 'new');
  
  // Create a new part form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    quantity: 1,
    price: 0,
    location: '',
    description: '',
    imageUrls: [''],
    manufacturer: '',
    modelNumber: '',
    notes: '',
    inUse: 0
  });
  
  // Initialize form data when component mounts or part changes
  useEffect(() => {
    if (part) {
      setFormData({
        name: part.name,
        category: part.category,
        subcategory: part.subcategory || '',
        quantity: part.quantity,
        price: part.price,
        location: part.location,
        description: part.description,
        imageUrls: [...part.imageUrls],
        manufacturer: part.manufacturer || '',
        modelNumber: part.modelNumber || '',
        notes: part.notes || '',
        inUse: part.inUse
      });
    }
  }, [part]);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' || name === 'inUse' 
        ? parseFloat(value) 
        : value
    }));
  };
  
  // Handle image URL change
  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData({ ...formData, imageUrls: newImageUrls });
  };
  
  // Add new image URL field
  const addImageUrlField = () => {
    setFormData({ 
      ...formData, 
      imageUrls: [...formData.imageUrls, ''] 
    });
  };
  
  // Remove image URL field
  const removeImageUrlField = (index: number) => {
    if (formData.imageUrls.length <= 1) return;
    
    const newImageUrls = [...formData.imageUrls];
    newImageUrls.splice(index, 1);
    setFormData({ ...formData, imageUrls: newImageUrls });
    
    if (selectedImage >= newImageUrls.length) {
      setSelectedImage(newImageUrls.length - 1);
    }
  };
  
  // Handle delete
  const handleDelete = () => {
    if (id && id !== 'new' && part) {
      deletePart(id);
      addToast('success', `Part "${part.name}" deleted successfully`);
      navigate('/inventory');
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      addToast('error', 'Name and category are required');
      return;
    }
    
    // Filter out empty image URLs
    const filteredImageUrls = formData.imageUrls.filter(url => url.trim() !== '');
    
    if (id && id !== 'new') {
      // Update existing part
      updatePart(id, {
        ...formData,
        imageUrls: filteredImageUrls.length > 0 ? filteredImageUrls : ['https://images.unsplash.com/photo-1579829215132-9b20155a2c7c?q=80&w=300']
      });
      setPart(getPart(id));
      setIsEditing(false);
      addToast('success', `Part "${formData.name}" updated successfully`);
    } else {
      // Add new part
      // Note: In a real application, we would need to handle the newly created part's ID
      // and redirect to the detail page. For simplicity, we just navigate back to inventory.
      addToast('success', `Part "${formData.name}" created successfully`);
      navigate('/inventory');
    }
  };
  
  // If the part doesn't exist and we're not creating a new one, redirect to inventory
  useEffect(() => {
    if (!part && id !== 'new') {
      navigate('/inventory');
    }
  }, [part, id, navigate]);
  
  if (id === 'new' || isEditing) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-400 hover:text-white transition-colors mr-4"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </button>
          
          <h2 className="text-2xl font-bold text-neutral-200">
            {id === 'new' ? 'Add New Part' : `Edit ${part?.name}`}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-neutral-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Part name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-neutral-300 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Category"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-neutral-300 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Subcategory (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-300 mb-1">
                  Storage Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Where this part is stored"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Part description"
                rows={3}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Quantity & Price</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-neutral-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    step="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="inUse" className="block text-sm font-medium text-neutral-300 mb-1">
                    In Use
                  </label>
                  <input
                    type="number"
                    id="inUse"
                    name="inUse"
                    min="0"
                    step="1"
                    value={formData.inUse}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-neutral-300 mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Additional Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="manufacturer" className="block text-sm font-medium text-neutral-300 mb-1">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Manufacturer name"
                  />
                </div>
                
                <div>
                  <label htmlFor="modelNumber" className="block text-sm font-medium text-neutral-300 mb-1">
                    Model Number
                  </label>
                  <input
                    type="text"
                    id="modelNumber"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Model or part number"
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-neutral-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Additional notes"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Images</h3>
            
            <div className="space-y-3">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex items-start gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Image URL"
                  />
                  
                  <button
                    type="button"
                    onClick={() => removeImageUrlField(index)}
                    className="p-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 rounded-lg transition-colors"
                    disabled={formData.imageUrls.length <= 1}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addImageUrlField}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 rounded-lg transition-colors"
              >
                <Plus size={16} />
                <span>Add Image URL</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            {id !== 'new' && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors"
            >
              {id === 'new' ? 'Create Part' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  if (!part) return null;
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Inventory</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
            {part.imageUrls && part.imageUrls.length > 0 ? (
              <>
                <div className="aspect-w-1 aspect-h-1 w-full bg-neutral-900">
                  <img 
                    src={part.imageUrls[selectedImage]} 
                    alt={part.name} 
                    className="w-full h-auto object-contain max-h-80" 
                  />
                </div>
                
                {part.imageUrls.length > 1 && (
                  <div className="p-2 flex space-x-2 overflow-x-auto">
                    {part.imageUrls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`h-16 w-16 flex-shrink-0 rounded border-2 overflow-hidden ${
                          selectedImage === index ? 'border-primary-500' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={url} 
                          alt={`${part.name} thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-64 flex items-center justify-center bg-neutral-900">
                <div className="text-center text-neutral-600">
                  <Image size={64} className="mx-auto mb-2" />
                  <p>No images available</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="mt-4 bg-neutral-800 rounded-lg p-4">
            <h3 className="font-medium text-lg text-white mb-2">Stock Status</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-400 text-sm">Total Quantity</p>
                <p className="text-xl font-bold text-white">{part.quantity}</p>
              </div>
              
              <div>
                <p className="text-neutral-400 text-sm">In Use</p>
                <p className="text-xl font-bold text-white">{part.inUse}</p>
              </div>
              
              <div>
                <p className="text-neutral-400 text-sm">Available</p>
                <p className="text-xl font-bold text-white">{part.quantity - part.inUse}</p>
              </div>
              
              <div>
                <p className="text-neutral-400 text-sm">Storage Location</p>
                <p className="text-lg font-medium text-white">{part.location || 'Not specified'}</p>
              </div>
            </div>
            
            {part.quantity <= 3 && (
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-800/50 rounded-lg flex items-center">
                <AlertTriangle size={18} className="text-yellow-500 mr-2" />
                <span className="text-yellow-400 text-sm">
                  {part.quantity === 0 
                    ? 'Part is out of stock!' 
                    : `Low stock alert: Only ${part.quantity} remaining!`}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-neutral-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-1">{part.name}</h2>
            <div className="flex items-center">
              <span className="text-neutral-400">{part.category}</span>
              {part.subcategory && (
                <>
                  <span className="mx-2 text-neutral-600">•</span>
                  <span className="text-neutral-400">{part.subcategory}</span>
                </>
              )}
            </div>
            
            <div className="mt-4">
              <span className="text-3xl font-bold text-white">{formatCurrency(part.price)}</span>
              <span className="text-neutral-400 text-sm ml-2">per unit</span>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-lg text-white mb-2">About this item</h3>
              <p className="text-neutral-300 leading-relaxed">{part.description}</p>
            </div>
          </div>
          
          <div className="bg-neutral-800 rounded-lg p-6">
            <h3 className="font-medium text-lg text-white mb-2">Specifications</h3>
            
            <div className="space-y-2">
              {part.manufacturer && (
                <div className="flex justify-between py-2 border-b border-neutral-700">
                  <span className="text-neutral-400">Manufacturer</span>
                  <span className="text-white font-medium">{part.manufacturer}</span>
                </div>
              )}
              
              {part.modelNumber && (
                <div className="flex justify-between py-2 border-b border-neutral-700">
                  <span className="text-neutral-400">Model Number</span>
                  <span className="text-white font-medium">{part.modelNumber}</span>
                </div>
              )}
              
              <div className="flex justify-between py-2 border-b border-neutral-700">
                <span className="text-neutral-400">Date Added</span>
                <span className="text-white">{new Date(part.dateAdded).toLocaleDateString()}</span>
              </div>
              
              {part.lastModified && (
                <div className="flex justify-between py-2 border-b border-neutral-700">
                  <span className="text-neutral-400">Last Updated</span>
                  <span className="text-white">{new Date(part.lastModified).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          {part.notes && (
            <div className="bg-neutral-800 rounded-lg p-6">
              <h3 className="font-medium text-lg text-white mb-2">Notes</h3>
              <p className="text-neutral-300 whitespace-pre-line">{part.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartDetails;