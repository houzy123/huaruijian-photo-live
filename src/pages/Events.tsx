import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, MapPinOff } from 'lucide-react'
import { getAllEvents } from '../data/events'
import type { EventStatus } from '../data/events'

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

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

/* ─── sort options ─── */
type SortOption = 'latest' | 'soonest' | 'mostPhotos'
const sortLabels: Record<SortOption, string> = {
  latest: '最新发布',
  soonest: '即将开始',
  mostPhotos: '最多照片',
}

export default function Events() {
  const allEvents = useMemo(() => getAllEvents(), [])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('全部')
  const [typeFilter, setTypeFilter] = useState<string>('全部')
  const [sort, setSort] = useState<SortOption>('latest')
  const [showSort, setShowSort] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  const statusTabs = ['全部', '直播中', '即将开始', '已结束']
  const typeTabs = ['全部', '定向越野', '无线电测向']

  const filtered = useMemo(() => {
    let result = [...allEvents]

    // search
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (e) => e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      )
    }

    // status filter
    if (statusFilter === '直播中') result = result.filter((e) => e.status === 'live')
    else if (statusFilter === '即将开始') result = result.filter((e) => e.status === 'upcoming')
    else if (statusFilter === '已结束') result = result.filter((e) => e.status === 'ended')

    // type filter
    if (typeFilter !== '全部') result = result.filter((e) => e.sportType === typeFilter)

    // sort
    if (sort === 'soonest') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sort === 'mostPhotos') {
      result.sort((a, b) => b.photoCount - a.photoCount)
    }

    return result
  }, [allEvents, search, statusFilter, typeFilter, sort])

  const visible = filtered.slice(0, visibleCount)

  return (
    <div className="min-h-screen bg-ink pb-20">
      {/* Header */}
      <section className="relative overflow-hidden px-4 pb-8 pt-12 lg:px-8 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="relative mx-auto max-w-[1280px]">
          <motion.span initial="hidden" animate="visible" variants={fadeUp} className="mb-2 block font-mono text-xs uppercase tracking-[0.1em] text-emerald">
            EVENTS CENTER
          </motion.span>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-[32px] font-semibold text-silver lg:text-[56px]">
            赛事中心
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="mt-3 max-w-[600px] text-muted">
            探索华瑞健定向越野的精彩赛事，照片直播实时记录
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-[72px] z-40 bg-ink/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-4 py-4 lg:px-8">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="搜索赛事名称或地点..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] py-2.5 pl-10 pr-4 text-sm text-silver placeholder-[#52525b] outline-none transition-colors focus:border-[rgba(255,255,255,0.2)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status tabs */}
            <div className="flex flex-wrap gap-1.5">
              {statusTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    statusFilter === tab
                      ? tab === '直播中'
                        ? 'bg-emerald text-ink'
                        : 'bg-[rgba(255,255,255,0.12)] text-silver'
                      : 'bg-transparent text-muted hover:text-silver'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Type tabs */}
            <div className="flex flex-wrap gap-1.5">
              {typeTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTypeFilter(tab)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    typeFilter === tab ? 'bg-orange text-white' : 'bg-transparent text-muted hover:text-silver'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative ml-auto">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1.5 text-xs text-muted transition-all hover:text-silver"
              >
                {sortLabels[sort]} <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-surface shadow-elevated"
                  >
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => { setSort(key); setShowSort(false) }}
                        className={`block w-full px-3 py-2 text-left text-xs transition-colors hover:bg-[rgba(255,255,255,0.05)] ${
                          sort === key ? 'text-emerald' : 'text-muted'
                        }`}
                      >
                        {sortLabels[key]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <section className="mx-auto max-w-[1280px] px-4 pt-6 lg:px-8">
        {visible.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
            <MapPinOff className="mb-4 h-12 w-12 text-[#333]" />
            <p className="text-lg text-silver">暂无符合条件的赛事</p>
            <p className="mt-2 text-sm text-muted">试试其他筛选条件</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {visible.map((event) => (
              <motion.div key={event.id} variants={scaleIn} className="group relative cursor-pointer">
                <Link to={`/events/${event.id}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <img
                      src={event.coverImage}
                      alt={event.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-transparent to-transparent" />

                    {/* Photo count */}
                    {event.photoCount > 0 && (
                      <span className="absolute right-3 top-3 rounded-full bg-[rgba(0,0,0,0.6)] px-2 py-1 font-mono text-xs text-white backdrop-blur-sm">
                        {event.photoCount.toLocaleString()} 张
                      </span>
                    )}

                    {/* Info overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <StatusBadge status={event.status} />
                      <h3 className="mt-2 font-display text-base font-semibold text-white line-clamp-2 lg:text-lg">
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
        )}

        {/* Load more */}
        {visible.length < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-transparent px-6 py-3 text-sm text-silver transition-all hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
            >
              加载更多赛事
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
