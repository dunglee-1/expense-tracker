import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForms';
import TransactionList from '../components/TransactionList';
import { getTransactions } from '../services/transactionServices';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error('Lỗi tải danh sách giao dịch', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Xin chào, {user?.name}!</h2>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>

      <TransactionForm onSuccess={loadTransactions} />

      {loading ? <p>Đang tải...</p> : <TransactionList transactions={transactions} onDeleted={loadTransactions} />}
    </div>
  );
}

export default Dashboard;