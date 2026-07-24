import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#c9a227', '#e0654f', '#5b8fb9', '#8e7cc3', '#4caf7d', '#d48a3e', '#6e7b8b'];

function ExpenseChart({ transactions }) {
  // Chỉ lấy giao dịch loại "expense", gom nhóm theo category
  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  if (expenseData.length === 0) {
    return <p style={{ color: '#888' }}>Chưa có dữ liệu chi tiêu để hiển thị biểu đồ.</p>;
  }

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Thống kê chi tiêu theo danh mục</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `${entry.name}: ${entry.value.toLocaleString('vi-VN')}đ`}
          >
            {expenseData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} đ`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;