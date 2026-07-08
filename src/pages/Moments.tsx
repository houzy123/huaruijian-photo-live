import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getAllPhotos, getPhotosBySportType, sportTypeFilters } from '../data/photos'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function Moments() {
  const [activeFilter, setActiveFilter] = useState('全部')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(8)

  const photos = useMemo(() => {
    const all = activeFilter === '全部' ? getAllPhotos() : getPhotosBySportType(activeFilter)
    return all.slice(0, visibleCount)
  }, [activeFilter, visibleCount])

  const allPhotos = useMemo(() => activeFilter === '全部' ? getAllPhotos() : getPhotosBySportType(activeFilter), [activeFilter])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i > 0 ? i - 1 : photos.length - 1))
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i < photos.length - 1 ? i + 1 : 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, photos.length])

  return (
    <div className="min-h-screen bg-ink pb-20">
      {/* Header */}
      <section className="relative overflow-hidden px-4 pb-6 pt-12 lg:px-8 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="relative mx-auto max-w-[1280px]">
          <motion.span initial="hidden" animate="visible" variants={fadeUp} className="mb-2 block font-mono text-xs uppercase tracking-[0.1em] text-orange">
            MOMENTS
          </motion.span>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-[32px] font-semibold text-silver lg:text-[56px]">
            精彩瞬间
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="mt-3 max-w-[500px] text-muted">
            定向越野精彩瞬间，定格每一次奔跑的快乐
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1280px] px-4 pb-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {sportTypeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); setVisibleCount(8) }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-orange text-white'
                  : 'border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-muted hover:text-silver'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <motion.div
          className="columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={`${photo.id}-${activeFilter}`}
              variants={scaleIn}
              className="group relative mb-4 cursor-pointer break-inside-avoid overflow-hidden rounded-xl lg:mb-6"
              onClick={() => { setLightboxIndex(index); setLightboxOpen(true) }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0)] transition-all duration-300 group-hover:bg-[rgba(0,0,0,0.4)]">
                <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs text-white">{photo.alt}</p>
                <p className="mt-0.5 text-[10px] text-[#a1a1aa]">{photo.eventName}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load more */}
        {visibleCount < allPhotos.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 8)}
              className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-transparent px-6 py-3 text-sm text-silver transition-all hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
            >
              加载更多精彩
            </button>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && photos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(0,0,0,0.95)]"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute right-4 top-4 z-10 rounded-full bg-[rgba(255,255,255,0.1)] p-2 text-white hover:bg-[rgba(255,255,255,0.2)]">
              <X className="h-6 w-6" />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.1)] p-2 text-white hover:bg-[rgba(255,255,255,0.2)]"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i > 0 ? i - 1 : photos.length - 1)) }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.1)] p-2 text-white hover:bg-[rgba(255,255,255,0.2)]"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i < photos.length - 1 ? i + 1 : 0)) }}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <div className="max-h-[80vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <span className="font-mono text-sm text-muted">{lightboxIndex + 1} / {photos.length}</span>
              <p className="mt-1 text-sm text-white">{photos[lightboxIndex].alt}</p>
              <p className="text-xs text-muted">{photos[lightboxIndex].eventName}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
