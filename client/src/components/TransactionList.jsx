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
    return <p style={{ color: '#888' }}>Chưa có giao dịch nào.</p>;
  }

  return (
    <div>
      <h3>Danh sách giao dịch</h3>
      {transactions.map((t) => (
        <div
          key={t._id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginBottom: 8,
            border: '1px solid #444',
            borderRadius: 6,
          }}
        >
          <div>
            <strong style={{ color: t.type === 'income' ? '#4caf50' : '#f44336' }}>
              {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} đ
            </strong>
            <p style={{ margin: '4px 0 0', color: '#aaa' }}>
              {t.category} {t.description && `— ${t.description}`}
            </p>
          </div>
          <button onClick={() => handleDelete(t._id)} style={{ color: 'red' }}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;