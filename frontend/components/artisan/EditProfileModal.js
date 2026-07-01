import React, { useState, useEffect } from "react";
import api from "@/utils/axiosConfig";

export default function EditProfileModal({ artisanData, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    speciality: artisanData.speciality || "",
    experience: artisanData.experience || 0,
    bio: artisanData.bio || "",
    craft_story: artisanData.craftStory || "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch("store/artisan/profile/", formData);
      if (response.status === 200) {
        alert("Profile updated successfully! ✨");
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full my-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"></div>
        <div className="relative p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-3xl font-artistic font-bold text-[#3d3021] mb-8 flex items-center gap-3">
            <span>✏️</span>
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Craft Speciality
              </label>
              <input
                type="text"
                value={formData.speciality}
                onChange={(e) =>
                  setFormData({ ...formData, speciality: e.target.value })
                }
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                placeholder="e.g., Pottery, Textiles, Jewelry"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Years of Experience
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })
                }
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Bio (Optional)
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-handwritten placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                rows="3"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Craft Story
              </label>
              <textarea
                value={formData.craft_story}
                onChange={(e) =>
                  setFormData({ ...formData, craft_story: e.target.value })
                }
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-handwritten placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                rows="4"
                placeholder="Share your craft story..."
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 bg-white/60 backdrop-blur-sm border border-white/30 text-[#8b6f47] rounded-2xl hover:bg-white/80 transition-all font-modern font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
