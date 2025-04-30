import { useState } from "react";
import "./register.css";
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [cpass, setCpass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        // Frontend validation
        if (!role) {
            setError('Please select a role');
            return;
        }
        if (!name) {
            setError('Please enter your name');
            return;
        }
        if (!email) {
            setError('Please enter your email');
            return;
        }
        if (password !== cpass) {
            setError('Confirm password does not match password');
            return;
        }

        try {
            await axios.post(`${API_URL}/users/register`, {
                name,
                email,
                pass: password,
                cpass,
                role
            });
            navigate('/login');
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError(e.message);
            }
            console.log(e);
        }
    };

    return (
        <div className="containerLogin">
            <div className="semimainLogin">
                <div className="firstSidelogin">
                    <h1 className="firstsidelogintext">Let's Get Started</h1>
                    <p className="firstsidelogintext">Flex with Rent a Solution to all Problems...</p>
                    <img className="imgdivmain" src="./person.png" alt="person" width="450px" height="507px" />
                    <div className="logindesign"></div>
                </div>
                <div className="midLogin1"></div>
                <div className="secondSideLogin">
                    <div className="logindesign2"></div>
                    <div className="LoginForm1">
                        <h2>Welcome</h2>
                        <div className="create">
                            <p>Create Your Account </p>
                            <img className="registerimg" src="./create.png" height="15px" width="20px" alt="create" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <h4 className="h4form1">Choose Your Account type</h4>
                            <div className="divforaccounttype1">
                                <label className={`inputlogin1  ${role === 'customer' ? 'selected' : ''}`}>
                                    <input type="radio" name="user" value='customer'
                                        checked={role === 'customer'}
                                        onChange={(e) => setRole(e.target.value)} />
                                    <div className="detailuser">
                                        <FaUser />
                                        <span>User</span>
                                    </div>
                                </label>
                                <label className={`inputlogin1 ${role === 'seller' ? 'selected' : ''}`}>
                                    <input type="radio" name="user" value='seller' checked={role === 'seller'}
                                        onChange={(e) => setRole(e.target.value)} />
                                    <div className="detailuser">
                                        <CiShop />
                                        <span>Seller</span>
                                    </div>
                                </label>
                            </div>
                            <div className="divofinputfields1">
                                <div className="firstfield">
                                    <label className="labelfortextfield1" htmlFor="name">Name</label>
                                    <input className="inputfortextfirld1" type="text" name="name" placeholder="Enter your name" value={name}
                                        onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="firstfield">
                                    <label className="labelfortextfield1" htmlFor="email">Email</label>
                                    <input className="inputfortextfirld1" type="email" name="email" placeholder="Enter your Email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="firstfield">
                                    <label className="labelfortextfield21" htmlFor="password">Password</label>
                                    <div className="inputdiv">
                                        <input className="inputfortextfirld1" type={isPasswordVisible ? "text" : "password"} name="password" placeholder="Enter your Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} required />
                                        <span className="eye-icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? '👁️' : '🙈'}</span>
                                    </div>
                                </div>
                                <div className="firstfield">
                                    <label className="labelfortextfield3" htmlFor="cpass">Confirm Password</label>
                                    <div className="inputdiv">
                                        <input className="inputfortextfirld1" type={isConfirmPasswordVisible ? "text" : "password"} name="cpass" placeholder="Confirm Password"
                                            value={cpass}
                                            onChange={(e) => setCpass(e.target.value)} required />
                                        <span className="eye-icon" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>{isConfirmPasswordVisible ? '👁️' : '🙈'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="lastpart1">
                                <button type="submit">Register</button>
                                <div className="error_message">{error}</div>
                                <p>Already have an account? <Link className="linkoflast" to='/login'>Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
