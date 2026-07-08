import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, Copy, Check, ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getEventById, getRelatedEvents } from '../data/events'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}
export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const event = id ? getEventById(id) : undefined
  const [copied, setCopied] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const relatedEvents = event ? getRelatedEvents(event.id, 3) : []

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i > 0 ? i - 1 : 7))
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i < 7 ? i + 1 : 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen])

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink text-center">
        <h1 className="font-display text-2xl font-semibold text-silver">赛事不存在</h1>
        <p className="mt-2 text-muted">抱歉，找不到该赛事信息</p>
        <Link to="/events" className="mt-6 text-emerald hover:underline">返回赛事中心</Link>
      </div>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(event.photoLiveUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = event.photoLiveUrl
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const statusBadge = event.status === 'live'
    ? <span className="animate-pulse-glow inline-flex items-center gap-1.5 rounded-full bg-[#34d399] px-2.5 py-1 text-xs font-medium text-ink"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-ink" /></span>直播中</span>
    : event.status === 'upcoming'
    ? <span className="inline-flex items-center rounded-full bg-[#8b5cf6] px-2.5 py-1 text-xs font-medium text-white">即将开始</span>
    : <span className="inline-flex items-center rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-xs font-medium text-muted">已结束</span>

  const galleryImages = Array.from({ length: 8 }, (_, i) => `/photo-grid-${i + 1}.jpg`)

  return (
    <div className="min-h-screen bg-ink pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <img src={event.coverImage} alt={event.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-4 pb-8 lg:px-8">
          <Link to="/events" className="mb-4 flex items-center gap-1 text-sm text-muted transition-colors hover:text-silver">
            <ArrowLeft className="h-4 w-4" /> 返回赛事中心
          </Link>
          {statusBadge}
          <h1 className="mt-3 font-display text-2xl font-semibold text-silver lg:text-4xl" style={{ wordBreak: 'keep-all' }}>
            {event.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-muted">{event.date} · {event.location}</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-[rgba(255,255,255,0.05)] bg-ink">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="font-mono text-2xl font-bold text-emerald">{event.photoCount.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted">照片数量</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-orange">{(event.photoCount * 3 + 123).toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted">浏览次数</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-silver">{event.sportType}</p>
            <p className="mt-1 text-xs text-muted">赛事类型</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-silver">{event.status === 'live' ? '进行中' : event.status === 'upcoming' ? '未开始' : '已结束'}</p>
            <p className="mt-1 text-xs text-muted">赛事状态</p>
          </div>
        </div>
      </section>

      {/* Photo Live CTA */}
      <section className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8">
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp}
          className="glass-card relative overflow-hidden rounded-2xl p-8 text-center lg:p-12"
        >
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-0 h-[200px] w-[200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-xl font-semibold text-silver lg:text-2xl">
              {event.status === 'live' ? '照片直播进行中' : event.status === 'upcoming' ? '照片直播即将开启' : '照片直播已归档'}
            </h2>
            <p className="mx-auto mt-3 max-w-[500px] text-sm text-muted">
              {event.status === 'live'
                ? '摄影师正在现场实时上传照片，点击下方按钮进入照片直播页面'
                : event.status === 'upcoming'
                ? '赛事即将开始，照片直播将在赛事开始时自动开启'
                : '赛事已结束，点击下方按钮查看所有精彩照片'}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={event.photoLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-cta inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white shadow-glow-orange transition-all hover:brightness-110"
              >
                进入照片直播 <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-transparent px-6 py-3 text-sm text-silver transition-all hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
              >
                {copied ? <><Check className="h-4 w-4 text-emerald" /> 已复制</> : <><Copy className="h-4 w-4" /> 复制链接</>}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Description */}
      <section className="mx-auto max-w-[1280px] px-4 pb-10 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="font-display text-lg font-semibold text-silver">赛事介绍</h2>
          <p className="mt-3 leading-relaxed text-muted">{event.description}</p>
        </motion.div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="mx-auto max-w-[1280px] px-4 pb-10 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="font-display text-lg font-semibold text-silver">照片预览</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
              >
                <img src={src} alt={`照片 ${i + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0)] transition-all group-hover:bg-[rgba(0,0,0,0.4)]">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(0,0,0,0.95)]"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute right-4 top-4 z-10 rounded-full bg-[rgba(255,255,255,0.1)] p-2 text-white hover:bg-[rgba(255,255,255,0.2)]">
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.1)] p-2 text-white hover:bg-[rgba(255,255,255,0.2)]"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i > 0 ? i - 1 : 7)) }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.1)] p-2 text-white hover:bg-[rgba(255,255,255,0.2)]"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i < 7 ? i + 1 : 0)) }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="max-h-[80vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <img src={galleryImages[lightboxIndex]} alt={`照片 ${lightboxIndex + 1}`} className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain" />
            </div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-muted">
              {lightboxIndex + 1} / {galleryImages.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="font-display text-lg font-semibold text-silver">相关赛事</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedEvents.map((e) => (
                <Link key={e.id} to={`/events/${e.id}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <img src={e.coverImage} alt={e.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="line-clamp-1 font-display text-sm font-medium text-white">{e.name}</p>
                      <p className="mt-1 font-mono text-[10px] text-[#a1a1aa]">{e.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  )
}
