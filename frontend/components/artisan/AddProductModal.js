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
