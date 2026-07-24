import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#c9a227', '#e0654f', '#5b8fb9', '#8e7cc3', '#4caf7d', '#d48a3e', '#6e7b8b'];

function groupByCategory(transactions, type) {
  return transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);
}

function ExpenseChart({ transactions }) {
  const [activeType, setActiveType] = useState('expense');

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const data = groupByCategory(transactions, activeType);

  return (
    <div>
      {/* Tổng quan Thu - Chi */}
      <div className="summary-row">
        <div className="summary-box">
          <div className="summary-label">Thu nhập</div>
          <div className="summary-value income mono">+{totalIncome.toLocaleString('vi-VN')}đ</div>
        </div>
        <div className="summary-box">
          <div className="summary-label">Chi tiêu</div>
          <div className="summary-value expense mono">-{totalExpense.toLocaleString('vi-VN')}đ</div>
        </div>
        <div className="summary-box">
          <div className="summary-label">Số dư</div>
          <div className={`summary-value mono ${balance >= 0 ? 'income' : 'expense'}`}>
            {balance >= 0 ? '+' : ''}{balance.toLocaleString('vi-VN')}đ
          </div>
        </div>
      </div>

      {/* Nút chuyển đổi */}
      <div className="chart-toggle">
        <button
          className={`toggle-btn ${activeType === 'expense' ? 'active' : ''}`}
          onClick={() => setActiveType('expense')}
        >
          Chi tiêu
        </button>
        <button
          className={`toggle-btn ${activeType === 'income' ? 'active' : ''}`}
          onClick={() => setActiveType('income')}
        >
          Thu nhập
        </button>
      </div>

      {data.length === 0 ? (
        <p className="empty-state">Chưa có dữ liệu {activeType === 'expense' ? 'chi tiêu' : 'thu nhập'} để hiển thị.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.name}: ${entry.value.toLocaleString('vi-VN')}đ`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} đ`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;