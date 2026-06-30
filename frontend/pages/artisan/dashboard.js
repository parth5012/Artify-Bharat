import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createProduct, getDashboardStats, getArtisanProfile, getProductsList, deleteProduct } from "@/utils/apiCalls";
import ProtectedRoute from "@/utils/ProtectedRoute";
import api from "@/utils/axiosConfig";
import ArtifyLogo from "../../components/ArtifyLogo";

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
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);

  // Check for verification success message
  useEffect(() => {
    if (router.query.verification === 'submitted') {
      setShowVerificationSuccess(true);
      // Clear the query parameter
      router.replace('/artisan/dashboard', undefined, { shallow: true });
    }
  }, [router.query]);

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
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0] relative overflow-hidden">
      {/* Constant Aesthetic Background Elements - Higher Opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Constant Floating Craft Elements - Increased Opacity */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#d4784a]/25 to-[#c6633f]/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#8b6f47]/22 to-[#a08f73]/18 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-[#d87651]/20 to-[#c85d3a]/15 rounded-full blur-2xl"></div>

        {/* Constant Organic Shapes - Higher Opacity */}
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-br from-[#b5a389]/30 to-transparent rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-br from-[#e19576]/25 to-transparent rounded-full"></div>

        {/* Additional constant decorative elements - Higher Opacity */}
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-gradient-to-br from-[#d4af37]/22 to-transparent rounded-full blur-md"></div>
        <div className="absolute bottom-1/4 right-5 w-18 h-18 bg-gradient-to-br from-[#8b4513]/18 to-transparent rounded-full blur-lg"></div>

        {/* Additional Rich Background Elements */}
        <div className="absolute top-10 left-1/3 w-28 h-28 bg-gradient-to-br from-[#722f37]/16 to-[#a0522d]/12 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-36 h-36 bg-gradient-to-br from-[#8b4513]/14 to-[#d4af37]/10 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 left-1/5 w-20 h-20 bg-gradient-to-br from-[#cd853f]/18 to-[#daa520]/14 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/2 right-1/5 w-24 h-24 bg-gradient-to-br from-[#b8860b]/16 to-[#daa520]/12 rounded-full blur-md"></div>

        {/* Craft Image Backgrounds - Constant and Higher Opacity */}
        <div className="absolute top-16 right-1/3 w-20 h-20 opacity-[0.15] blur-[3px] rotate-12">
          <img src="/images/img_1ab.jpg" alt="" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="absolute bottom-24 left-1/5 w-16 h-16 opacity-[0.18] blur-[2px] -rotate-8">
          <img src="/images/img3_ab.jpg" alt="" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="absolute top-1/4 left-1/2 w-14 h-14 opacity-[0.12] blur-[4px] rotate-45">
          <img src="/images/states/kashmir.jpg" alt="" className="w-full h-full object-cover rounded-xl" />
        </div>
        <div className="absolute bottom-1/3 right-1/6 w-18 h-18 opacity-[0.16] blur-[3px] -rotate-30">
          <img src="/images/states/rajasthan.jpg" alt="" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Verification Success Message */}
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ENHANCED HEADER WITH LOGO */}
          <div className="relative">
            {/* Glass morphism header background */}
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

              {/* Enhanced Quick Actions */}
              <div className="hidden md:flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="relative px-8 py-4 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all flex items-center gap-3 font-modern font-semibold"
                  >
                    <span className="text-xl">✨</span>
                    <span>Add New Product</span>
                  </button>
                </div>

                <button
                  onClick={() => router.push('/buyer/marketplace')}
                  className="px-6 py-4 bg-white/60 backdrop-blur-sm border border-white/30 text-[#8b6f47] rounded-2xl hover:bg-white/80 transition-all flex items-center gap-2 font-modern"
                >
                  <span>🏪</span>
                  <span>View Marketplace</span>
                </button>
              </div>
            </div>
          </div>

          {/* ENHANCED MAIN GRID */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* ENHANCED PROFILE SECTION */}
            <div className="lg:col-span-3 space-y-6">
              <div className="relative group">
                {/* Glass morphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-warm"></div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full opacity-60 animate-pulse-slow"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-[#d4784a] to-[#c6633f] rounded-full opacity-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

                <div className="relative p-8 min-h-[600px] flex flex-col">
                  {/* Enhanced Profile Image Section */}
                  <div className="flex justify-center mb-6">
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
                                setArtisanData(prev => ({
                                  ...prev,
                                  profileImage: response.data.profile_image_url
                                }));
                                alert('Profile photo updated! ✨');
                              }
                            } catch (error) {
                              console.error('Upload failed:', error);
                              alert('Failed to upload photo');
                            }
                          }
                        }}
                      />

                      <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a] to-[#8b6f47] rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>

                        {artisanData.profileImage ? (
                          <img
                            src={artisanData.profileImage}
                            alt={artisanData.title}
                            className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-warm group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#d4784a] to-[#8b6f47] flex items-center justify-center border-4 border-white shadow-warm group-hover:scale-105 transition-transform">
                            <span className="text-4xl text-white font-bold font-artistic">
                              {artisanData.title.charAt(0)}
                            </span>
                          </div>
                        )}

                        <label
                          htmlFor="profile-image-upload"
                          className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm cursor-pointer font-modern"
                        >
                          📸 Upload
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Profile Info */}
                  <div className="text-center flex-1">
                    <h2 className="font-artistic font-bold text-2xl text-[#3d3021] mb-2">
                      {artisanData.title}
                    </h2>
                    <p className="text-lg font-handwritten text-[#8b6f47] mb-4">
                      {artisanData.speciality}
                    </p>

                    <div className="flex justify-center gap-6 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-xl flex items-center justify-center mb-2">
                          <span className="text-xl">📍</span>
                        </div>
                        <p className="text-sm font-modern text-[#6d5a3d]">
                          {artisanData.city}, {artisanData.state}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37]/20 to-[#b8860b]/20 rounded-xl flex items-center justify-center mb-2">
                          <span className="text-xl">⭐</span>
                        </div>
                        <p className="text-sm font-modern text-[#6d5a3d]">
                          {artisanData.experience} years
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowEditProfile(true)}
                        className="w-full py-3 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold flex items-center justify-center gap-2"
                      >
                        <span>✏️</span>
                        Edit Profile
                      </button>

                      <button
                        onClick={() => router.push('/artisan/verify')}
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
                  </div>

                  {/* Enhanced Craft Story */}
                  <div className="mt-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-2xl"></div>
                    <div className="relative p-4 border border-amber-200/50 rounded-2xl">
                      <h3 className="text-lg font-artistic font-bold mb-2 text-[#8b6f47] flex items-center gap-2">
                        <span>✨</span>
                        My Craft Story
                      </h3>
                      <p className="text-sm font-handwritten text-[#6d5a3d] leading-relaxed">
                        {artisanData.craftStory}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ENHANCED CENTER COLUMN — STATS + PRODUCTS */}
            <div className="lg:col-span-6 space-y-8">
              {/* ENHANCED STATS SECTION */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-3xl border border-white/20"></div>
                <div className="relative p-6">
                  <h3 className="text-2xl font-artistic font-bold text-[#3d3021] mb-6 flex items-center gap-2">
                    <span>📊</span>
                    Performance Overview
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                      <div key={i} className="relative group">
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity`}></div>

                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 p-5 shadow-soft hover:shadow-warm transition-all group-hover:scale-105">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center text-xl text-white shadow-lg`}>
                              {stat.icon}
                            </div>
                            <div className="text-right">
                              <p className={`text-xs font-medium ${stat.changeType === "positive" ? "text-green-600" : stat.changeType === "negative" ? "text-red-600" : "text-[#8b6f47]"}`}>
                                {stat.change > 0 ? '+' : ''}{stat.change}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm font-modern text-[#6d5a3d] mb-1">{stat.title}</p>
                          <h3 className="text-3xl font-bold font-artistic text-[#3d3021]">
                            {stat.value}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ENHANCED PRODUCTS SECTION */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-3xl border border-white/20"></div>
                <div className="relative p-6 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-artistic font-bold text-[#3d3021] flex items-center gap-2">
                      <span>🎨</span>
                      My Products ({products.length})
                    </h3>

                    {products.length > 0 && (
                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="px-6 py-3 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold flex items-center gap-2"
                      >
                        <span>✨</span>
                        Add New
                      </button>
                    )}
                  </div>

                  {products.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🎨</span>
                      </div>
                      <h4 className="text-xl font-artistic font-bold text-[#3d3021] mb-2">No products yet</h4>
                      <p className="text-[#6d5a3d] font-handwritten mb-6">Start showcasing your beautiful crafts to the world!</p>
                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="px-8 py-4 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white rounded-2xl hover:shadow-warm transition-all font-modern font-semibold flex items-center gap-2 mx-auto"
                      >
                        <span>✨</span>
                        Create Your First Product
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="relative group">
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#d4784a]/10 to-[#8b6f47]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>

                          <div
                            className="relative bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-5 hover:shadow-warm transition-all cursor-pointer group-hover:scale-[1.02]"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <div className="flex gap-5">
                              {/* Enhanced Product Image */}
                              {product.image_url && (
                                <div className="flex-shrink-0 relative">
                                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-xl blur-lg opacity-50"></div>
                                  <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="relative w-28 h-28 object-cover rounded-xl border-2 border-white shadow-soft"
                                  />
                                  {product.video_url && (
                                    <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">▶</span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Enhanced Product Details */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-artistic font-bold text-lg text-[#3d3021] mb-1 truncate">
                                  {product.title}
                                </h4>
                                <p className="text-sm font-handwritten text-[#6d5a3d] mb-3 line-clamp-2 leading-relaxed">
                                  {product.description}
                                </p>

                                <div className="flex items-center gap-4 mb-2">
                                  <div className="flex items-center gap-1">
                                    <span className="text-lg">₹</span>
                                    <span className="text-xl font-bold font-modern text-[#d4784a]">
                                      {product.price}
                                    </span>
                                  </div>

                                  <span className="px-3 py-1 bg-gradient-to-r from-[#d4784a]/20 to-[#8b6f47]/20 text-[#8b6f47] rounded-full text-xs font-medium">
                                    {product.category}
                                  </span>
                                </div>

                                {product.video_url && (
                                  <div className="flex items-center gap-1 text-xs text-blue-600">
                                    <span>📹</span>
                                    <span>Video showcase available</span>
                                  </div>
                                )}
                              </div>

                              {/* Enhanced Action Buttons */}
                              <div className="flex flex-col gap-2">
                                <button
                                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group/btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert("Edit feature coming soon! ✨");
                                  }}
                                  title="Edit Product"
                                >
                                  <span className="group-hover/btn:scale-110 transition-transform inline-block">✏️</span>
                                </button>
                                <button
                                  className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group/btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProduct(product.id, product.title);
                                  }}
                                  title="Delete Product"
                                >
                                  <span className="group-hover/btn:scale-110 transition-transform inline-block">🗑️</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ENHANCED SIDEBAR */}
            <div className="lg:col-span-3 space-y-6">
              {/* Enhanced Performance Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-soft"></div>
                <div className="relative p-6">
                  <h3 className="text-xl font-artistic font-bold text-[#3d3021] mb-4 flex items-center gap-2">
                    <span>📈</span>
                    Performance Insights
                  </h3>
                  <div className="space-y-4">
                    <EnhancedProgressRow label="Profile Views" percent="75%" color="from-blue-500 to-blue-600" />
                    <EnhancedProgressRow label="Product Clicks" percent="60%" color="from-green-500 to-green-600" />
                    <EnhancedProgressRow label="Conversion Rate" percent="45%" color="from-purple-500 to-purple-600" />
                  </div>
                </div>
              </div>

              {/* Enhanced Recent Activity */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-soft"></div>
                <div className="relative p-6">
                  <h3 className="text-xl font-artistic font-bold text-[#3d3021] mb-4 flex items-center gap-2">
                    <span>🔔</span>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <EnhancedActivityItem icon="📦" title="Order shipped" time="2 hours ago" type="success" />
                    <EnhancedActivityItem icon="💬" title="New message" time="5 hours ago" type="info" />
                    <EnhancedActivityItem icon="✅" title="AI Verified product" time="1 day ago" type="success" />
                    <EnhancedActivityItem icon="👁️" title="Profile viewed" time="3 hours ago" type="neutral" />
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-soft"></div>
                <div className="relative p-6">
                  <h3 className="text-xl font-artistic font-bold text-[#3d3021] mb-4 flex items-center gap-2">
                    <span>⚡</span>
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/buyer/marketplace')}
                      className="w-full p-3 bg-gradient-to-r from-[#d4784a]/20 to-[#8b6f47]/20 hover:from-[#d4784a]/30 hover:to-[#8b6f47]/30 text-[#8b6f47] rounded-xl transition-all font-modern flex items-center gap-2"
                    >
                      <span>🏪</span>
                      View Marketplace
                    </button>
                    <button
                      onClick={() => setShowAddProduct(true)}
                      className="w-full p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-700 rounded-xl transition-all font-modern flex items-center gap-2"
                    >
                      <span>➕</span>
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODALS */}
      {showAddProduct && (
        <AddProductModal
          onClose={() => setShowAddProduct(false)}
          onProductAdded={async () => {
            console.log("🔄 Refreshing products after add...");
            const response = await getProductsList(true);
            const productsList = response?.results || response || [];
            console.log("✅ Products refreshed:", productsList);
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
    // </div>
  );
}
showEditProfile && (
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
    </div >
  );
}

/* ================= ENHANCED COMPONENTS ================= */

function EnhancedProgressRow({ label, percent, color }) {
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

function EnhancedActivityItem({ icon, title, time, type }) {
  const typeColors = {
    success: 'from-green-500/20 to-emerald-500/20 text-green-700',
    info: 'from-blue-500/20 to-cyan-500/20 text-blue-700',
    neutral: 'from-gray-500/20 to-slate-500/20 text-gray-700',
    warning: 'from-yellow-500/20 to-orange-500/20 text-yellow-700'
  };

  return (
    <div className={`flex items-center justify-between p-3 bg-gradient-to-r ${typeColors[type] || typeColors.neutral} rounded-xl border border-white/30 backdrop-blur-sm`}>
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="font-modern text-sm">{title}</span>
      </div>
      <span className="text-xs opacity-70 font-handwritten">{time}</span>
    </div>
  );
}

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

/* ================= ENHANCED MODAL ================= */

function AddProductModal({ onClose, onProductAdded }) {
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
        alert('Description generated successfully! ✨');
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

      if (type === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (type === 'video') {
        setVideoPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData({ ...formData, additionalImages: files });

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

      if (formData.additionalImages.length > 0) {
        formData.additionalImages.forEach((img, index) => {
          data.append(`additional_images`, img);
        });
      }

      const result = await createProduct(data);
      console.log("Product created:", result);

      if (result === 1) {
        alert("Product added successfully! ✨");
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full my-8">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"></div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full opacity-60 animate-pulse-slow"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#d4784a] to-[#c6633f] rounded-full opacity-40 animate-pulse-slow"></div>

        <div className="relative p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-artistic font-bold text-[#3d3021] flex items-center gap-3">
              <span>✨</span>
              Add New Product
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-600 rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Product Name
              </label>
              <input
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                placeholder="Enter your beautiful craft's name..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Description with Voice Recording */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Product Description
              </label>
              <textarea
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-handwritten placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                placeholder="Tell the story of your craft..."
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />

              {/* Enhanced Voice Recording */}
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
                  {isRecording ? 'Speak in your language...' : 'Or type manually above'}
                </span>
              </div>
            </div>

            {/* Price and Category */}
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
                  onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

            {/* Enhanced Image Upload */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Main Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image')}
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#d4784a] file:text-white file:font-medium hover:file:bg-[#c6633f] transition-colors"
              />
              {imagePreview && (
                <div className="mt-4 relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-2xl blur-lg"></div>
                  <img src={imagePreview} alt="Preview" className="relative w-40 h-40 object-cover rounded-2xl border-2 border-white shadow-warm" />
                </div>
              )}
            </div>

            {/* Enhanced Video Upload */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Product Video (Optional)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, 'video')}
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

            {/* Enhanced Multiple Images */}
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

            {/* Enhanced Action Buttons */}
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


/* ================= PRODUCT DETAIL MODAL ================= */

function ProductDetailModal({ product, onClose }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

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

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-4xl w-full my-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"></div>

        <div className="relative p-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-artistic font-bold text-[#3d3021]">{product.title}</h2>
              <p className="text-lg font-handwritten text-[#8b6f47] mt-1">{product.category}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-600 rounded-full flex items-center justify-center transition-colors text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {allImages.length > 0 && (
                <div className="relative">
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gray-100 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <img
                      src={allImages[selectedImageIndex]}
                      alt={`${product.title} - View ${selectedImageIndex + 1}`}
                      className={`w-full transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                      style={{
                        minHeight: '400px',
                        maxHeight: '500px',
                        objectFit: 'contain',
                        userSelect: 'none'
                      }}
                      draggable="false"
                    />
                  </div>

                  {/* Previous/Next Buttons */}
                  {allImages.length > 1 && (
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
                        ? 'border-[#d4784a] ring-2 ring-[#d4784a]/30'
                        : 'border-gray-200 hover:border-[#d4784a]/50'
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
                  <h3 className="text-xl font-artistic font-semibold mb-3 text-[#3d3021]">Product Video</h3>
                  <video
                    src={product.video_url}
                    controls
                    className="w-full rounded-2xl bg-black shadow-warm"
                    style={{ maxHeight: '300px' }}
                    preload="metadata"
                  />
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Price */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/10 to-[#8b6f47]/10 rounded-2xl"></div>
                <div className="relative p-6 border border-[#d4784a]/20 rounded-2xl">
                  <p className="text-sm font-modern text-[#8b6f47] mb-1">Price</p>
                  <p className="text-5xl font-bold font-artistic text-[#d4784a]">₹{product.price}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-artistic font-semibold text-[#3d3021] mb-3">Description</h3>
                <p className="text-[#6d5a3d] font-handwritten leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Artisan Info */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-2xl"></div>
                <div className="relative p-4 border border-amber-200/50 rounded-2xl">
                  <p className="text-sm font-modern text-[#8b6f47] mb-1">Crafted by</p>
                  <p className="text-xl font-artistic font-semibold text-[#3d3021]">{product.artisan}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div>
                <span className="inline-block bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-white px-6 py-3 rounded-full text-lg font-modern font-medium">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Close Button */}
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
      const response = await api.patch('store/artisan/profile/', formData);

      if (response.status === 200) {
        alert('Profile updated successfully! ✨');
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile. Please try again.');
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
            {/* Speciality */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Craft Speciality
              </label>
              <input
                type="text"
                value={formData.speciality}
                onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                placeholder="e.g., Pottery, Textiles, Jewelry"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Years of Experience
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-modern placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                min="0"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Bio (Optional)
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-handwritten placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                rows="3"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Craft Story */}
            <div>
              <label className="block text-lg font-artistic font-semibold text-[#3d3021] mb-3">
                Craft Story
              </label>
              <textarea
                value={formData.craft_story}
                onChange={(e) => setFormData({ ...formData, craft_story: e.target.value })}
                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-handwritten placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#d4784a]/50"
                rows="4"
                placeholder="Share your craft story..."
              />
            </div>

            {/* Buttons */}
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
