import { useState, useEffect } from 'react'

export default function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#menu', label: 'Menu' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#order', label: 'Order' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform">🍛</span>
          <span className="font-display font-bold text-2xl text-spice-700">DesiBites</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.href} href={link.href}
              className="text-gray-700 hover:text-spice-600 font-medium transition-colors relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-spice-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#order" className="relative bg-spice-100 hover:bg-spice-200 text-spice-700 p-2 rounded-full transition-all">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-chili text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </a>
          <a href="#order" className="hidden sm:inline-block btn-primary text-sm">Order Now</a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-2xl">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t mt-3 py-4 animate-fade-in">
          <div className="flex flex-col gap-3 px-6">
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-spice-600 font-medium py-2">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
