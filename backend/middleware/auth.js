import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'desibites_dev_secret_change_me';

export function protectAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
  }
}

export { JWT_SECRET };
