import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { CiShop } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [ispassword, showpassowrd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const toggeleispassword = () => showpassowrd(!ispassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!role) {
      setError("Please Select an account type");
      return;
    }
    if (!email) {
      setError("Please provide your email");
      return;
    }
    if (!password) {
      setError("Please provide your password");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        pass: password,
        role,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Save the userId separately as well
      if (response.data.user && response.data.user._id) {
        localStorage.setItem("userId", response.data.user._id);
      }

      if (response.data.user.role === "seller") {
        navigate("/seller");
      } else {
        navigate("/users");
      }
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Left branding */}
        <div className="auth-left">
          <div className="auth-brand-logo">Flexi<span>Rent</span></div>
          <img className="auth-illustration" src="./person.png" alt="person" />
          <div className="auth-tagline">
            <h2>Rent Anything,<br/>Anytime.</h2>
            <p>Flex with Rent — a Solution to all Problems.</p>
          </div>
        </div>

        {/* Right form */}
        <div className="auth-right">
          <div className="auth-form-box">
            <div className="auth-form-header">
              <h1>Welcome back 👋</h1>
              <p>Login to your account to continue</p>
            </div>
            <form onSubmit={handleSubmit}>
              <p className="auth-role-label">Account type</p>
              <div className="auth-role-group">
                <button type="button"
                  className={`auth-role-btn${role === 'customer' ? ' active' : ''}`}
                  onClick={() => setRole('customer')}>
                  <FaUser />
                  User
                </button>
                <button type="button"
                  className={`auth-role-btn${role === 'seller' ? ' active' : ''}`}
                  onClick={() => setRole('seller')}>
                  <CiShop />
                  Seller
                </button>
              </div>
              <div className="auth-fields">
                <div className="auth-field">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="auth-field auth-field-pw">
                  <label>Password</label>
                  <input type={ispassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <span className="auth-eye" onClick={toggeleispassword}>
                    {ispassword ? '👁️' : '🙈'}
                  </span>
                </div>
              </div>
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="auth-submit">Login</button>
              <p className="auth-footer">
                Not registered yet?
                <Link to="/register">Create your account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
