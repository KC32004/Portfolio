const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const {
  submitContact, getAllContacts, getContactById, toggleRead, deleteContact
} = require('../controllers/contactController');

const contactValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 })
];

router.post('/', contactValidation, submitContact);
router.get('/', protect, getAllContacts);
router.get('/:id', protect, getContactById);
router.patch('/:id/read', protect, toggleRead);
router.delete('/:id', protect, deleteContact);

module.exports = router;
