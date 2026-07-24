import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-eyebrow">Expense Tracker</div>
        <h2 className="auth-title">Đăng nhập</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-field" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className="form-field" name="password" type="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary">Đăng nhập</button>
        </form>
        <p className="auth-switch">Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
      </div>
    </div>
  );
}

export default Login;