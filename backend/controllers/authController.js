import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { JWT_SECRET } from '../middleware/auth.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = Admin.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req, res, next) {
  try {
    const admin = Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, admin });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    const admin = Admin.findByEmail(req.admin.email);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = bcrypt.compareSync(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    Admin.updatePassword(admin.id, hashedPassword);

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
}
