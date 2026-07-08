import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Compass } from 'lucide-react'

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/events', label: '赛事中心' },
  { path: '/moments', label: '精彩瞬间' },
  { path: '/about', label: '关于我们' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className={`sticky top-0 z-50 h-[72px] w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)]'
            : 'bg-[rgba(10,10,10,0.8)] backdrop-blur-md'
        }`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-silver" />
            <span className="font-display text-[22px] font-bold text-silver">
              华瑞健定向
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[15px] transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-silver'
                    : 'text-muted hover:text-silver'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <button className="hidden rounded-full border border-[rgba(255,255,255,0.15)] bg-transparent px-4 py-2 text-[14px] text-silver transition-all duration-300 hover:bg-[rgba(255,255,255,0.08)] md:block">
            关注公众号
          </button>

          {/* Mobile Hamburger */}
          <button
            className="flex items-center justify-center p-2 text-silver md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="打开菜单"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-ink flex flex-col"
          >
            <div className="flex h-[72px] items-center justify-between px-4">
              <Link to="/" className="flex items-center gap-2">
                <Compass className="h-6 w-6 text-silver" />
                <span className="font-display text-[22px] font-bold text-silver">
                  华瑞健定向
                </span>
              </Link>
              <button
                className="flex items-center justify-center p-2 text-silver"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="关闭菜单"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`font-display text-2xl ${
                      location.pathname === link.path
                        ? 'text-silver'
                        : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
