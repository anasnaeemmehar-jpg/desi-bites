import Product from '../models/Product.js';
import Category from '../models/Category.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getProducts(req, res, next) {
  try {
    const { category, featured } = req.query;
    const products = Product.getAll({ category, featured: featured === 'true' });
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = isNaN(id) ? Product.getBySlug(id) : Product.getById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { category_id, name, description, price, discount_price, is_available, is_featured } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Name and price are required' });
    }

    const slug = slugify(name);
    const image = req.file ? req.file.filename : null;

    const product = Product.create({
      category_id,
      name,
      slug,
      description,
      price,
      discount_price,
      image,
      is_available: is_available !== undefined ? Number(is_available) : 1,
      is_featured: is_featured !== undefined ? Number(is_featured) : 0,
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Product.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const { category_id, name, description, price, discount_price, is_available, is_featured } = req.body;
    const slug = name ? slugify(name) : existing.slug;
    const image = req.file ? req.file.filename : existing.image;

    const product = Product.update(id, {
      category_id: category_id ?? existing.category_id,
      name: name ?? existing.name,
      slug,
      description: description ?? existing.description,
      price: price ?? existing.price,
      discount_price: discount_price ?? existing.discount_price,
      image,
      is_available: is_available !== undefined ? Number(is_available) : existing.is_available,
      is_featured: is_featured !== undefined ? Number(is_featured) : existing.is_featured,
    });

    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Product.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    Product.delete(id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
}

// Category endpoints (kept here for simplicity; could be split into categoryController.js)
export async function getCategories(req, res, next) {
  try {
    const categories = Category.getAll();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    const slug = slugify(name);
    const image = req.file ? req.file.filename : null;
    const category = Category.create({ name, slug, image });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Category.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const { name } = req.body;
    const slug = name ? slugify(name) : existing.slug;
    const image = req.file ? req.file.filename : existing.image;
    const category = Category.update(id, { name: name ?? existing.name, slug, image });
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Category.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    Category.delete(id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
}
