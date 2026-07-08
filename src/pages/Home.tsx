import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ZoomIn,
  QrCode,
  MousePointerClick,
  Images,
} from 'lucide-react'
import { getFeaturedEvents, getLiveEvents } from '../data/events'
import type { EventStatus } from '../data/events'
import type { Variants } from 'framer-motion'

/* ─────────────────────── animation variants ─────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

/* ─────────────────────── helpers ─────────────────────── */

function StatusBadge({ status }: { status: EventStatus }) {
  if (status === 'live') {
    return (
      <span className="animate-pulse-glow inline-flex items-center gap-1.5 rounded-full bg-[#34d399] px-2.5 py-1 text-xs font-medium text-ink">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
        </span>
        直播中
      </span>
    )
  }
  if (status === 'upcoming') {
    return (
      <span className="inline-flex items-center rounded-full bg-[#8b5cf6] px-2.5 py-1 text-xs font-medium text-white">
        即将开始
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-xs font-medium text-muted">
      已结束
    </span>
  )
}

function PhotoCount({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="absolute right-3 top-3 rounded-full bg-[rgba(0,0,0,0.6)] px-2 py-1 font-mono text-xs text-white backdrop-blur-sm">
      {count.toLocaleString()} 张照片
    </span>
  )
}

/* ─────────────────────── Section: Hero ─────────────────────── */

function HeroSection() {
  const heroImages = [
    '/hero-athlete-1.jpg',
    '/hero-athlete-2.jpg',
    '/hero-athlete-3.jpg',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative min-h-[100dvh] overflow-hidden hero-gradient">
      {/* Background grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Neon glow */}
      <div className="pointer-events-none absolute inset-0 neon-glow" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col items-center justify-center px-4 py-20 lg:flex-row lg:px-8">
        {/* Left: Text content */}
        <motion.div
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-emerald"
          >
            华瑞健定向
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[40px] font-bold leading-[1.1] tracking-tight text-silver lg:text-[80px]"
            style={{ wordBreak: 'keep-all' }}
          >
            <span className="block">记录定向</span>
            <span className="block">越野的</span>
            <span className="block text-orange">精彩</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[480px] text-[15px] leading-relaxed text-muted lg:text-base"
          >
            华瑞健定向俱乐部，专注定向越野培训与赛事承办。扫描下方二维码关注公众号，查看赛事照片直播。
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Link
              to="/events"
              className="gradient-cta flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-glow-orange transition-all duration-300 hover:brightness-110"
            >
              浏览赛事
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.2)] bg-transparent px-6 py-3 text-sm font-medium text-silver transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)]"
            >
              了解更多
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center lg:items-start"
          >
            <div className="h-[100px] w-[100px] overflow-hidden rounded-xl bg-white p-1">
              <img
                src="/wechat-qr.png"
                alt="扫码关注公众号"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="mt-2 text-xs text-[#52525b]">
              扫码关注公众号
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Image stack carousel */}
        <div className="relative mt-12 flex h-[380px] w-full flex-1 items-center justify-center lg:mt-0 lg:h-[500px]">
          <AnimatePresence mode="popLayout">
            {heroImages.map((img, index) => {
              const offset = (index - currentIndex + heroImages.length) % heroImages.length
              const isActive = offset === 0
              const isPrev = offset === heroImages.length - 1
              const isNext = offset === 1

              if (!isActive && !isPrev && !isNext) return null

              const transforms = [
                'rotate(-6deg) translateY(-20px)',
                'rotate(3deg) translateY(10px)',
                'rotate(-2deg) translateY(40px)',
              ]

              const sizes = [
                'w-[280px] h-[350px] lg:w-[320px] lg:h-[400px]',
                'w-[260px] h-[330px] lg:w-[300px] lg:h-[380px]',
                'w-[240px] h-[310px] lg:w-[280px] lg:h-[360px]',
              ]

              const zIndexes = [30, 20, 10]
              const opacities = [1, 0.7, 0.5]

              const visualIndex = (index - currentIndex + heroImages.length) % heroImages.length

              return (
                <motion.div
                  key={img}
                  className={`absolute rounded-2xl overflow-hidden shadow-2xl ${sizes[visualIndex]}`}
                  style={{
                    zIndex: zIndexes[visualIndex],
                    transform: transforms[visualIndex],
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: opacities[visualIndex],
                    x: 0,
                    scale: isActive ? 1 : 0.95,
                  }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <img
                    src={img}
                    alt={`体育摄影 ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 shadow-glow-green pointer-events-none" />
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Section: Live Ticker ─────────────────────── */

function LiveTickerSection() {
  const liveEvents = getLiveEvents()
  const tickerItems = liveEvents.length > 0 ? liveEvents : [
    { id: '1', name: '华瑞健定向俱乐部周末训练', photoCount: 486, sportType: '定向越野' },
    { id: '2', name: '广东省第十二届大学生运动会"华瑞健杯"定向越野比赛', photoCount: 3280, sportType: '定向越野' },
  ]

  const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]

  return (
    <section
      className="relative w-full overflow-hidden bg-ink py-5"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {duplicatedItems.map((event, index) => (
          <div key={`${event.id}-${index}`} className="flex shrink-0 items-center gap-3 px-6">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald" />
            <span className="whitespace-nowrap text-[15px] text-silver">
              {event.name}
            </span>
            <span className="text-[#52525b]">·</span>
            <span className="whitespace-nowrap font-mono text-xs text-muted">
              {event.photoCount.toLocaleString()} 张照片
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────── Section: Featured Events ─────────────────────── */

function FeaturedEventsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const featuredEvents = getFeaturedEvents()

  return (
    <section className="relative bg-ink py-16 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 block font-mono text-xs uppercase tracking-[0.1em] text-emerald"
          >
            FEATURED
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[26px] font-semibold leading-tight text-silver lg:text-[42px]"
          >
            精选定向赛事
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-muted">
            华瑞健定向举办的精彩定向越野赛事
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {featuredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={scaleIn}
              className="group relative cursor-pointer"
            >
              <Link to={`/events/${event.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <img
                    src={event.coverImage}
                    alt={event.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-transparent to-transparent" />

                  {/* Status badge */}
                  <div className="absolute bottom-4 left-4">
                    <StatusBadge status={event.status} />
                  </div>

                  {/* Photo count */}
                  <PhotoCount count={event.photoCount} />

                  {/* Event info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-lg font-semibold text-white lg:text-xl">
                      {event.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[#a1a1aa]">
                      {event.date} · {event.location}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/events"
            className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-transparent px-6 py-3 text-sm text-silver transition-all duration-300 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
          >
            查看全部赛事 →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────── Section: Moments Preview ─────────────────────── */

const photoGridImages = [
  { src: '/photo-grid-1.jpg', title: '省大运会定向赛', aspect: 'landscape' },
  { src: '/photo-grid-2.jpg', title: '五一训练营', aspect: 'portrait' },
  { src: '/photo-grid-3.jpg', title: '周末定向训练', aspect: 'landscape' },
  { src: '/photo-grid-4.jpg', title: '暑期定向集训', aspect: 'portrait' },
  { src: '/photo-grid-5.jpg', title: '无线电测向班', aspect: 'landscape' },
  { src: '/photo-grid-6.jpg', title: '夜间定向训练', aspect: 'portrait' },
  { src: '/photo-grid-7.jpg', title: '三山MAX越野赛', aspect: 'landscape' },
  { src: '/photo-grid-8.jpg', title: '颁奖仪式', aspect: 'portrait' },
]

function MomentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative bg-ink py-20 lg:py-40" ref={ref}>
      {/* Neon glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div
          className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 block font-mono text-xs uppercase tracking-[0.1em] text-orange"
          >
            MOMENTS
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[26px] font-semibold leading-tight text-silver lg:text-[42px]"
          >
            定格每一刻精彩
          </motion.h2>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {photoGridImages.map((photo, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl lg:mb-6"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full object-cover transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0)] transition-all duration-300 group-hover:bg-[rgba(0,0,0,0.4)]">
                <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              {/* Title pill */}
              <div className="absolute bottom-3 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-[rgba(255,255,255,0.1)] px-3 py-1 text-xs text-white backdrop-blur-md">
                  {photo.title}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────── Section: How It Works ─────────────────────── */

const steps = [
  {
    num: '01',
    icon: QrCode,
    title: '关注公众号',
    desc: '搜索关注"华瑞健定向"微信公众号，获取最新赛事和照片直播信息',
    color: '#8b5cf6',
    delay: 0.1,
  },
  {
    num: '02',
    icon: MousePointerClick,
    title: '选择赛事',
    desc: '浏览赛事中心，找到你参加或感兴趣的定向越野赛事',
    color: '#f97316',
    delay: 0.2,
  },
  {
    num: '03',
    icon: Images,
    title: '观看照片直播',
    desc: '实时查看赛场精彩照片，找到你的身影，一键分享给朋友',
    color: '#34d399',
    delay: 0.3,
  },
]

function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative bg-ink py-16 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 block font-mono text-xs uppercase tracking-[0.1em] text-purple"
          >
            HOW IT WORKS
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[26px] font-semibold leading-tight text-silver lg:text-[42px]"
          >
            三步查看照片直播
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="glass-card relative flex flex-col items-center p-8 text-center"
            >
              {/* Background number */}
              <span
                className="pointer-events-none absolute left-4 top-2 font-mono text-[48px] font-bold leading-none lg:text-[64px]"
                style={{ color: 'rgba(255,255,255,0.04)' }}
              >
                {step.num}
              </span>

              <step.icon
                className="h-12 w-12"
                style={{ color: step.color }}
              />
              <h3 className="mt-4 font-display text-xl font-semibold text-silver">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Connecting lines - desktop only */}
        <div className="relative mx-auto hidden max-w-[800px] md:block">
          <div
            className="absolute left-[33.33%] top-[-80px] h-[1px] w-[33.33%] border-t border-dashed border-[rgba(255,255,255,0.08)]"
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <p className="text-base text-silver">
            准备好查看你的定向越野照片了吗？
          </p>
          <Link
            to="/events"
            className="gradient-cta flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white shadow-glow-orange transition-all duration-300 hover:brightness-110"
          >
            立即浏览赛事
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────── Home Page ─────────────────────── */

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LiveTickerSection />
      <FeaturedEventsSection />
      <MomentsSection />
      <HowItWorksSection />
    </div>
  )
}
