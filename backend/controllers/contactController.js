const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

exports.submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { fullName, email, subject, message } = req.body;
    const contact = await Contact.create({
      fullName,
      email,
      subject,
      message,
      ipAddress: req.ip
    });
    sendContactNotification({ fullName, email, subject, message });
    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. I'll get back to you soon.",
      data: { id: contact._id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit message. Please try again.' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const { search, read, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }
    if (read !== undefined) query.isRead = read === 'true';
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ isRead: false });
    const thisMonth = new Date();
    thisMonth.setDate(1); thisMonth.setHours(0, 0, 0, 0);
    const monthlyMessages = await Contact.countDocuments({ createdAt: { $gte: thisMonth } });

    res.json({
      success: true,
      data: contacts,
      stats: { total: totalMessages, unread: unreadMessages, monthly: monthlyMessages },
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch message.' });
  }
};

exports.toggleRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    contact.isRead = !contact.isRead;
    await contact.save();
    res.json({ success: true, data: contact, message: `Marked as ${contact.isRead ? 'read' : 'unread'}` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message.' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
};
