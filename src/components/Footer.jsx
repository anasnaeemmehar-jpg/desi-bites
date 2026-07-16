import { WHATSAPP_NUMBER } from '../data/menu'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍛</span>
              <span className="font-display font-bold text-2xl text-spice-500">DesiBites</span>
            </div>
            <p className="text-sm text-gray-400">
              Authentic Desi food, made with love and delivered hot to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-spice-500 transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-spice-500 transition-colors">Menu</a></li>
              <li><a href="#about" className="hover:text-spice-500 transition-colors">About</a></li>
              <li><a href="#order" className="hover:text-spice-500 transition-colors">Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li>Mon - Fri: 11am - 11pm</li>
              <li>Saturday: 12pm - 12am</li>
              <li>Sunday: 12pm - 11pm</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +92 303 4941006</li>
              <li>📧 hello@desibites.com</li>
              <li>📍 Your City, Pakistan</li>
            </ul>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank" rel="noreferrer"
              className="inline-block mt-4 text-green-400 hover:text-green-300 text-sm font-semibold"
            >
              💬 Chat on WhatsApp →
            </a>
            <a
              href="#admin"
              className="block mt-2 text-spice-400 hover:text-spice-300 text-xs"
            >
              🔐 Admin Panel
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2026 DesiBites. Made with ❤️ and lots of spice. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
