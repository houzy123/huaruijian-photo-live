import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { Users, BookOpen, MapPin, Camera, QrCode, MousePointerClick, Map, Phone, MessageCircle, Navigation } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', duration = 1.5 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.floor(v))

  if (isInView) {
    animate(count, target, { duration, ease: 'easeOut' })
  }

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

/* ─── Section Header ─── */
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div ref={ref} className="text-center" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
      <motion.span variants={fadeUp} className="mb-2 block font-mono text-xs uppercase tracking-[0.1em] text-purple">{label}</motion.span>
      <motion.h2 variants={fadeUp} className="font-display text-[26px] font-semibold text-silver lg:text-[42px]">{title}</motion.h2>
      {subtitle && <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-[500px] text-muted">{subtitle}</motion.p>}
    </motion.div>
  )
}

export default function About() {
  const introRef = useRef(null)
  const introInView = useInView(introRef, { once: true, margin: '-100px' })

  return (
    <div className="min-h-screen bg-ink pb-20">
      {/* Page Header */}
      <section className="relative overflow-hidden px-4 pb-6 pt-12 lg:px-8 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="relative mx-auto max-w-[1280px]">
          <motion.span initial="hidden" animate="visible" variants={fadeUp} className="mb-2 block font-mono text-xs uppercase tracking-[0.1em] text-purple">
            ABOUT US
          </motion.span>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-[32px] font-semibold text-silver lg:text-[56px]">
            关于华瑞健
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="mt-3 max-w-[500px] text-muted">
            专注定向运动，传播健康生活方式
          </motion.p>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="mx-auto max-w-[1280px] px-4 lg:px-8">
        <div className="relative h-[300px] overflow-hidden rounded-2xl lg:h-[400px]">
          <img src="/about-team.jpg" alt="华瑞健定向团队" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          <div className="relative z-10 flex h-full items-end p-6 lg:p-10">
            <div>
              <h2 className="font-display text-xl font-semibold text-silver lg:text-3xl">定向越野专业培训</h2>
              <p className="mt-2 text-sm text-muted lg:text-base">记录赛场精彩瞬间，分享定向运动的快乐</p>
            </div>
          </div>
        </div>
      </section>

      {/* Club Introduction */}
      <section className="mx-auto mt-16 max-w-[1280px] px-4 lg:px-8" ref={introRef}>
        <motion.div
          initial="hidden" animate={introInView ? 'visible' : 'hidden'} variants={staggerContainer}
          className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={fadeUp}>
            <h2 className="font-display text-2xl font-semibold text-silver lg:text-3xl">俱乐部简介</h2>
            <p className="mt-4 leading-relaxed text-muted">
              华瑞健定向俱乐部成立于深圳，致力于推动定向运动的普及与发展。我们为会员提供全面的定向训练和专业指导，由专业教练带队讲解、针对性系统安排，专注于提高定向专业技能。
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              俱乐部积极承办各类定向赛事，包括广东省大学生运动会定向越野比赛、广东省定向锦标赛等大型赛事，并为赛事提供专业的照片直播服务，让每一位参与者都能珍藏自己的精彩瞬间。
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald/20 to-transparent" />
            <img src="/about-equipment.jpg" alt="定向越野装备" className="relative rounded-2xl shadow-2xl" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-20 max-w-[1280px] px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: 100, suffix: '+', label: '场赛事活动', color: 'text-emerald' },
            { value: 50000, suffix: '+', label: '张精彩照片', color: 'text-orange' },
            { value: 50, suffix: '+', label: '专业教练', color: 'text-purple' },
            { value: 10000, suffix: '+', label: '学员参与', color: 'text-blue-400' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
              <p className={`font-mono text-3xl font-bold ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Training Highlights */}
      <section className="mx-auto mt-20 max-w-[1280px] px-4 lg:px-8">
        <SectionHeader label="TRAINING" title="训练特色" subtitle="华瑞健定向的专业训练体系" />
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}
        >
          {[
            { icon: Users, title: '专业教练', desc: '国家级定向运动员、裁判员亲自指导，师生比1:5', color: '#34d399' },
            { icon: BookOpen, title: '系统课程', desc: '从入门到进阶，覆盖短距离、中距离、长距离及接力赛', color: '#f97316' },
            { icon: MapPin, title: '多样场地', desc: '中山公园、莲花山公园、笔架山公园等多个训练场地', color: '#8b5cf6' },
            { icon: Camera, title: '照片直播', desc: '赛事现场照片实时上传，不错过每一个精彩瞬间', color: '#3b82f6' },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="glass-card flex items-start gap-4 rounded-2xl p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon className="h-6 w-6" style={{ color: item.color }} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-silver">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Participation Process */}
      <section className="mx-auto mt-20 max-w-[800px] px-4 lg:px-8">
        <SectionHeader label="PROCESS" title="参与流程" subtitle="三步加入华瑞健定向大家庭" />
        <div className="relative mt-10">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 hidden h-[calc(100%-64px)] w-[1px] border-l border-dashed border-[rgba(255,255,255,0.08)] md:block" />

          {[
            { icon: QrCode, num: '01', title: '关注公众号', desc: '搜索关注"华瑞健定向"微信公众号获取最新活动信息', color: '#8b5cf6' },
            { icon: MousePointerClick, num: '02', title: '选择活动', desc: '浏览赛事中心和训练营，选择适合的活动报名', color: '#f97316' },
            { icon: Map, num: '03', title: '参与训练', desc: '按时参加定向训练或比赛，享受运动乐趣', color: '#34d399' },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="mb-8 flex items-start gap-4 md:gap-6"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}40` }}
              >
                <step.icon className="h-5 w-5" style={{ color: step.color }} />
              </div>
              <div className="glass-card flex-1 rounded-2xl p-5">
                <span className="font-mono text-xs text-muted">STEP {step.num}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-silver">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto mt-20 max-w-[1280px] px-4 lg:px-8">
        <SectionHeader label="CONTACT" title="联系我们" subtitle="欢迎加入华瑞健定向大家庭，一起探索定向运动的魅力！" />

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}
        >
          {[
            { icon: Phone, title: '咨询电话', content: '18588226190', color: '#34d399' },
            { icon: MessageCircle, title: '客服微信', content: '18588226190（同号）', color: '#f97316' },
            { icon: Navigation, title: '训练地点', content: '深圳市各区公园（中山公园、莲花山公园、笔架山公园等）', color: '#8b5cf6' },
            { icon: QrCode, title: '微信公众号', content: '华瑞健定向', color: '#3b82f6' },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon className="h-5 w-5" style={{ color: item.color }} />
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-silver">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="h-[140px] w-[140px] overflow-hidden rounded-2xl bg-white p-2">
            <img src="/wechat-qr.png" alt="华瑞健定向公众号二维码" className="h-full w-full object-contain" />
          </div>
          <p className="mt-3 text-sm text-muted">扫码关注「华瑞健定向」公众号</p>
        </motion.div>
      </section>
    </div>
  )
}
