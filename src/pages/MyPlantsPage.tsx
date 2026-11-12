import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Droplets,
  Sun,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Sparkles,
  Camera,
  Image,
  Check,
  QrCode
} from 'lucide-react';
import { Plant, PlantCategory, HealthStatus, Language } from '../types';

interface MyPlantsPageProps {
  plants: Plant[];
  onAddPlant: (plant: Omit<Plant, 'id' | 'createdAt'>) => void;
  onUpdatePlant: (plantId: string, updates: Partial<Plant>) => void;
  onDeletePlant: (plantId: string) => void;
  onWaterPlant: (plantId: string) => void;
  language: Language;
  onOpenImageGenModal?: (callback: (url: string) => void) => void;
  onOpenQrCode?: (plant: Plant) => void;
  onOpenIdentifier?: () => void;
}

export const MyPlantsPage: React.FC<MyPlantsPageProps> = ({
  plants,
  onAddPlant,
  onUpdatePlant,
  onDeletePlant,
  onWaterPlant,
  language,
  onOpenImageGenModal,
  onOpenQrCode,
  onOpenIdentifier
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    commonName: '',
    scientificName: '',
    category: 'Indoor' as PlantCategory,
    photoUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    plantingDate: new Date().toISOString().split('T')[0],
    indoorOutdoor: 'indoor' as 'indoor' | 'outdoor',
    location: 'Living Room Window',
    sunlightRequirement: 'Bright Indirect Light',
    wateringFrequencyDays: 5,
    soilType: 'Well-draining potting mix with perlite',
    healthStatus: 'healthy' as HealthStatus,
    notes: 'Flourishing well with fresh green leaves.'
  });

  const categories: (PlantCategory | 'All')[] = ['All', 'Indoor', 'Medicinal', 'Flowering', 'Vegetables', 'Fruit'];

  const filteredPlants = plants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.commonName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scientificName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      commonName: '',
      scientificName: '',
      category: 'Indoor',
      photoUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      plantingDate: new Date().toISOString().split('T')[0],
      indoorOutdoor: 'indoor',
      location: 'Living Room',
      sunlightRequirement: 'Bright Indirect Light',
      wateringFrequencyDays: 5,
      soilType: 'Well-draining potting soil',
      healthStatus: 'healthy',
      notes: ''
    });
    setIsEditing(false);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData({
      name: plant.name,
      commonName: plant.commonName || '',
      scientificName: plant.scientificName || '',
      category: plant.category,
      photoUrl: plant.photoUrl,
      plantingDate: plant.plantingDate,
      indoorOutdoor: plant.indoorOutdoor,
      location: plant.location,
      sunlightRequirement: plant.sunlightRequirement,
      wateringFrequencyDays: plant.wateringFrequencyDays,
      soilType: plant.soilType,
      healthStatus: plant.healthStatus,
      notes: plant.notes
    });
    setSelectedPlant(plant);
    setIsEditing(true);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (isEditing && selectedPlant) {
      onUpdatePlant(selectedPlant.id, formData);
      setSelectedPlant({ ...selectedPlant, ...formData });
    } else {
      onAddPlant({
        ...formData,
        userId: ''
      });
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (plantId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this plant from your garden?')) {
      onDeletePlant(plantId);
      if (selectedPlant?.id === plantId) {
        setSelectedPlant(null);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#183B2A] pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#174D35]">
            {language === 'ta' ? 'என் தோட்டம்' : 'My Digital Garden'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {language === 'ta'
              ? 'உங்கள் தாவரங்களை சேர்த்து, நீரூற்றும் சுழற்சியையும் வளர்ச்சியையும் கண்காணியுங்கள்.'
              : 'Manage your personal plant collection, watering routines and botanical profiles.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onOpenIdentifier && (
            <button
              type="button"
              onClick={onOpenIdentifier}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Camera className="w-4 h-4 text-emerald-200" />
              <span>{language === 'ta' ? 'AI தாவர அடையாளங்காணி' : 'AI Identify & Add'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ta' ? 'புதிய செடி சேர்' : 'Add New Plant'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ta' ? 'செடிகளை தேடுக...' : 'Search plants by name, species...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#A8DDB5] bg-white text-xs sm:text-sm focus:border-[#2E8B57] focus:ring-2 focus:ring-[#A8DDB5]/40 outline-none transition-all shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#174D35] text-white border-[#174D35] shadow-xs'
                  : 'bg-white text-gray-700 border-[#A8DDB5]/60 hover:border-[#2E8B57]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Plant Cards Grid */}
      {filteredPlants.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-[#A8DDB5]/60 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F8ED] text-[#2E8B57] flex items-center justify-center mx-auto">
            <Plus className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-base text-[#174D35]">
            {language === 'ta' ? 'பொருத்தமான செடிகள் கிடைக்கவில்லை' : 'No matching plants found'}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {language === 'ta'
              ? 'தேடலை மாற்றி முயற்சிக்கவும் அல்லது புதிய செடியை சேர்க்கவும்.'
              : 'Try clearing your search query or add a brand new plant to your digital garden collection.'}
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-2xl bg-[#174D35] text-white text-xs font-bold hover:bg-[#2E8B57] transition-all cursor-pointer"
          >
            {language === 'ta' ? 'புதிய செடி சேர்க்க' : 'Add Plant Now'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => setSelectedPlant(plant)}
              className="group rounded-3xl bg-white border border-[#A8DDB5]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={plant.photoUrl || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80'}
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-xs ${
                    plant.healthStatus === 'healthy'
                      ? 'bg-emerald-500/90 text-white'
                      : plant.healthStatus === 'warning'
                      ? 'bg-amber-500/90 text-white'
                      : 'bg-red-500/90 text-white'
                  }`}
                >
                  {plant.healthStatus}
                </span>

                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onOpenQrCode && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQrCode(plant);
                      }}
                      className="p-1.5 rounded-full bg-white/90 text-emerald-800 hover:bg-white shadow-xs"
                      title="Print Botanical QR Tag"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleOpenEdit(plant, e)}
                    className="p-1.5 rounded-full bg-white/90 text-[#174D35] hover:bg-white shadow-xs"
                    title="Edit Plant"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(plant.id, e)}
                    className="p-1.5 rounded-full bg-white/90 text-red-600 hover:bg-white shadow-xs"
                    title="Delete Plant"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#174D35] group-hover:text-[#2E8B57] transition-colors truncate">
                    {plant.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">{plant.commonName || plant.scientificName}</p>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 pt-1 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      Water every {plant.wateringFrequencyDays} days
                    </span>
                    <span className="font-semibold text-gray-700">{plant.indoorOutdoor}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#2E8B57] truncate">
                    <Sun className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{plant.sunlightRequirement}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    {plant.location}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onWaterPlant(plant.id);
                    }}
                    className="px-3 py-1 rounded-xl bg-[#E8F8ED] hover:bg-[#2E8B57] text-[#174D35] hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>{language === 'ta' ? 'நீர் ஊற்று' : 'Water'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INDIVIDUAL PLANT PROFILE MODAL */}
      {selectedPlant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#A8DDB5] shadow-2xl p-6 md:p-8 text-[#183B2A] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPlant.photoUrl}
                  alt={selectedPlant.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#A8DDB5]"
                />
                <div>
                  <h3 className="text-xl font-black text-[#174D35]">{selectedPlant.name}</h3>
                  <p className="text-xs text-gray-500 italic">
                    {selectedPlant.commonName} &bull; {selectedPlant.scientificName}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedPlant.healthStatus === 'healthy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedPlant.healthStatus === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    Status: {selectedPlant.healthStatus}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlant(null)}
                className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/40 space-y-1">
                <span className="font-bold text-[#174D35] block">Category & Environment</span>
                <p>Category: <strong className="text-[#2E8B57]">{selectedPlant.category}</strong></p>
                <p>Type: <strong>{selectedPlant.indoorOutdoor}</strong></p>
                <p>Location: <strong>{selectedPlant.location}</strong></p>
                <p>Planted Date: <strong>{selectedPlant.plantingDate}</strong></p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/40 space-y-1">
                <span className="font-bold text-[#174D35] block">Care Requirements</span>
                <p>Watering: <strong>Every {selectedPlant.wateringFrequencyDays} days</strong></p>
                <p>Sunlight: <strong>{selectedPlant.sunlightRequirement}</strong></p>
                <p>Soil Type: <strong>{selectedPlant.soilType}</strong></p>
              </div>
            </div>

            {selectedPlant.notes && (
              <div className="p-3.5 rounded-2xl bg-[#E8F8ED]/50 border border-[#A8DDB5]/60 text-xs text-gray-700 leading-relaxed mb-4">
                <strong className="block text-[#174D35] mb-1">Gardening Notes:</strong>
                {selectedPlant.notes}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleDelete(selectedPlant.id)}
                className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
              >
                Delete Plant
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleOpenEdit(selectedPlant, e)}
                  className="px-4 py-2 rounded-xl border border-[#A8DDB5] text-[#174D35] text-xs font-bold hover:bg-[#A8DDB5]/20 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onWaterPlant(selectedPlant.id);
                    setSelectedPlant(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#2E8B57] hover:bg-[#174D35] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Droplets className="w-4 h-4 text-white" />
                  <span>Water Plant</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PLANT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-white border border-[#A8DDB5] shadow-2xl p-6 md:p-8 text-[#183B2A] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-black text-[#174D35]">
                {isEditing ? 'Edit Plant Details' : 'Add New Plant to Garden'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Plant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Holy Basil"
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PlantCategory })}
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none bg-white"
                  >
                    {categories.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Common Name</label>
                  <input
                    type="text"
                    value={formData.commonName}
                    onChange={(e) => setFormData({ ...formData, commonName: e.target.value })}
                    placeholder="e.g., Tulsi"
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Scientific Name</label>
                  <input
                    type="text"
                    value={formData.scientificName}
                    onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                    placeholder="e.g., Ocimum sanctum"
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none"
                  />
                </div>
              </div>

              {/* Photo URL & Gemini AI Generate Button */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Plant Photo URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none text-xs"
                  />
                  {onOpenImageGenModal && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenImageGenModal((url) => setFormData({ ...formData, photoUrl: url }))
                      }
                      className="px-3 py-2 rounded-xl bg-[#E8F8ED] hover:bg-[#2E8B57] text-[#174D35] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#2E8B57]" />
                      <span>AI Generate</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Watering (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.wateringFrequencyDays}
                    onChange={(e) =>
                      setFormData({ ...formData, wateringFrequencyDays: parseInt(e.target.value) || 3 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.indoorOutdoor}
                    onChange={(e) =>
                      setFormData({ ...formData, indoorOutdoor: e.target.value as 'indoor' | 'outdoor' })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none bg-white"
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Health Status</label>
                  <select
                    value={formData.healthStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, healthStatus: e.target.value as HealthStatus })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none bg-white"
                  >
                    <option value="healthy">Healthy</option>
                    <option value="warning">Attention Needed</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Sunlight</label>
                  <select
                    value={formData.sunlightRequirement}
                    onChange={(e) => setFormData({ ...formData, sunlightRequirement: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none bg-white"
                  >
                    <option value="Full Sun (6+ hrs)">Full Sun (6+ hrs)</option>
                    <option value="Partial Sun (4-6 hrs)">Partial Sun (4-6 hrs)</option>
                    <option value="Bright Indirect Light">Bright Indirect Light</option>
                    <option value="Partial Shade (2-4 hrs)">Partial Shade (2-4 hrs)</option>
                    <option value="Low Light / Full Shade">Low Light / Full Shade</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Location in Home</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. South Terrace, Kitchen Sill"
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Notes & Observations</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Soil mix details, growth habits, fertilizer dates..."
                  className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] focus:border-[#2E8B57] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white font-bold text-xs shadow-md transition-all"
                >
                  {isEditing ? 'Save Changes' : 'Add to My Garden'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
