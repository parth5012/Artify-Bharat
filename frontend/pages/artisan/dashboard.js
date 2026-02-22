import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createProduct, getDashboardStats, getArtisanProfile, getProductsList, deleteProduct } from "@/utils/apiCalls";
import ProtectedRoute from "@/utils/ProtectedRoute";
import api from "@/utils/axiosConfig";

/* ================= DASHBOARD ================= */

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

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Clear all auth data
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');

      // Redirect to login
      router.push('/login/login');
    }
  };
  const [artisanData, setArtisanData] = useState({
    title: "Rajesh Kumar",
    profileImage: null,
    city: "Jaipur",
    state: "Rajasthan",
    craftStory:
      "This beautiful handcrafted pottery represents generations of traditional craftsmanship passed down from my grandmother. Each piece is carefully shaped using ancient techniques.",
    speciality: "Traditional Pottery",
    experience: 15,
  });

  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleDeleteProduct = async (productId, productTitle) => {
    if (confirm(`Are you sure you want to delete "${productTitle}"?`)) {
      const success = await deleteProduct(productId);
      if (success) {
        alert("Product deleted successfully!");
        // Refresh products list
        const response = await getProductsList(true); // Only fetch artisan's own products
        const productsList = response?.results || response || [];
        setProducts(productsList);
      }
    }
  };

  useEffect(() => {
    // Define the async function inside
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        // Ensure response has the expected structure
        if (response) {
          setData(response.stats || {});
          setChange(response.change || {});
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Fetch products for the artisan
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🔄 Fetching products...");
        const response = await getProductsList(true); // Only fetch artisan's own products
        const productsList = response?.results || response || [];
        console.log("✅ Products fetched:", productsList);
        console.log("📊 Products count:", productsList?.length || 0);

        // Log each product to debug
        if (productsList && productsList.length > 0) {
          productsList.forEach((p, i) => {
            console.log(`Product ${i + 1}:`, p.title, p.id);
          });
        }

        setProducts(productsList);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Load craft story from localStorage (saved during onboarding)
  useEffect(() => {
    const fetchArtisanProfile = async () => {
      try {
        const profile = await getArtisanProfile();
        console.log("Artisan Profile:", profile);

        setArtisanData({
          title: `${profile.user?.first_name || ''} ${profile.user?.last_name || ''}`.trim() || "Artisan",
          profileImage: profile.profile_image_url || null,
          city: profile.user?.address?.city || "City",
          state: profile.user?.address?.state || "State",
          craftStory: profile.craft_story || "No story recorded yet. Please complete onboarding.",
          speciality: profile.speciality || "Artisan",
          experience: profile.experience || 0,
        });
      } catch (error) {
        console.error("Failed to fetch artisan profile:", error);

        // Fallback: Try localStorage
        const savedData = localStorage.getItem("artisan_onboarding");
        if (savedData) {
          try {
            const onboardingData = JSON.parse(savedData);
            if (onboardingData.story) {
              setArtisanData(prev => ({
                ...prev,
                craftStory: onboardingData.story
              }));
            }
          } catch (e) {
            console.error("Failed to load from localStorage:", e);
          }
        }
      }
    };

    fetchArtisanProfile();
  }, []);

  console.log(data, change);
  const stats = [
    {
      title: "Total Products",
      value: data["products_count"],
      icon: "🎨",
      change: change["products_count"],
      changeType: "positive",
      bgGradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Sales",
      value: data["total_sales"],
      icon: "💰",
      change: change["total_sales"],
      changeType: "positive",
      bgGradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Active Orders",
      value: data["active_orders"],
      icon: "📦",
      change: change["active_orders"],
      changeType: "neutral",
      bgGradient: "from-orange-500 to-orange-600",
    },
    {
      title: "AI Verified",
      value: data["ai_verified"],
      icon: "✓",
      change: change["ai_verified"],
      changeType: "positive",
      bgGradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#ede8e0] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-[#3d3021]">
            Artisan Dashboard
          </h1>
          <p className="text-[#6d5a3d]">
            Welcome back! Manage your profile and products
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* PROFILE */}
          <div className="lg:col-span-3 space-y-6">
            <div
              className="
                    bg-white rounded-2xl border p-6 shadow-sm
                    min-h-[560px] 
                    flex flex-col
                    "
            >
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <input
                    type="file"
                    id="profile-image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const formData = new FormData();
                        formData.append('profile_image', file);

                        try {
                          const response = await api.patch('store/artisan/profile/', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                          });

                          if (response.status === 200) {
                            // Update profile image
                            setArtisanData(prev => ({
                              ...prev,
                              profileImage: response.data.profile_image_url
                            }));
                            alert('Profile photo updated!');
                          }
                        } catch (error) {
                          console.error('Upload failed:', error);
                          alert('Failed to upload photo');
                        }
                      }
                    }}
                  />

                  {artisanData.profileImage ? (
                    <img
                      src={artisanData.profileImage}
                      alt={artisanData.name}
                      className="w-24 h-24 rounded-full object-cover border-4 shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c2794d] to-[#8b6f47] flex items-center justify-center border-4 shadow-md">
                      <span className="text-3xl text-white font-bold">
                        {artisanData.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  <label
                    htmlFor="profile-image-upload"
                    className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs cursor-pointer"
                  >
                    Upload
                  </label>
                </div>
              </div>

              <div className="text-center">
                <h2 className="font-bold text-xl">{artisanData.title}</h2>
                <p className="text-sm text-[#8b6f47]">
                  {artisanData.speciality}
                </p>

                <div className="text-xs text-[#6d5a3d] mt-2 space-y-1">
                  <p>
                    📍 {artisanData.city}, {artisanData.state}
                  </p>
                  <p>⭐ {artisanData.experience} years</p>
                </div>

                <button
                  onClick={() => setShowEditProfile(true)}
                  className="mt-4 w-full py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="mt-2 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                >
                  🚪 Logout
                </button>
              </div>

              <div className="mt-4 bg-amber-50 border rounded-xl p-3">
                <h3 className="text-sm font-bold mb-1">✨ Craft Story</h3>
                <p className="text-xs text-[#6d5a3d]">
                  {artisanData.craftStory}
                </p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN — STATS + PRODUCTS */}
          <div
            className="
              lg:col-span-6 space-y-8
              min-h-[50px]
              max-h-[750px]
              overflow-y-auto"
          >
            {/* STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 min-h-[160px]">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center text-lg text-white`}
                    >
                      {stat.icon}
                    </div>
                  </div>

                  <p className="text-xs text-[#6d5a3d]">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-[#3d3021]">
                    {stat.value}
                  </h3>

                  <p
                    className={`text-xs font-medium ${stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-[#8b6f47]"
                      }`}
                  >
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            {/* PRODUCTS */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm min-h-[368px]">
              <h3 className="font-bold text-lg mb-4">
                Products ({products.length})
              </h3>

              {console.log("🎨 Rendering products section, count:", products.length)}
              {console.log("🎨 Products array:", products)}

              {products.length === 0 ? (
                <div className="text-center py-10">
                  <p>No products yet</p>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white rounded-xl"
                  >
                    + Add Product
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    + Add New Product
                  </button>

                  <div className="grid gap-4 max-h-[500px] overflow-y-auto">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="border-2 border-[#e8dcc8] rounded-xl p-4 hover:border-[#c2794d] transition-all cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          {product.image_url && (
                            <div className="flex-shrink-0">
                              <img
                                src={product.image_url}
                                alt={product.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                            </div>
                          )}

                          {/* Product Details */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#3d3021]">
                              {product.title}
                            </h4>
                            <p className="text-sm text-[#6d5a3d] mt-1 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm font-medium text-[#c2794d]">
                                ₹{product.price}
                              </span>
                              <span className="text-xs text-[#8b6f47]">
                                {product.category}
                              </span>
                            </div>
                            {product.video_url && (
                              <span className="text-xs text-blue-600 mt-1 inline-block">
                                📹 Video available
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Edit functionality - coming soon
                                alert("Edit feature coming soon!");
                              }}
                            >
                              ✏️
                            </button>
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="font-bold mb-3">Performance</h3>
              <ProgressRow label="Profile Views" percent="75%" />
              <ProgressRow label="Product Clicks" percent="60%" />
              <ProgressRow label="Conversion Rate" percent="45%" />
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="font-bold mb-3">Recent Activity</h3>
              <ActivityItem title="Order shipped" time="2 hours ago" />
              <ActivityItem title="New message" time="5 hours ago" />
              <ActivityItem title="AI Verified product" time="1 day ago" />
            </div>
          </div>
        </div>

        {showAddProduct && (
          <AddProductModal
            onClose={() => setShowAddProduct(false)}
            onProductAdded={async () => {
              console.log("🔄 Refreshing products after add...");
              // Refresh products list
              const response = await getProductsList(true); // Only fetch artisan's own products
              const productsList = response?.results || response || [];
              console.log("✅ Products refreshed:", productsList);
              console.log("📊 New products count:", productsList?.length || 0);

              // Force state update
              setProducts([]);
              setTimeout(() => {
                setProducts(productsList);
              }, 100);
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
            onUpdate={async () => {
              // Refresh profile data
              const profile = await getArtisanProfile();
              setArtisanData({
                title: `${profile.user?.first_name || ''} ${profile.user?.last_name || ''}`.trim() || "Artisan",
                profileImage: profile.profile_image_url || null,
                city: profile.user?.address?.city || "City",
                state: profile.user?.address?.state || "State",
                craftStory: profile.craft_story || "No story recorded yet.",
                speciality: profile.speciality || "Artisan",
                experience: profile.experience || 0,
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ProgressRow({ label, percent }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{percent}</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-gradient-to-r from-[#c2794d] to-[#8b6f47] h-2 rounded-full"
          style={{ width: percent }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ title, time }) {
  return (
    <div className="flex justify-between text-sm border-b py-2 last:border-0">
      <span>{title}</span>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}

/* ================= MODAL ================= */

function AddProductModal({ onClose, onProductAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    unit_price: 0,
    category: "",
    image: null,
    video: null,
    additionalImages: [], // Multiple images
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await processAudioDescription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
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
      const formData = new FormData();
      formData.append('file', audioBlob, 'description.webm');

      const response = await fetch('http://localhost:8001/process_product_description', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.description) {
        setFormData(prev => ({ ...prev, description: data.description }));
        alert('Description generated successfully!');
      } else {
        alert('Failed to generate description. Please try again.');
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Failed to process audio. Make sure microservices are running.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [type]: file });

      // Create preview
      if (type === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (type === 'video') {
        // For video, use URL.createObjectURL directly
        setVideoPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData({ ...formData, additionalImages: files });

      // Create previews for all images
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
    setFormData({ ...formData, additionalImages: newImages });
    setAdditionalImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('unit_price', formData.unit_price);
      data.append('category', formData.category);

      if (formData.image) {
        data.append('image', formData.image);
      }
      if (formData.video) {
        data.append('video', formData.video);
      }

      // Add multiple additional images
      if (formData.additionalImages.length > 0) {
        formData.additionalImages.forEach((img, index) => {
          data.append(`additional_images`, img);
        });
      }

      const result = await createProduct(data);
      console.log("Product created:", result);

      if (result === 1) {
        alert("Product added successfully!");

        // Reload the page to show new product
        window.location.reload();
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Product name"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Product Description
            </label>
            <textarea
              className="w-full p-3 border rounded-xl"
              placeholder="Description"
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />

            {/* Voice Recording Button */}
            <div className="mt-2 flex items-center gap-2">
              {!isRecording && !isProcessing && (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  🎤 Record Description
                </button>
              )}

              {isRecording && (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 animate-pulse"
                >
                  ⏹️ Stop Recording
                </button>
              )}

              {isProcessing && (
                <div className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
                  ⏳ Processing...
                </div>
              )}

              <span className="text-xs text-gray-500">
                {isRecording ? 'Recording... Speak in your language' : 'Or type manually'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              className="p-3 border rounded-xl"
              placeholder="Price"
              value={formData.unit_price}
              onChange={(e) =>
                setFormData({ ...formData, unit_price: e.target.value })
              }
              required
            />

            <select
              className="p-3 border rounded-xl bg-white"
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

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'image')}
              className="w-full p-3 border rounded-xl bg-white"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Product Video (Optional)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, 'video')}
              className="w-full p-3 border rounded-xl bg-white"
            />
            {videoPreview && (
              <div className="mt-2">
                <video
                  src={videoPreview}
                  controls
                  className="w-full max-h-48 rounded-lg bg-black"
                  preload="metadata"
                />
              </div>
            )}
          </div>

          {/* Multiple Additional Images */}
          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Additional Images (Optional - Multiple)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImagesChange}
              className="w-full p-3 border rounded-xl bg-white"
            />
            {additionalImagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {additionalImagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white py-2 rounded-xl"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


/* ================= PRODUCT DETAIL MODAL ================= */

function ProductDetailModal({ product, onClose }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Combine main image and additional images
  const allImages = [];
  if (product.image_url) {
    allImages.push(product.image_url);
  }
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => {
      if (img.image_url) {
        allImages.push(img.image_url);
      }
    });
  }

  // Navigation functions
  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex, allImages.length]);

  // 360° rotation handlers
  const handleMouseDown = (e) => {
    if (is360Mode && allImages.length > 1) {
      setIsDragging(true);
      setStartX(e.clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && is360Mode && allImages.length > 1) {
      const deltaX = e.clientX - startX;
      const sensitivity = 2;
      const newRotation = rotation + deltaX / sensitivity;

      setRotation(newRotation);
      setStartX(e.clientX);

      const imageIndex = Math.floor((newRotation / 360) * allImages.length) % allImages.length;
      const normalizedIndex = imageIndex < 0 ? allImages.length + imageIndex : imageIndex;
      setSelectedImageIndex(normalizedIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-rotate in 360 mode
  useEffect(() => {
    if (is360Mode && !isDragging && allImages.length > 1) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 1);
        const imageIndex = Math.floor((rotation / 360) * allImages.length) % allImages.length;
        const normalizedIndex = imageIndex < 0 ? allImages.length + imageIndex : imageIndex;
        setSelectedImageIndex(normalizedIndex);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [is360Mode, isDragging, rotation, allImages.length]);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#3d3021]">{product.title}</h2>
            <p className="text-sm text-[#8b6f47] mt-1">{product.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            {allImages.length > 0 && (
              <div className="relative">
                <div
                  className={`relative overflow-hidden rounded-xl bg-gray-100 ${is360Mode ? 'cursor-grab active:cursor-grabbing' : isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
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
                    className={`w-full transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'
                      }`}
                    style={{
                      minHeight: '400px',
                      maxHeight: '500px',
                      objectFit: 'contain',
                      userSelect: 'none'
                    }}
                    draggable="false"
                  />
                </div>

                {/* 360° Mode Toggle */}
                {allImages.length > 1 && (
                  <button
                    onClick={() => {
                      setIs360Mode(!is360Mode);
                      setIsZoomed(false);
                      setRotation(0);
                    }}
                    className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium transition-all ${is360Mode
                      ? 'bg-[#c2794d] text-white'
                      : 'bg-black/60 text-white hover:bg-black/80'
                      }`}
                  >
                    {is360Mode ? '🔄 360° ON' : '🔄 360° View'}
                  </button>
                )}

                {/* Previous/Next Buttons - Hidden in 360 mode */}
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

                {/* Zoom Indicator - Hidden in 360 mode */}
                {!is360Mode && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {isZoomed ? '🔍 Click to zoom out' : '🔍 Click to zoom in'}
                  </div>
                )}

                {/* 360 Mode Instruction */}
                {is360Mode && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {isDragging ? '🖱️ Dragging...' : '🖱️ Drag to rotate'}
                  </div>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>
            )}

            {/* Thumbnail Grid */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setIsZoomed(false);
                    }}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index
                      ? 'border-[#c2794d] ring-2 ring-[#c2794d]/30'
                      : 'border-gray-200 hover:border-[#c2794d]/50'
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

            {/* Video Section */}
            {product.video_url && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-[#3d3021]">Product Video</h3>
                <video
                  src={product.video_url}
                  controls
                  className="w-full rounded-xl bg-black"
                  style={{ maxHeight: '300px' }}
                  preload="metadata"
                />
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Price */}
            <div className="bg-gradient-to-r from-[#c2794d]/10 to-[#8b6f47]/10 rounded-xl p-6">
              <p className="text-sm text-[#8b6f47] mb-1">Price</p>
              <p className="text-4xl font-bold text-[#c2794d]">₹{product.price}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-[#3d3021] mb-2">Description</h3>
              <p className="text-[#6d5a3d] leading-relaxed">{product.description}</p>
            </div>

            {/* Artisan Info */}
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-[#8b6f47] mb-1">Crafted by</p>
              <p className="text-lg font-semibold text-[#3d3021]">{product.artisan}</p>
            </div>

            {/* Category Badge */}
            <div>
              <span className="inline-block bg-[#c2794d] text-white px-4 py-2 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


/* ================= EDIT PROFILE MODAL ================= */

function EditProfileModal({ artisanData, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    speciality: artisanData.speciality || '',
    experience: artisanData.experience || 0,
    bio: '',
    craft_story: artisanData.craftStory || '',
  });

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update artisan profile
      const response = await api.patch('store/artisan/profile/', formData);

      if (response.status === 200) {
        alert('Profile updated successfully!');
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#3d3021] mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Speciality */}
          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Craft Speciality
            </label>
            <input
              type="text"
              value={formData.speciality}
              onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
              className="w-full p-3 border rounded-xl"
              placeholder="e.g., Pottery, Textiles, Jewelry"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full p-3 border rounded-xl"
              min="0"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Bio (Optional)
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 border rounded-xl"
              rows="3"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Craft Story */}
          <div>
            <label className="block text-sm font-medium text-[#3d3021] mb-2">
              Craft Story
            </label>
            <textarea
              value={formData.craft_story}
              onChange={(e) => setFormData({ ...formData, craft_story: e.target.value })}
              className="w-full p-3 border rounded-xl"
              rows="4"
              placeholder="Share your craft story..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
