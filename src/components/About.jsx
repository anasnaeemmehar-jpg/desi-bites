export default function About() {
  const features = [
    { icon: '👨‍🍳', title: 'Expert Chefs', desc: '30+ years of combined experience in authentic Desi cooking' },
    { icon: '🌿', title: 'Fresh Ingredients', desc: 'Locally sourced, organic ingredients delivered daily' },
    { icon: '🔥', title: 'Hot & Fresh', desc: 'Cooked fresh and delivered within 30 minutes' },
    { icon: '💯', title: 'Quality First', desc: 'No shortcuts, no preservatives — just pure authentic taste' },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-spice-50 to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Choose DesiBites?</h2>
          <p className="section-subtitle">
            We bring the authentic taste of home-cooked Desi food straight to your table
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-spice-800 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
