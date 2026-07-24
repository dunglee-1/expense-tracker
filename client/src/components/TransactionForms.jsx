import { useState } from 'react';
import { createTransaction } from '../services/transactionServices';

function TransactionForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createTransaction({ ...formData, amount: Number(formData.amount) });
      setFormData({ type: 'expense', category: '', amount: '', description: '' });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Thêm giao dịch thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 30, padding: 20, border: '1px solid #444', borderRadius: 8 }}>
      <h3>Thêm giao dịch</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      >
        <option value="expense">Chi tiêu</option>
        <option value="income">Thu nhập</option>
      </select>

      <input
        name="category"
        placeholder="Danh mục (VD: Ăn uống, Lương...)"
        value={formData.category}
        onChange={handleChange}
        required
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      />

      <input
        name="amount"
        type="number"
        placeholder="Số tiền (VNĐ)"
        value={formData.amount}
        onChange={handleChange}
        required
        min="0"
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      />

      <input
        name="description"
        placeholder="Ghi chú (không bắt buộc)"
        value={formData.description}
        onChange={handleChange}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      />

      <button type="submit" style={{ width: '100%', padding: 10 }}>Thêm</button>
    </form>
  );
}

export default TransactionForm;