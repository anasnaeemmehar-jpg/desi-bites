import { WHATSAPP_NUMBER } from '../data/menu'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden pattern-bg">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-spice-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-turmeric rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="animate-slide-up">
          <span className="inline-block bg-spice-100 text-spice-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            🔥 Now delivering in your area
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Authentic <span className="text-spice-600">Desi</span> Food,
            <br />
            <span className="bg-gradient-to-r from-spice-600 to-turmeric bg-clip-text text-transparent">
              Delivered Hot
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            From our kitchen to your doorstep — sizzling karahis, fragrant biryanis, and
            traditional recipes cooked with love. Order now on WhatsApp and get it fresh in 30 minutes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#menu" className="btn-primary text-lg">
              Explore Menu 🍽️
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20place%20an%20order`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp text-lg"
            >
              <span className="text-xl">💬</span> Order on WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <div className="text-3xl font-bold text-spice-700">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-spice-700">30min</div>
              <div className="text-sm text-gray-600">Fast Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-spice-700">4.9⭐</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative animate-fade-in">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Floating food emojis */}
            <div className="absolute inset-0 bg-gradient-to-br from-spice-400 to-turmeric rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-spice-300 to-spice-500 rounded-full shadow-2xl flex items-center justify-center">
              <span className="text-9xl animate-float">🍛</span>
            </div>
            {/* Orbiting items */}
            <div className="absolute top-4 right-4 text-6xl animate-float" style={{ animationDelay: '0.5s' }}>🍚</div>
            <div className="absolute bottom-4 left-4 text-6xl animate-float" style={{ animationDelay: '1s' }}>🍗</div>
            <div className="absolute top-1/2 -right-4 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>🫓</div>
            <div className="absolute top-1/2 -left-4 text-5xl animate-float" style={{ animationDelay: '2s' }}>🌶️</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-spice-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-spice-600 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
