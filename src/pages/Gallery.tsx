import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Camera, Tag } from 'lucide-react';
import { useGalleryStore } from '../store/galleryStore';
import { GalleryItem } from '../models/types';
import { useToaster } from '../components/ui/Toaster';

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const { filteredItems, filterOptions, setFilterOptions } = useGalleryStore();
  const { addToast } = useToaster();
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(
      filteredItems.flatMap(item => item.tags)
    )
  ).sort();
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-200">Gallery</h2>
          <p className="text-neutral-400">Showcase your completed drone builds</p>
        </div>
        
        <button
          onClick={() => navigate('/gallery/new')}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus size={16} />
          <span>Add Build</span>
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search gallery..."
            value={filterOptions.searchTerm}
            onChange={(e) => setFilterOptions({ searchTerm: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                const newTags = filterOptions.tags.includes(tag)
                  ? filterOptions.tags.filter(t => t !== tag)
                  : [...filterOptions.tags, tag];
                setFilterOptions({ tags: newTags });
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                filterOptions.tags.includes(tag)
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              <Tag size={14} />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Camera size={64} className="text-neutral-600 mb-4" />
          <h3 className="text-xl font-medium text-neutral-300 mb-2">No builds in gallery</h3>
          <p className="text-neutral-400 max-w-md">
            Add your completed builds to showcase them in the gallery.
          </p>
          <button
            onClick={() => navigate('/gallery/new')}
            className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Add Your First Build
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => navigate(`/gallery/${item.id}`)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-neutral-900">
                {item.imageUrls[0] ? (
                  <img
                    src={item.imageUrls[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera size={48} className="text-neutral-700" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-white group-hover:text-primary-400 transition-colors mb-2">
                  {item.title}
                </h3>
                
                <p className="text-neutral-400 text-sm line-clamp-2 mb-4">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-700/50 text-neutral-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-neutral-500">
                  {formatDate(item.dateAdded)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;