# 🍛 DesiBites - Desi Food Delivery Website

A modern, fully responsive food delivery website built with **React + Vite + Tailwind CSS** for an authentic Desi (South Asian) food business.

## ✨ Features

- 🎨 **Modern UI** with warm Desi-themed colors (spice orange, turmeric yellow)
- 🍽️ **Menu** with 18+ items across 6 categories (Biryani, Karahi, Curry, Breads, Desserts, Drinks)
- 🔐 **Admin Panel** with password protection — add/edit/delete items, toggle stock
- 🔍 **Live search** and category filter
- 🛒 **Shopping cart** with localStorage persistence (cart survives page refresh)
- 📝 **Order form** that sends the complete order to **WhatsApp** with one click
- ⭐ **Customer testimonials** with auto-rotating carousel
- 📱 **Fully responsive** — looks great on mobile, tablet, and desktop
- ✨ **Smooth animations** — fade-in, slide-up, floating food emojis
- 🚀 **Fast loading** with Vite build optimization
- 🌐 **SEO-friendly** with proper meta tags

## 🔐 Admin Panel

Aap apne browser se `yoursite.com/#admin` ya footer ke "Admin Panel" link par click karke admin panel khol sakte hain.

**Default password:** `desibites123`

Admin panel se aap:
- ➕ Naye items add kar sakte hain (name, price, category, image, description)
- ✏️ Existing items edit kar sakte hain
- 🗑️ Items delete kar sakte hain
- 📦 Stock toggle kar sakte hain (In Stock / Out of Stock)
- 💾 Password change kar sakte hain
- 📤 Menu ko JSON file ke roop mein export kar sakte hain
- 🔄 Default items par reset kar sakte hain

**Important:** Admin data browser ki `localStorage` mein save hota hai, yani har browser ke liye alag hota hai. Production mein sab jagah same data chahiye to Vercel KV / Firebase / Supabase jaisi backend service integrate karni hogi.

## 🛠️ Tech Stack

- **React 18** with Hooks
- **Vite** for blazing-fast dev/build
- **Tailwind CSS** for styling
- **Google Fonts** (Playfair Display + Poppins)
- **WhatsApp Click-to-Chat API** for orders

## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### Build for production
```bash
npm run build
```

### Deploy to Vercel
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel will auto-detect Vite and deploy
4. Access admin panel at `yoursite.com/#admin`

## 📞 Customize WhatsApp Number

Edit `src/data/menu.js` and change the `WHATSAPP_NUMBER` constant:
```js
export const WHATSAPP_NUMBER = '923034941006' // Format: country code + number, no + or spaces
```

## 🔐 Change Admin Password

Login to admin panel → click ⚙️ Settings → enter new password.

Password is stored in your browser's localStorage, so each device has its own.

## 📂 Project Structure
```
desi-bites/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky nav with cart count
│   │   ├── Hero.jsx         # Landing section with CTA
│   │   ├── Menu.jsx         # Searchable menu grid
│   │   ├── About.jsx        # Why choose us
│   │   ├── Testimonials.jsx # Customer reviews
│   │   ├── OrderForm.jsx    # Cart + form → WhatsApp
│   │   ├── Admin.jsx        # 🔐 Admin panel (add/edit/delete items)
│   │   └── Footer.jsx
│   ├── data/
│   │   └── menu.js          # All menu items + testimonials
│   ├── utils/
│   │   └── auth.js          # Admin authentication
│   ├── App.jsx              # Main app with cart + admin routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + custom styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json              # Vercel routing config
```

## 🍽️ Adding More Menu Items

Edit `src/data/menu.js` and add to the `menuItems` array:
```js
{
  id: 19,
  name: 'New Dish',
  category: 'curry', // must match a category id
  price: 500,
  description: 'Tasty description here',
  image: 'https://images.unsplash.com/your-image-url',
  badge: 'New', // optional
  rating: 4.8, // optional
}
```

## 💡 Tips for Customization

- **Colors**: Edit `tailwind.config.js` → `colors.spice`
- **Fonts**: Change Google Fonts link in `index.html`
- **Logo**: Replace emoji in Navbar/Hero, or use an image
- **Images**: Replace Unsplash URLs with your own food photos

## 📄 License

Free to use for your food business. Made with ❤️ and lots of spice.
