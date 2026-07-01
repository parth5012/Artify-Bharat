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
