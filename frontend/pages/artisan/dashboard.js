import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/* ================= DASHBOARD ================= */

export default function ArtisanDashboard() {
  const router = useRouter();
  const data = [];
  const [artisanData] = useState({
    name: "Rajesh Kumar",
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
   
  useEffect(() => {
    
  })
  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: "🎨",
      change: "+3 this week",
      changeType: "positive",
      bgGradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Sales",
      value: "₹45,280",
      icon: "💰",
      change: "+12% this month",
      changeType: "positive",
      bgGradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Active Orders",
      value: "8",
      icon: "📦",
      change: "2 pending",
      changeType: "neutral",
      bgGradient: "from-orange-500 to-orange-600",
    },
    {
      title: "AI Verified",
      value: "18",
      icon: "✓",
      change: "75% of products",
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
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  {artisanData.profileImage ? (
                    <img
                      src={artisanData.profileImage}
                      alt={artisanData.name}
                      className="w-24 h-24 rounded-full object-cover border-4 shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c2794d] to-[#8b6f47] flex items-center justify-center border-4 shadow-md">
                      <span className="text-3xl text-white font-bold">
                        {artisanData.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <button className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                    Upload
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h2 className="font-bold text-xl">{artisanData.name}</h2>
                <p className="text-sm text-[#8b6f47]">
                  {artisanData.speciality}
                </p>

                <div className="text-xs text-[#6d5a3d] mt-2 space-y-1">
                  <p>
                    📍 {artisanData.city}, {artisanData.state}
                  </p>
                  <p>⭐ {artisanData.experience} years</p>
                </div>

                <button className="mt-4 w-full py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white rounded-xl">
                  Edit Profile
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
          <div className="lg:col-span-6 space-y-8">
            {/* STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
                    className={`text-xs font-medium ${
                      stat.changeType === "positive"
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
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">
                Products ({products.length})
              </h3>

              {products.length === 0 && (
                <div className="text-center py-10">
                  <p>No products yet</p>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white rounded-xl"
                  >
                    + Add Product
                  </button>
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
          <AddProductModal onClose={() => setShowAddProduct(false)} />
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

function AddProductModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Product name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <textarea
            className="w-full p-3 border rounded-xl"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-3 border rounded-xl"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <input
              className="p-3 border rounded-xl"
              placeholder="Stock"
              value={formData.inventory}
              onChange={(e) =>
                setFormData({ ...formData, inventory: e.target.value })
              }
            />
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
