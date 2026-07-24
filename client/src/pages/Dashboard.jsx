function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <h2>Xin chào, {user?.name}!</h2>
      <p>Đây là trang Dashboard (sẽ hoàn thiện sau)</p>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}

export default Dashboard;