# Artisan Dashboard Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cleanly refactor the artisan dashboard by moving sub-components and modals to separate files, resolving the Next.js compile errors, and fully implementing 360° product view, voice recording transcription, and profile update functionality.

**Architecture:** Split large modal views and layout widgets from the main `pages/artisan/dashboard.js` page into modular, reusable functional React components in `components/artisan/`. The parent page will maintain shared states (profile data, stats, products, modal open triggers) and pass handlers down.

**Tech Stack:** Next.js, React Hooks, Tailwind CSS, MediaRecorder API, Axios API Wrapper.

---

### Task 1: Delete Backup Page
Ensure the Next.js build is not broken by pages without default React exports.

**Files:**
* Delete: `frontend/pages/artisan/dashboard_backup.js`

- [ ] **Step 1: Delete the backup file**
  Run: `Remove-Item -Path "D:\work\projects\Artify Bharat\frontend\pages\artisan\dashboard_backup.js" -Force`
  Expected: File is deleted from disk.
- [ ] **Step 2: Commit**
  Run:
  ```bash
  git add frontend/pages/artisan/dashboard_backup.js
  git commit -m "refactor: remove broken dashboard backup page"
  ```

---

### Task 2: Create Minor Layout Components
Extract minor stats and activity rows into focused components.

**Files:**
* Create: `frontend/components/artisan/EnhancedProgressRow.js`
* Create: `frontend/components/artisan/EnhancedActivityItem.js`

- [ ] **Step 1: Write EnhancedProgressRow.js**
  Write the following content to `D:\work\projects\Artify Bharat\frontend\components\artisan\EnhancedProgressRow.js`:
  ```javascript
  import React from "react";

  export default function EnhancedProgressRow({ label, percent, color }) {
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-modern text-[#3d3021]">{label}</span>
          <span className="font-bold text-[#8b6f47]">{percent}</span>
        </div>
        <div className="w-full bg-gray-200/60 h-3 rounded-full overflow-hidden">
          <div
            className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all duration-1000 ease-out relative`}
            style={{ width: percent }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }
  ```
- [ ] **Step 2: Write EnhancedActivityItem.js**
  Write the following content to `D:\work\projects\Artify Bharat\frontend\components\artisan\EnhancedActivityItem.js`:
  ```javascript
  import React from "react";

  export default function EnhancedActivityItem({ icon, title, time, type }) {
    const typeColors = {
      success: "from-green-500/20 to-emerald-500/20 text-green-700",
      info: "from-blue-500/20 to-cyan-500/20 text-blue-700",
      neutral: "from-gray-500/20 to-slate-500/20 text-gray-700",
      warning: "from-yellow-500/20 to-orange-500/20 text-yellow-700",
    };

    return (
      <div
        className={`flex items-center justify-between p-3 bg-gradient-to-r ${typeColors[type] || typeColors.neutral} rounded-xl border border-white/30 backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="font-modern text-sm">{title}</span>
        </div>
        <span className="text-xs opacity-70 font-handwritten">{time}</span>
      </div>
    );
  }
  ```
- [ ] **Step 3: Commit layout components**
  Run:
  ```bash
  git add frontend/components/artisan/EnhancedProgressRow.js frontend/components/artisan/EnhancedActivityItem.js
  git commit -m "feat: implement enhanced progress and activity widgets"
  ```

---

### Task 3: Implement EditProfileModal
Provide fields for updating specialized credentials and artisan story.

**Files:**
* Create: `frontend/components/artisan/EditProfileModal.js`

- [ ] **Step 1: Write EditProfileModal.js**
  Write the following content to `D:\work\projects\Artify Bharat\frontend\components\artisan\EditProfileModal.js`:
  ```javascript
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
  ```
- [ ] **Step 2: Commit profile modal**
  Run:
  ```bash
  git add frontend/components/artisan/EditProfileModal.js
  git commit -m "feat: implement profile edit modal screen"
  ```

---

### Task 4: Implement AddProductModal
Provide media and voice-recording components to upload new listings.

**Files:**
* Create: `frontend/components/artisan/AddProductModal.js`

- [ ] **Step 1: Write AddProductModal.js**
  Write the following content to `D:\work\projects\Artify Bharat\frontend\components\artisan\AddProductModal.js`:
  ```javascript
  import React, { useState, useEffect } from "react";
  import { createProduct } from "@/utils/apiCalls";

  export default function AddProductModal({ onClose, onProductAdded }) {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      unit_price: 0,
      category: "",
      image: null,
      video: null,
      additionalImages: [],
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          await processAudioDescription(audioBlob);
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Could not access microphone. Please check permissions.");
      }
    };

    const stopRecording = () => {
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        setIsRecording(false);
      }
    };

    const processAudioDescription = async (audioBlob) => {
      setIsProcessing(true);
      try {
        const audioFormData = new FormData();
        audioFormData.append("file", audioBlob, "description.webm");

        const response = await fetch("http://localhost:8001/process_product_description", {
          method: "POST",
          body: audioFormData,
        });

        const data = await response.json();
        if (data.description) {
          setFormData((prev) => ({ ...prev, description: data.description }));
          alert("Description generated successfully! ✨");
        } else {
          alert("Failed to generate description. Please try again.");
        }
      } catch (error) {
        console.error("Error processing audio:", error);
        alert("Failed to process audio. Make sure microservices are running.");
      } finally {
        setIsProcessing(false);
      }
    };

    const handleFileChange = (e, type) => {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, [type]: file }));

        if (type === "image") {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else if (type === "video") {
          setVideoPreview(URL.createObjectURL(file));
        }
      }
    };

    const handleMultipleImagesChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        setFormData((prev) => ({ ...prev, additionalImages: files }));

        const previews = [];
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            previews.push(reader.result);
            if (previews.length === files.length) {
              setAdditionalImagePreviews(previews);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    };

    const removeAdditionalImage = (index) => {
      const newImages = formData.additionalImages.filter((_, i) => i !== index);
      const newPreviews = additionalImagePreviews.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        additionalImages: newImages,
      }));
      setAdditionalImagePreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("description", formData.description);
        payload.append("price", formData.unit_price);
        payload.append("category", formData.category);

        if (formData.image) {
          payload.append("image", formData.image);
        }
        if (formData.video) {
          payload.append("video", formData.video);
        }
        if (formData.additionalImages.length > 0) {
          formData.additionalImages.forEach((img) => {
            payload.append(`additional_images`, img);
          });
        }

        const result = await createProduct(payload);
        if (result) {
          alert("Product added successfully! ✨");
          onProductAdded();
          onClose();
        } else {
          alert("Failed to add product. Please check server responses.");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      }
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative max-w-2xl w-full my-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"></div>
          <div className="relative p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-artistic font-bold text-[#3d3021] flex items-center gap-3">
                <span>✨</span>
                Add New Product
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-600 rounded-full flex items-center justify-center transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                  Product Name
                </label>
                <input
                  className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                  placeholder="Enter your craft's name..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                  Product Description
                </label>
                <textarea
                  className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-handwritten placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                  placeholder="Tell the story of your craft..."
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />

                <div className="mt-4 flex items-center gap-4">
                  {!isRecording && !isProcessing && (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-lg transition-all flex items-center gap-2 font-modern"
                    >
                      <span>🎤</span>
                      Record Description
                    </button>
                  )}

                  {isRecording && (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:shadow-lg transition-all flex items-center gap-2 animate-pulse font-modern"
                    >
                      <span>⏹️</span>
                      Stop Recording
                    </button>
                  )}

                  {isProcessing && (
                    <div className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl flex items-center gap-2 font-modern">
                      <span>⏳</span>
                      Processing...
                    </div>
                  )}

                  <span className="text-sm font-handwritten text-[#8b6f47]">
                    {isRecording ? "Speak in your language..." : "Or type manually above"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                    placeholder="0"
                    value={formData.unit_price}
                    onChange={(e) =>
                      setFormData({ ...formData, unit_price: parseFloat(e.target.value) || 0 })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                    Category
                  </label>
                  <select
                    className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Woodwork">Woodwork</option>
                    <option value="Metalwork">Metalwork</option>
                    <option value="Paintings">Paintings</option>
                    <option value="Handicrafts">Handicrafts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                  Main Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image")}
                  className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#d4784a] file:text-white file:font-medium hover:file:bg-[#c6633f] transition-colors"
                  required
                />
                {imagePreview && (
                  <div className="mt-4 relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-2xl blur-lg"></div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="relative w-40 h-40 object-cover rounded-2xl border-2 border-white shadow-warm"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                  Product Video (Optional)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "video")}
                  className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-500 file:text-white file:font-medium hover:file:bg-purple-600 transition-colors"
                />
                {videoPreview && (
                  <div className="mt-4">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full max-h-60 rounded-2xl bg-black shadow-warm"
                      preload="metadata"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                  Additional Images (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImagesChange}
                  className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-green-500 file:text-white file:font-medium hover:file:bg-green-600 transition-colors"
                />
                {additionalImagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {additionalImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-xl blur-sm"></div>
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="relative w-full h-24 object-cover rounded-xl border border-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  className="flex-1 py-4 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold flex items-center justify-center gap-2"
                >
                  <span>✨</span>
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  ```
- [ ] **Step 2: Commit AddProductModal.js**
  Run:
  ```bash
  git add frontend/components/artisan/AddProductModal.js
  git commit -m "feat: implement product creation modal"
  ```

---

### Task 5: Implement ProductDetailModal
Provide 360° rotation navigation and zoom displays for listing details.

**Files:**
* Create: `frontend/components/artisan/ProductDetailModal.js`

- [ ] **Step 1: Write ProductDetailModal.js**
  Write the following content to `D:\work\projects\Artify Bharat\frontend\components\artisan\ProductDetailModal.js`:
  ```javascript
  import React, { useState, useEffect } from "react";

  export default function ProductDetailModal({ product, onClose }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [is360Mode, setIs360Mode] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [rotation, setRotation] = useState(0);

    const allImages = [];
    if (product.image_url) {
      allImages.push(product.image_url);
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (img.image_url) {
          allImages.push(img.image_url);
        }
      });
    }

    const goToPrevious = () => {
      setSelectedImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1
      );
      setIsZoomed(false);
    };

    const goToNext = () => {
      setSelectedImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1
      );
      setIsZoomed(false);
    };

    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }, [selectedImageIndex, allImages.length]);

    const handleMouseDown = (e) => {
      if (is360Mode && allImages.length > 1) {
        setIsDragging(true);
        setStartX(e.clientX);
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging && is360Mode && allImages.length > 1) {
        const deltaX = e.clientX - startX;
        const sensitivity = 5;
        const newRotation = rotation + deltaX / sensitivity;

        setRotation(newRotation);
        setStartX(e.clientX);

        const imageIndex = Math.abs(Math.floor((newRotation / 360) * allImages.length)) % allImages.length;
        setSelectedImageIndex(imageIndex);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    useEffect(() => {
      if (is360Mode && !isDragging && allImages.length > 1) {
        const interval = setInterval(() => {
          setRotation((prev) => prev + 10);
          const imageIndex = Math.abs(Math.floor((rotation / 360) * allImages.length)) % allImages.length;
          setSelectedImageIndex(imageIndex);
        }, 300);
        return () => clearInterval(interval);
      }
    }, [is360Mode, isDragging, rotation, allImages.length]);

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative max-w-4xl w-full my-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"></div>
          <div className="relative p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-artistic font-bold text-[#3d3021]">
                  {product.title}
                </h2>
                <p className="text-lg font-handwritten text-[#8b6f47] mt-1">
                  {product.category}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-600 rounded-full flex items-center justify-center transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                {allImages.length > 0 && (
                  <div className="relative">
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-gray-100 ${
                        is360Mode
                          ? "cursor-grab active:cursor-grabbing"
                          : isZoomed
                          ? "cursor-zoom-out"
                          : "cursor-zoom-in"
                      }`}
                      onClick={() => !is360Mode && setIsZoomed(!isZoomed)}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <img
                        src={allImages[selectedImageIndex]}
                        alt={`${product.title} - View ${selectedImageIndex + 1}`}
                        className={`w-full transition-transform duration-300 ${
                          isZoomed ? "scale-150" : "scale-100"
                        }`}
                        style={{
                          minHeight: "400px",
                          maxHeight: "500px",
                          objectFit: "contain",
                          userSelect: "none",
                        }}
                        draggable="false"
                      />
                    </div>

                    {allImages.length > 1 && (
                      <button
                        onClick={() => {
                          setIs360Mode(!is360Mode);
                          setIsZoomed(false);
                          setRotation(0);
                        }}
                        className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          is360Mode
                            ? "bg-[#d4784a] text-white"
                            : "bg-black/60 text-white hover:bg-black/80"
                        }`}
                      >
                        {is360Mode ? "🔄 360° ON" : "🔄 360° View"}
                      </button>
                    )}

                    {!is360Mode && allImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 text-2xl"
                        >
                          ‹
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 text-2xl"
                        >
                          ›
                        </button>
                      </>
                    )}

                    {!is360Mode && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {isZoomed ? "🔍 Zoomed" : "🔍 Click to zoom"}
                      </div>
                    )}

                    {is360Mode && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {isDragging ? "Drag to Rotate..." : "Auto-Rotating"}
                      </div>
                    )}

                    {allImages.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImageIndex + 1} / {allImages.length}
                      </div>
                    )}
                  </div>
                )}

                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedImageIndex(index);
                          setIsZoomed(false);
                        }}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-[#d4784a] ring-2 ring-[#d4784a]/30"
                            : "border-gray-200 hover:border-[#d4784a]/50"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {product.video_url && (
                  <div className="mt-4">
                    <h3 className="text-xl font-artistic font-semibold mb-3 text-[#3d3021]">
                      Product Video
                    </h3>
                    <video
                      src={product.video_url}
                      controls
                      className="w-full rounded-2xl bg-black shadow-warm"
                      style={{ maxHeight: "300px" }}
                      preload="metadata"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/10 to-[#8b6f47]/10 rounded-2xl"></div>
                  <div className="relative p-6 border border-[#d4784a]/20 rounded-2xl">
                    <p className="text-sm font-modern text-[#8b6f47] mb-1">
                      Price
                    </p>
                    <p className="text-5xl font-bold font-artistic text-[#d4784a]">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-artistic font-semibold text-[#3d3021] mb-3">
                    Description
                  </h3>
                  <p className="text-[#6d5a3d] font-handwritten leading-relaxed text-lg whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-2xl"></div>
                  <div className="relative p-4 border border-amber-200/50 rounded-2xl">
                    <p className="text-sm font-modern text-[#8b6f47] mb-1">
                      Crafted by
                    </p>
                    <p className="text-xl font-artistic font-semibold text-[#3d3021]">
                      {product.artisan || "Heritage Artisan"}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="inline-block bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white px-6 py-3 rounded-full text-lg font-modern font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold text-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  ```
- [ ] **Step 2: Commit ProductDetailModal.js**
  Run:
  ```bash
  git add frontend/components/artisan/ProductDetailModal.js
  git commit -m "feat: implement product detailed screen with 360 viewer"
  ```

---

### Task 6: Refactor dashboard.js Page
Rewrite main routing screen to hook imports up with states.

**Files:**
* Modify: `frontend/pages/artisan/dashboard.js`

- [ ] **Step 1: Write dashboard.js**
  Write the following content to `D:\work\projects\Artify Bharat\frontend\pages\artisan\dashboard.js` (overwriting entire file):
  ```javascript
  import { useEffect, useState } from "react";
  import { useRouter } from "next/router";
  import {
    getDashboardStats,
    getArtisanProfile,
    getProductsList,
    deleteProduct,
  } from "@/utils/apiCalls";
  import ProtectedRoute from "@/utils/ProtectedRoute";
  import api from "@/utils/axiosConfig";
  import ArtifyLogo from "../../components/ArtifyLogo";

  import EnhancedProgressRow from "../../components/artisan/EnhancedProgressRow";
  import EnhancedActivityItem from "../../components/artisan/EnhancedActivityItem";
  import EditProfileModal from "../../components/artisan/EditProfileModal";
  import AddProductModal from "../../components/artisan/AddProductModal";
  import ProductDetailModal from "../../components/artisan/ProductDetailModal";

  export default function ArtisanDashboard() {
    return (
      <ProtectedRoute requiredRole="artisan">
        <DashboardContent />
      </ProtectedRoute>
    );
  }

  function DashboardContent() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [change, setChange] = useState({});
    const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);

    const [artisanData, setArtisanData] = useState({
      title: "Artisan",
      profileImage: null,
      city: "City",
      state: "State",
      craftStory: "Loading story...",
      speciality: "Artisan",
      experience: 0,
      bio: "",
    });

    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect(() => {
      if (router.query.verification === "submitted") {
        setShowVerificationSuccess(true);
        router.replace("/artisan/dashboard", undefined, { shallow: true });
      }
    }, [router.query]);

    const handleLogout = () => {
      if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_role");
        router.push("/login/login");
      }
    };

    const handleDeleteProduct = async (productId, productTitle) => {
      if (confirm(`Are you sure you want to delete "${productTitle}"?`)) {
        const success = await deleteProduct(productId);
        if (success) {
          alert("Product deleted successfully!");
          refreshProducts();
        }
      }
    };

    const refreshStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response) {
          setData(response.stats || {});
          setChange(response.change || {});
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    const refreshProducts = async () => {
      try {
        const response = await getProductsList(true);
        const productsList = response?.results || response || [];
        setProducts(productsList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const refreshProfile = async () => {
      try {
        const profile = await getArtisanProfile();
        setArtisanData({
          title: `${profile.user?.first_name || ""} ${profile.user?.last_name || ""}`.trim() || "Artisan",
          profileImage: profile.profile_image_url || null,
          city: profile.user?.address?.city || "City",
          state: profile.user?.address?.state || "State",
          craftStory: profile.craft_story || "No story recorded yet.",
          speciality: profile.speciality || "Artisan",
          experience: profile.experience || 0,
          bio: profile.bio || "",
        });
      } catch (error) {
        console.error("Failed to fetch artisan profile:", error);
      }
    };

    useEffect(() => {
      refreshStats();
      refreshProducts();
      refreshProfile();
    }, []);

    const stats = [
      {
        title: "Total Products",
        value: data["products_count"] || 0,
        icon: "🎨",
        change: change["products_count"] || 0,
        changeType: "positive",
        bgGradient: "from-blue-500 to-blue-600",
      },
      {
        title: "Total Sales",
        value: data["total_sales"] || 0,
        icon: "💰",
        change: change["total_sales"] || 0,
        changeType: "positive",
        bgGradient: "from-emerald-500 to-emerald-600",
      },
      {
        title: "Active Orders",
        value: data["active_orders"] || 0,
        icon: "📦",
        change: change["active_orders"] || 0,
        changeType: "neutral",
        bgGradient: "from-orange-500 to-orange-600",
      },
      {
        title: "AI Verified",
        value: data["ai_verified"] || 0,
        icon: "✓",
        change: change["ai_verified"] || 0,
        changeType: "positive",
        bgGradient: "from-purple-500 to-purple-600",
      },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0] relative overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#d4784a]/25 to-[#c6633f]/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#8b6f47]/22 to-[#a08f73]/18 rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-[#d47651]/20 to-[#c85d3a]/15 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-br from-[#b5a389]/30 to-transparent rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-br from-[#e19576]/25 to-transparent rounded-full"></div>
        </div>

        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {showVerificationSuccess && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl"></div>
                <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-artistic font-bold text-green-800 mb-1">
                        Product Verification Submitted Successfully! 🎉
                      </h3>
                      <p className="text-green-700 font-friendly">
                        Your product authenticity verification has been submitted for review. Our team will review your documentation within 3-5 business days.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowVerificationSuccess(false)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/20 shadow-soft"></div>
              <div className="relative p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-2xl blur-lg"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                      <ArtifyLogo size="lg" showText={false} useImage={true} />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-5xl font-artistic font-bold bg-gradient-to-r from-[#8b4513] via-[#a0522d] to-[#d4af37] bg-clip-text text-transparent mb-2">
                      Artisan Dashboard
                    </h1>
                    <p className="text-lg font-handwritten text-[#6d5a3d] opacity-80">
                      Welcome back, {artisanData.title}! ✨ Create something beautiful today
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="px-8 py-4 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all flex items-center gap-3 font-modern font-semibold"
                  >
                    <span>✨</span>
                    <span>Add New Product</span>
                  </button>
                  <button
                    onClick={() => router.push("/buyer/marketplace")}
                    className="px-6 py-4 bg-white/60 backdrop-blur-sm border border-white/30 text-[#8b6f47] rounded-2xl hover:bg-white/80 transition-all flex items-center gap-2 font-modern"
                  >
                    <span>🏪</span>
                    <span>View Marketplace</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-warm"></div>
                  <div className="relative p-8 min-h-[600px] flex flex-col justify-between">
                    
                    <div>
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          {artisanData.profileImage ? (
                            <img
                              src={artisanData.profileImage}
                              alt={artisanData.title}
                              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-warm"
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#d4784a] to-[#8b6f47] flex items-center justify-center border-4 border-white shadow-warm">
                              <span className="text-4xl text-white font-bold font-artistic">
                                {artisanData.title.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-center">
                        <h2 className="font-artistic font-bold text-2xl text-[#3d3021] mb-2">
                          {artisanData.title}
                        </h2>
                        <p className="text-lg font-handwritten text-[#8b6f47] mb-4">
                          {artisanData.speciality}
                        </p>
                        <div className="flex justify-center gap-6 mb-6">
                          <div className="text-center">
                            <span className="text-xl">📍</span>
                            <p className="text-sm font-modern text-[#6d5a3d]">
                              {artisanData.city}, {artisanData.state}
                            </p>
                          </div>
                          <div className="text-center">
                            <span className="text-xl">⭐</span>
                            <p className="text-sm font-modern text-[#6d5a3d]">
                              {artisanData.experience} years
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => setShowEditProfile(true)}
                        className="w-full py-3 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold flex items-center justify-center gap-2"
                      >
                        <span>✏️</span>
                        Edit Profile
                      </button>
                      <button
                        onClick={() => router.push("/artisan/verify")}
                        className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#c2794d] text-white rounded-2xl hover:shadow-lg transition-all font-modern font-semibold flex items-center justify-center gap-2"
                      >
                        <span>🏆</span>
                        Product Verification
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:shadow-lg transition-all font-modern font-semibold flex items-center justify-center gap-2"
                      >
                        <span>🚪</span>
                        Logout
                      </button>
                    </div>

                    <div className="mt-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-2xl"></div>
                      <div className="relative p-4 border border-amber-200/50 rounded-2xl">
                        <h3 className="text-lg font-artistic font-bold mb-2 text-[#8b6f47]">
                          My Craft Story
                        </h3>
                        <p className="text-sm font-handwritten text-[#6d5a3d] leading-relaxed line-clamp-4">
                          {artisanData.craftStory}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-3xl border border-white/20"></div>
                  <div className="relative p-6">
                    <h3 className="text-2xl font-artistic font-bold text-[#3d3021] mb-6 flex items-center gap-2">
                      <span>📊</span>
                      Performance Overview
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {stats.map((stat, i) => (
                        <div key={i} className="relative group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 p-5 shadow-soft hover:shadow-warm transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center text-white`}>
                              {stat.icon}
                            </div>
                            <span className="text-xs text-green-600 font-bold">
                              +{stat.change}
                            </span>
                          </div>
                          <p className="text-xs font-modern text-[#6d5a3d] mb-1">{stat.title}</p>
                          <h3 className="text-2xl font-bold font-artistic text-[#3d3021]">{stat.value}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-3xl border border-white/20"></div>
                  <div className="relative p-6 max-h-[600px] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-artistic font-bold text-[#3d3021] flex items-center gap-2">
                        <span>🎨</span>
                        My Products ({products.length})
                      </h3>
                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="px-6 py-3 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold flex items-center gap-2"
                      >
                        <span>✨</span>
                        Add New
                      </button>
                    </div>

                    {products.length === 0 ? (
                      <div className="text-center py-16">
                        <p className="text-[#6d5a3d] font-handwritten mb-6">Start showcasing your beautiful crafts!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {products.map((product) => (
                          <div key={product.id} className="relative bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-5 hover:shadow-warm transition-all cursor-pointer flex gap-5 items-center" onClick={() => setSelectedProduct(product)}>
                            {product.image_url && (
                              <img src={product.image_url} alt={product.title} className="w-20 h-20 object-cover rounded-xl border border-white shadow-soft" />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-artistic font-bold text-lg text-[#3d3021] truncate">{product.title}</h4>
                              <p className="text-sm font-handwritten text-[#6d5a3d] line-clamp-1">{product.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-[#d4784a] font-bold font-modern">₹{product.price}</span>
                                <span className="px-2 py-0.5 bg-[#d4784a]/20 text-[#8b6f47] text-xs rounded-full">{product.category}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProduct(product.id, product.title);
                                }}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-soft"></div>
                  <div className="relative p-6">
                    <h3 className="text-xl font-artistic font-bold text-[#3d3021] mb-4">Performance Insights</h3>
                    <div className="space-y-4">
                      <EnhancedProgressRow label="Profile Views" percent="75%" color="from-blue-500 to-blue-600" />
                      <EnhancedProgressRow label="Product Clicks" percent="60%" color="from-green-500 to-green-600" />
                      <EnhancedProgressRow label="Conversion Rate" percent="45%" color="from-purple-500 to-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-soft"></div>
                  <div className="relative p-6">
                    <h3 className="text-xl font-artistic font-bold text-[#3d3021] mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <EnhancedActivityItem icon="📦" title="Order shipped" time="2 hours ago" type="success" />
                      <EnhancedActivityItem icon="💬" title="New message" time="5 hours ago" type="info" />
                      <EnhancedActivityItem icon="✅" title="AI Verified product" time="1 day ago" type="success" />
                      <EnhancedActivityItem icon="👁️" title="Profile viewed" time="3 hours ago" type="neutral" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {showAddProduct && (
          <AddProductModal
            onClose={() => setShowAddProduct(false)}
            onProductAdded={() => {
              refreshProducts();
              refreshStats();
            }}
          />
        )}

        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {showEditProfile && (
          <EditProfileModal
            artisanData={artisanData}
            onClose={() => setShowEditProfile(false)}
            onUpdate={refreshProfile}
          />
        )}

      </div>
    );
  }
  ```
- [ ] **Step 2: Commit refactored dashboard.js page**
  Run:
  ```bash
  git add frontend/pages/artisan/dashboard.js
  git commit -m "refactor: modularize artisan dashboard, split modals, and resolve build errors"
  ```

---

### Task 7: Build and Verify Compilation
Validate Next.js compilation, routing discoverability, and verify there are no syntax bugs.

**Files:**
* None (Verify environment build)

- [ ] **Step 1: Run production next build**
  Run: `npm run build` in `D:\work\projects\Artify Bharat\frontend`
  Expected: Production bundle compiles successfully with no page component export errors or undefined variable errors.
- [ ] **Step 2: Verify git status is clean**
  Run: `git status`
  Expected: Working tree is clean with all tasks completed.
