import { deleteTransaction } from '../services/transactionServices';

function TransactionList({ transactions, onDeleted }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Xóa giao dịch này?')) return;
    try {
      await deleteTransaction(id);
      onDeleted();
    } catch (err) {
      alert('Xóa thất bại');
    }
  };

  if (transactions.length === 0) {
    return <p className="empty-state">Chưa có giao dịch nào.</p>;
  }

  return (
    <div>
      {transactions.map((t) => (
        <div key={t._id} className="transaction-item">
          <div>
            <div className={`transaction-amount mono ${t.type}`}>
              {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} đ
            </div>
            <div className="transaction-meta">
              {t.category} {t.description && `— ${t.description}`}
            </div>
          </div>
          <button onClick={() => handleDelete(t._id)} className="btn-delete">Xóa</button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;