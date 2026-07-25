import { useState } from 'react';
import { deleteTransaction, updateTransaction } from '../services/transactionServices';

function TransactionList({ transactions, onDeleted }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ type: '', category: '', amount: '', description: '' });

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa giao dịch này?')) return;
    try {
      await deleteTransaction(id);
      onDeleted();
    } catch (err) {
      alert('Xóa thất bại');
    }
  };

  const startEdit = (t) => {
    setEditingId(t._id);
    setEditForm({ type: t.type, category: t.category, amount: t.amount, description: t.description || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      await updateTransaction(id, { ...editForm, amount: Number(editForm.amount) });
      setEditingId(null);
      onDeleted(); // dùng lại hàm này để load lại danh sách
    } catch (err) {
      alert('Cập nhật thất bại');
    }
  };

  if (transactions.length === 0) {
    return <p className="empty-state">Chưa có giao dịch nào.</p>;
  }

  return (
    <div>
      {transactions.map((t) => (
        <div key={t._id} className="transaction-item">
          {editingId === t._id ? (
            // ===== Chế độ chỉnh sửa =====
            <div style={{ width: '100%' }}>
              <select name="type" value={editForm.type} onChange={handleEditChange} className="form-field">
                <option value="expense">Chi tiêu</option>
                <option value="income">Thu nhập</option>
              </select>
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="form-field"
                placeholder="Danh mục"
              />
              <input
                name="amount"
                type="number"
                value={editForm.amount}
                onChange={handleEditChange}
                className="form-field"
                placeholder="Số tiền"
              />
              <input
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="form-field"
                placeholder="Ghi chú"
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => saveEdit(t._id)} className="btn btn-primary" style={{ flex: 1 }}>Lưu</button>
                <button onClick={cancelEdit} className="btn btn-ghost" style={{ flex: 1 }}>Hủy</button>
              </div>
            </div>
          ) : (
            // ===== Chế độ hiển thị bình thường =====
            <>
              <div>
                <div className={`transaction-amount mono ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} đ
                </div>
                <div className="transaction-meta">
                  {t.category} {t.description && `— ${t.description}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => startEdit(t)} className="btn-edit">Sửa</button>
                <button onClick={() => handleDelete(t._id)} className="btn-delete">Xóa</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TransactionList;