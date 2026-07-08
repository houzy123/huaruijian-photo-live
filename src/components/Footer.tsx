import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

const quickLinks = [
  { path: '/', label: '首页' },
  { path: '/events', label: '赛事中心' },
  { path: '/moments', label: '精彩瞬间' },
  { path: '/about', label: '关于我们' },
]

export default function Footer() {
  return (
    <footer
      className="w-full bg-ink"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-silver" />
              <span className="font-display text-lg font-bold text-silver">
                华瑞健定向
              </span>
            </div>
            <p className="text-sm text-muted">
              定向越野专业培训，记录赛场精彩瞬间
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold text-silver">
              快速链接
            </h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted transition-colors duration-300 hover:text-silver"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold text-silver">
              联系我们
            </h4>
            <p className="text-sm text-muted">扫码关注公众号</p>
            <div className="h-[100px] w-[100px] overflow-hidden rounded-lg bg-white p-1">
              <img
                src="/wechat-qr.png"
                alt="华瑞健定向公众号二维码"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col items-center gap-2 pt-6 text-center text-xs text-[#52525b] md:flex-row md:justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span>&copy; 2025 华瑞健定向俱乐部</span>
          <span>定向越野赛事照片直播</span>
        </div>
      </div>
    </footer>
  )
}
