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
