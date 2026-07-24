import { useState } from 'react';
import { createTransaction } from '../services/transactionServices';

function TransactionForm({ onSuccess }) {
  const [formData, setFormData] = useState({ type: 'expense', category: '', amount: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <div className="panel">
      <div className="panel-title">Thêm giao dịch</div>
      {error && <div className="auth-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <select name="type" value={formData.type} onChange={handleChange} className="form-field">
          <option value="expense">Chi tiêu</option>
          <option value="income">Thu nhập</option>
        </select>
        <input className="form-field" name="category" placeholder="Danh mục (VD: Ăn uống, Lương...)" value={formData.category} onChange={handleChange} required />
        <input className="form-field" name="amount" type="number" placeholder="Số tiền (VNĐ)" value={formData.amount} onChange={handleChange} required min="0" />
        <input className="form-field" name="description" placeholder="Ghi chú (không bắt buộc)" value={formData.description} onChange={handleChange} />
        <button type="submit" className="btn btn-primary">Thêm</button>
      </form>
    </div>
  );
}

export default TransactionForm;