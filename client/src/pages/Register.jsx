import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-eyebrow">Expense Tracker</div>
        <h2 className="auth-title">Đăng ký</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-field" name="name" placeholder="Họ tên" value={formData.name} onChange={handleChange} required />
          <input className="form-field" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className="form-field" name="password" type="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary">Đăng ký</button>
        </form>
        <p className="auth-switch">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
      </div>
    </div>
  );
}

export default Register;