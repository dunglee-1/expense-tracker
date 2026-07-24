import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForms';
import TransactionList from '../components/TransactionList';
import ExpenseChart from '../components/ExpenseChart';
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
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">Sổ chi tiêu</div>
          <h2 className="dashboard-title">Xin chào, {user?.name}!</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost">Đăng xuất</button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-col">
          <TransactionForm onSuccess={loadTransactions} />
          <div className="panel">
            <div className="panel-title">Danh sách giao dịch</div>
            {loading ? <p className="empty-state">Đang tải...</p> : <TransactionList transactions={transactions} onDeleted={loadTransactions} />}
          </div>
        </div>

        <div className="dashboard-col">
          <div className="panel">
            <div className="panel-title">Thống kê theo danh mục</div>
            <ExpenseChart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;