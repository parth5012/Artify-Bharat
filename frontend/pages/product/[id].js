import AppLayout from '../../components/AppLayout'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { getProductDetail } from '@/utils/apiCalls'

export default function ProductPassport() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [is360Mode, setIs360Mode] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (id) {
      loadProduct()
    }
  }, [id])

  const loadProduct = async () => {
    setLoading(true)
    const data = await getProductDetail(id)
    setProduct(data)
    setLoading(false)
  }

  if (loading) {
    return (
      <AppLayout currentPage="product">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl text-[#6d5a3d]">Loading...</div>
        </div>
      </AppLayout>
    )
  }

  if (!product) {
    return (
      <AppLayout currentPage="product">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl text-[#6d5a3d]">Product not found</div>
        </div>
      </AppLayout>
    )
  }

  const allImages = [
    product.image_url,
    ...(product.images?.map(img => img.image_url) || [])
  ].filter(Boolean)

  const productVideo = product.video_url

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handle360Drag = (e) => {
    if (!is360Mode || !dragStart || allImages.length < 2) return

    const currentX = e.clientX || e.touches?.[0]?.clientX
    const diff = currentX - dragStart

    // Every 50px drag = switch to next/prev image
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage()
      } else {
        prevImage()
      }
      setDragStart(currentX)
    }
  }

  const start360Drag = (e) => {
    if (!is360Mode) return
    setDragStart(e.clientX || e.touches?.[0]?.clientX)
  }

  const end360Drag = () => {
    setDragStart(null)
  }

  return (
    <AppLayout currentPage="product">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">

              {/* Product Gallery with Carousel */}
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8">
                {/* Main Image/Video with Navigation */}
                <div
                  ref={imageRef}
                  className="relative h-[500px] bg-gradient-to-br from-[#f8f6f3] to-[#e8dfd0] rounded-xl overflow-hidden mb-6 group"
                  onMouseDown={start360Drag}
                  onMouseMove={handle360Drag}
                  onMouseUp={end360Drag}
                  onMouseLeave={end360Drag}
                  onTouchStart={start360Drag}
                  onTouchMove={handle360Drag}
                  onTouchEnd={end360Drag}
                >
                  {/* Navigation Arrows */}
                  {allImages.length > 1 && !is360Mode && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <span className="text-2xl text-[#3d3021]">←</span>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <span className="text-2xl text-[#3d3021]">→</span>
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {allImages.length > 0 && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 text-white text-sm rounded-lg">
                      {selectedImage + 1}/{allImages.length}
                    </div>
                  )}

                  {/* 360° View Toggle */}
                  {allImages.length > 1 && (
                    <button
                      onClick={() => setIs360Mode(!is360Mode)}
                      className={`absolute top-4 left-20 z-10 px-3 py-1 ${is360Mode ? 'bg-[#c2794d]' : 'bg-white/90'} ${is360Mode ? 'text-white' : 'text-[#3d3021]'} text-sm rounded-lg flex items-center space-x-1 transition-all hover:scale-105`}
                    >
                      <span>🔄</span>
                      <span>{is360Mode ? '360° Active - Drag to rotate' : '360° View'}</span>
                    </button>
                  )}

                  {/* Zoom Button */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 hover:bg-white text-[#3d3021] text-sm rounded-lg flex items-center space-x-1 transition-all"
                  >
                    <span>{isZoomed ? '🔍-' : '🔍+'}</span>
                    <span>{isZoomed ? 'Zoom Out' : 'Click to zoom in'}</span>
                  </button>

                  {/* Main Display */}
                  {productVideo && selectedImage === -1 ? (
                    <video
                      controls
                      className="w-full h-full object-contain"
                      src={productVideo}
                    >
                      Your browser does not support video.
                    </video>
                  ) : allImages[selectedImage] ? (
                    <img
                      src={allImages[selectedImage]}
                      alt={product.title}
                      className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-move' : is360Mode ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'} ${dragStart ? 'select-none' : ''}`}
                      onClick={() => !is360Mode && setIsZoomed(!isZoomed)}
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-9xl">🎨</div>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  {productVideo && (
                    <div
                      onClick={() => setSelectedImage(-1)}
                      className={`flex-shrink-0 w-24 h-24 bg-[#f8f6f3] rounded-lg border-2 ${selectedImage === -1 ? 'border-[#c2794d] ring-2 ring-[#c2794d]/30' : 'border-[#d4c5b0]/50'} flex items-center justify-center cursor-pointer hover:border-[#c2794d] transition-all`}
                    >
                      <span className="text-3xl">▶️</span>
                    </div>
                  )}
                  {allImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-24 h-24 bg-[#f8f6f3] rounded-lg border-2 ${selectedImage === i ? 'border-[#c2794d] ring-2 ring-[#c2794d]/30' : 'border-[#d4c5b0]/50'} overflow-hidden cursor-pointer hover:border-[#c2794d] transition-all`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8">

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-[#3d3021] mb-2 font-display">
                      {product.title}
                    </h2>
                    <div className="flex items-center space-x-3 text-[#6d5a3d]">
                      <span className="font-medium">{product.artisan?.business_name || 'Artisan'}</span>
                      <span>•</span>
                      <span>{product.artisan?.location || 'India'}</span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="text-4xl font-bold text-[#c2794d] mb-1">₹{product.unit_price}</div>
                    <div className="text-sm text-[#6d5a3d]">{product.category?.name || 'Handmade'}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 p-4 bg-[#f8f6f3] rounded-xl border-2 border-[#d4c5b0]/50">
                  <h3 className="text-sm font-bold text-[#3d3021] mb-2 flex items-center space-x-2">
                    <span>📝</span>
                    <span>Product Description</span>
                  </h3>
                  <p className="text-sm text-[#6d5a3d] leading-relaxed">
                    {product.description || 'Handcrafted with traditional techniques passed through generations.'}
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
