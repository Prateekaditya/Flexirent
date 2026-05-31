import { useState } from 'react';
import '../login/Login.css';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { CiShop } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [showPw, setShowPw]     = useState(false);
    const [showCpw, setShowCpw]   = useState(false);
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole]         = useState('');
    const [name, setName]         = useState('');
    const [cpass, setCpass]       = useState('');
    const [error, setError]       = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!role)              return setError('Please select an account type');
        if (!name)              return setError('Please enter your name');
        if (!email)             return setError('Please enter your email');
        if (password !== cpass) return setError('Passwords do not match');
        try {
            await axios.post(`${API_URL}/users/register`, { name, email, pass: password, cpass, role });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-left">
                    <div className="auth-brand-logo">Flexi<span>Rent</span></div>
                    <img className="auth-illustration" src="./person.png" alt="person" />
                    <div className="auth-tagline">
                        <h2>Join Us<br />Today.</h2>
                        <p>Start renting and listing products in minutes.</p>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-form-box">
                        <div className="auth-form-header">
                            <h1>Create account</h1>
                            <p>Fill in the details to get started</p>
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
                                    <label>Full Name</label>
                                    <input type="text" placeholder="John Doe"
                                        value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="auth-field">
                                    <label>Email</label>
                                    <input type="email" placeholder="you@example.com"
                                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="auth-field auth-field-pw">
                                    <label>Password</label>
                                    <input type={showPw ? 'text' : 'password'} placeholder="••••••••"
                                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <span className="auth-eye" onClick={() => setShowPw(!showPw)}>
                                        {showPw ? '👁️' : '🙈'}
                                    </span>
                                </div>
                                <div className="auth-field auth-field-pw">
                                    <label>Confirm Password</label>
                                    <input type={showCpw ? 'text' : 'password'} placeholder="••••••••"
                                        value={cpass} onChange={(e) => setCpass(e.target.value)} required />
                                    <span className="auth-eye" onClick={() => setShowCpw(!showCpw)}>
                                        {showCpw ? '��️' : '🙈'}
                                    </span>
                                </div>
                            </div>
                            {error && <div className="auth-error">{error}</div>}
                            <button type="submit" className="auth-submit">Create Account</button>
                            <p className="auth-footer">
                                Already have an account?
                                <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;
