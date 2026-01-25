import AppLayout from '../../components/AppLayout'
import { useRouter } from 'next/router'

export default function ProductPassport() {
  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout currentPage="product">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">

              {/* Product Gallery */}
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8">
                <div className="h-96 bg-gradient-to-br from-[#f8f6f3] to-[#e8dfd0] rounded-xl flex items-center justify-center mb-6">
                  <div className="text-9xl">🏺</div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-24 bg-[#f8f6f3] rounded-lg border-2 border-[#d4c5b0]/50 flex items-center justify-center cursor-pointer hover:border-[#c2794d] transition-colors"
                    >
                      <span className="text-3xl">🏺</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8">

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-[#3d3021] mb-2 font-display">
                      किसान पात्र (Terracotta Vase)
                    </h2>
                    <div className="flex items-center space-x-3 text-[#6d5a3d]">
                      <span className="font-medium">Kisan Patel</span>
                      <span>•</span>
                      <span>Gujarat, India</span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="text-4xl font-bold text-[#c2794d] mb-1">₹720</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-amber-500">★★★★★</span>
                      <span className="text-sm text-[#6d5a3d]">4.5 (28)</span>
                    </div>
                  </div>
                </div>

                {/* AI Story */}
                <div className="mb-6 p-4 bg-[#f8f6f3] rounded-xl border-2 border-[#d4c5b0]/50">
                  <h3 className="text-sm font-bold text-[#3d3021] mb-2 flex items-center space-x-2">
                    <span>🤖</span>
                    <span>AI-Generated Story</span>
                  </h3>
                  <p className="text-sm text-[#6d5a3d] leading-relaxed">
                    Traditional terracotta pottery handcrafted using clay from the banks of Sabarmati river.
                    This vase represents 300 years of family heritage in pottery making, passed down through
                    12 generations. Each piece is unique, shaped on a manual potter's wheel and fired in a
                    traditional wood-burning kiln for 8 hours.
                  </p>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">

                  <div>
                    <h3 className="text-sm font-bold text-[#3d3021] mb-3">Product Details</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Material:</dt>
                        <dd className="font-medium text-[#3d3021]">Terracotta Clay</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Height:</dt>
                        <dd className="font-medium text-[#3d3021]">18 inches</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Weight:</dt>
                        <dd className="font-medium text-[#3d3021]">2.5 kg</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Technique:</dt>
                        <dd className="font-medium text-[#3d3021]">Hand-thrown</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#3d3021] mb-3">Artisan Info</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Experience:</dt>
                        <dd className="font-medium text-[#3d3021]">35 years</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Village:</dt>
                        <dd className="font-medium text-[#3d3021]">Dharavi, Gujarat</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Craft Type:</dt>
                        <dd className="font-medium text-[#3d3021]">Pottery</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#6d5a3d]">Products:</dt>
                        <dd className="font-medium text-[#3d3021]">127 listed</dd>
                      </div>
                    </dl>
                  </div>

                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 py-4 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-lg">
                    Add to Cart
                  </button>
                  <button className="px-6 py-4 border-2 border-[#d4c5b0]/50 text-[#3d3021] font-semibold rounded-xl hover:bg-[#f8f6f3] transition-all duration-300">
                    ❤️
                  </button>
                </div>
              </div>

              {/* Recommended */}
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#3d3021] mb-6 font-display">
                  Recommended for You
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['🧺', '🪔', '📿'].map((emoji, i) => (
                    <div
                      key={i}
                      className="text-center p-4 bg-[#f8f6f3] rounded-xl border-2 border-[#d4c5b0]/50 hover:border-[#c2794d] cursor-pointer transition-colors"
                    >
                      <div className="text-5xl mb-2">{emoji}</div>
                      <p className="text-sm font-medium text-[#3d3021]">Similar Item</p>
                      <p className="text-xs text-[#6d5a3d]">₹{450 + i * 100}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">

                {/* Digital Passport */}
                <div className="bg-gradient-to-br from-white to-[#f8f6f3] rounded-2xl border-2 border-[#c2794d]/40 p-6 shadow-lg">

                  <h3 className="text-lg font-bold text-[#3d3021] mb-4 font-display">
                    📜 Digital Craft Passport
                  </h3>

                  <div className="bg-white rounded-xl p-6 mb-4 border-2 border-[#d4c5b0]/50">
                    <p className="text-center font-semibold">Scan QR Code</p>
                  </div>

                  <button className="w-full py-3 bg-white border-2 border-[#c2794d]/40 text-[#c2794d] font-semibold rounded-lg hover:bg-[#c2794d] hover:text-white transition-all">
                    Download Certificate
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  )
}
