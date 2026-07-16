import { useState } from 'react'
import { categories } from '../data/menu'

export default function Menu({ items, addToCart }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Menu</h2>
          <p className="section-subtitle">
            Handcrafted with love, made with the freshest ingredients and authentic spices
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for biryani, karahi..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-spice-200 focus:border-spice-500 focus:outline-none transition-colors"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-spice-600 text-white shadow-lg scale-105'
                  : 'bg-spice-50 text-gray-700 hover:bg-spice-100'
              }`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden bg-spice-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-7xl">🍽️</div>`
                  }}
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-chili text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {item.badge}
                  </span>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  ⭐ {item.rating}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-xl font-bold text-gray-900">{item.name}</h3>
                  <span className="text-spice-700 font-bold text-lg whitespace-nowrap">Rs. {item.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <button
                  onClick={() => addToCart(item)}
                  disabled={item.available === false}
                  className={`w-full font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    item.available === false
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-spice-50 hover:bg-spice-600 text-spice-700 hover:text-white'
                  }`}
                >
                  {item.available === false ? (
                    <>❌ Unavailable</>
                  ) : (
                    <><span>➕</span> Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🔍</div>
            <p>No items found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
