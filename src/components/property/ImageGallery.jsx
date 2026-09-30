import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function ImageGallery({ images = [], title = "Property Image" }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isOpen = lightboxIndex !== null;

  const handleNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Grid Layout: Main large image on left, 2-3 smaller images on right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
        
        {/* Primary Big Photo */}
        <div 
          onClick={() => setLightboxIndex(0)}
          className="md:col-span-2 relative h-72 sm:h-96 cursor-pointer group overflow-hidden select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(0)}
          title="Click to view full photos gallery"
        >
          <img
            src={images[0]}
            alt={`${title} - Primary`}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors pointer-events-none" />
          <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1.5 backdrop-blur-xs pointer-events-none">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Click to view {images.length} photos</span>
          </span>
          <span className="md:hidden absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] font-semibold px-2 py-1 rounded backdrop-blur-xs pointer-events-none">
            1 / {images.length} Photos
          </span>
        </div>

        {/* Thumbnail Column */}
        <div className="hidden md:flex flex-col gap-2.5">
          {images.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx + 1)}
              className="relative flex-1 cursor-pointer group overflow-hidden"
            >
              <img
                src={img}
                alt={`${title} - ${idx + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {idx === 1 && images.length > 3 && (
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white font-semibold text-sm">
                  +{images.length - 2} more photos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-1 text-xs">
              <span className="font-medium">
                Photo {lightboxIndex + 1} of {images.length} • {title}
              </span>
              <button
                onClick={handleClose}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Image */}
            <div className="relative w-full h-[65vh] flex items-center justify-center bg-black/40 rounded-lg overflow-hidden">
              <img
                src={images[lightboxIndex]}
                alt={`${title} - Large view`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Prev Button */}
              {images.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-3 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-3 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom thumbnail strip */}
            <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`w-14 h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                    lightboxIndex === i ? 'border-teal-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
