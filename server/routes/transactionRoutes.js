const express = require('express');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Tất cả routes bên dưới đều cần đăng nhập
router.use(authMiddleware);

// Lấy danh sách giao dịch của user
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Thêm giao dịch mới
router.post('/', async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;
    const transaction = await Transaction.create({
      user: req.userId,
      type,
      category,
      amount,
      description,
      date,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Sửa giao dịch
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: 'Không tìm thấy giao dịch' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Xóa giao dịch
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!transaction) {
      return res.status(404).json({ message: 'Không tìm thấy giao dịch' });
    }
    res.json({ message: 'Đã xóa giao dịch' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router;