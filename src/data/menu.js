// Default menu items - used as fallback if localStorage is empty
const DEFAULT_ITEMS = [
  // Biryani
  { id: 1, name: 'Chicken Biryani', category: 'biryani', price: 350, description: 'Fragrant basmati rice layered with tender chicken and aromatic spices', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&h=400&fit=crop', badge: 'Bestseller', rating: 4.9, available: true },
  { id: 2, name: 'Mutton Biryani', category: 'biryani', price: 550, description: 'Slow-cooked mutton with saffron-infused rice and traditional spices', image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&h=400&fit=crop', rating: 4.8, available: true },
  { id: 3, name: 'Beef Biryani', category: 'biryani', price: 450, description: 'Tender beef pieces cooked with aromatic basmati rice', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=400&fit=crop', rating: 4.7, available: true },
  // Karahi
  { id: 4, name: 'Chicken Karahi', category: 'karahi', price: 600, description: 'Classic karahi cooked with tomatoes, green chilies and fresh coriander', image: 'https://images.unsplash.com/photo-1604908554007-3a40b50b8c4f?w=500&h=400&fit=crop', badge: 'Chef Special', rating: 4.9, available: true },
  { id: 5, name: 'Mutton Karahi', category: 'karahi', price: 850, description: 'Tender mutton pieces in rich tomato-based karahi gravy', image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=500&h=400&fit=crop', rating: 4.8, available: true },
  { id: 6, name: 'Chicken Handi', category: 'karahi', price: 550, description: 'Creamy handi cooked in traditional clay pot with cream and butter', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop', rating: 4.7, available: true },
  // Curry
  { id: 7, name: 'Nihari', category: 'curry', price: 400, description: 'Slow-cooked beef stew with rich spices, served with naan', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=400&fit=crop', badge: 'Traditional', rating: 4.9, available: true },
  { id: 8, name: 'Haleem', category: 'curry', price: 380, description: 'Rich and creamy blend of lentils, wheat and tender meat', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=400&fit=crop', rating: 4.8, available: true },
  { id: 9, name: 'Butter Chicken', category: 'curry', price: 450, description: 'Creamy tomato-based curry with tender chicken pieces', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&h=400&fit=crop', rating: 4.9, available: true },
  { id: 10, name: 'Daal Makhani', category: 'curry', price: 250, description: 'Slow-cooked black lentils in creamy buttery gravy', image: 'https://images.unsplash.com/photo-1626500155252-9b6e3d9d4c4e?w=500&h=400&fit=crop', rating: 4.6, available: true },
  // Breads
  { id: 11, name: 'Tandoori Naan', category: 'bread', price: 40, description: 'Soft tandoor-baked bread, perfect with any curry', image: 'https://images.unsplash.com/photo-1626100134240-bc1b2c2e1c5b?w=500&h=400&fit=crop', rating: 4.7, available: true },
  { id: 12, name: 'Garlic Naan', category: 'bread', price: 60, description: 'Tandoori naan topped with fresh garlic and butter', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=400&fit=crop', rating: 4.8, available: true },
  { id: 13, name: 'Roti', category: 'bread', price: 25, description: 'Traditional whole wheat flatbread', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&h=400&fit=crop', rating: 4.5, available: true },
  // Desserts
  { id: 14, name: 'Gulab Jamun', category: 'dessert', price: 120, description: 'Soft milk dumplings soaked in rose-flavored sugar syrup', image: 'https://images.unsplash.com/photo-1601303516143-c2db1b1e2a48?w=500&h=400&fit=crop', badge: 'Sweet', rating: 4.9, available: true },
  { id: 15, name: 'Kheer', category: 'dessert', price: 150, description: 'Creamy rice pudding with cardamom, nuts and saffron', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop', rating: 4.8, available: true },
  { id: 16, name: 'Rasmalai', category: 'dessert', price: 180, description: 'Soft paneer discs in sweet saffron milk', image: 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=500&h=400&fit=crop', rating: 4.9, available: true },
  // Drinks
  { id: 17, name: 'Lassi', category: 'drinks', price: 100, description: 'Traditional yogurt drink - sweet or salty', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500&h=400&fit=crop', rating: 4.7, available: true },
  { id: 18, name: 'Chai', category: 'drinks', price: 60, description: 'Authentic desi chai with milk and cardamom', image: 'https://images.unsplash.com/photo-1571805341302-f8573105e0e5?w=500&h=400&fit=crop', rating: 4.9, available: true },
]

const STORAGE_KEY = 'desibites-menu-items'

// Get all items - from localStorage if available, else defaults
export function getAllItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return DEFAULT_ITEMS
}

// Save items to localStorage
export function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

// Reset to default items
export function resetToDefaults() {
  localStorage.removeItem(STORAGE_KEY)
  return DEFAULT_ITEMS
}

export const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'biryani', name: 'Biryani', icon: '🍚' },
  { id: 'karahi', name: 'Karahi', icon: '🍳' },
  { id: 'curry', name: 'Curry', icon: '🍲' },
  { id: 'bread', name: 'Breads', icon: '🫓' },
  { id: 'dessert', name: 'Desserts', icon: '🍨' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
]

// Backwards compat export
export const menuItems = getAllItems()

export const testimonials = [
  { id: 1, name: 'Ayesha Khan', location: 'Lahore', rating: 5, comment: 'Best biryani in town! The flavors take me back to my grandmother\'s kitchen. Hot delivery and amazing packaging.', avatar: '👩‍🦱' },
  { id: 2, name: 'Ahmed Raza', location: 'Karachi', rating: 5, comment: 'Ordered karahi for a family dinner. Everyone loved it! Will definitely order again. Highly recommended.', avatar: '👨' },
  { id: 3, name: 'Fatima Malik', location: 'Islamabad', rating: 5, comment: 'The nihari is to die for! Authentic taste, generous portions, and the naan is always fresh and hot.', avatar: '👩' },
  { id: 4, name: 'Hassan Ali', location: 'Rawalpindi', rating: 5, comment: 'Fast delivery, amazing taste, and the WhatsApp ordering is so convenient. My go-to for desi food!', avatar: '🧔' },
]

export const WHATSAPP_NUMBER = '923034941006'
