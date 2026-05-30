const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });
    const token = signToken(admin._id);
    res.json({
      success: true,
      token,
      data: { id: admin._id, name: admin.name, email: admin.email, lastLogin: admin.lastLogin }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, secretKey } = req.body;
    if (secretKey !== process.env.JWT_SECRET) {
      return res.status(403).json({ success: false, message: 'Invalid secret key' });
    }
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Admin already exists' });
    const admin = await Admin.create({ email, password, name: name || 'K Chandana' });
    const token = signToken(admin._id);
    res.status(201).json({ success: true, token, data: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, data: req.admin });
};
