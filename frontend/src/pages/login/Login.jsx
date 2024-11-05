import { useState } from "react";
import "./Login.css"
import axios from "axios"
import { FaUser } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { CiShop } from "react-icons/ci";
const Login = () => {
    const [ispassword,showpassowrd] =useState(false)
    const toggeleispassword = ()=>showpassowrd(!ispassword);
    const navigate =useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [role,setRole]=useState('')
    const [error,setError]=useState('')
    const handleSubmit =async(event)=>{
        event.preventDefault();
        if(!role){
            setError('Please Select an account type');
            return;
        }
        if(!email){
            setError('Please provide your email');
            return;
        }
        if(!password){
            setError('Please provide your password');
            return;
        }
        try{
            const response = await axios.post('http://localhost:5555/users/login',{
                email,
                pass:password,
                role
            })
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            if(response.data.user.role=== 'seller'){
                navigate('/seller')
            }
            else{
                navigate('/users')
            }
        }
        catch(e){
            setError(e.message)
            console.log(e.message)
        }
        
    }

  return (
    <>
        <div className="containerLogin">
            <div className="semimainLogin">
                <div className="firstSidelogin">
                    <h1 className="firstsidelogintext">Let's Get Started</h1>
                    <p className="firstsidelogintext">Flex with Rent a Solution to all Problems...</p>
                    <img className="imgdivmain" src="./person.png" alt="person" width="450px" height="507px" />
                    <div className="logindesign"></div>
                </div>
                <div className="midLogin"></div>
                <div className="secondSideLogin">
                    <div className="logindesign2"></div>
                  
                    <div className="LoginForm">
                        <h2>Welcome</h2>
                        <img src="./lock.png" alt="lock" height="45px" width="35px" />
                        <p>Login to continue</p>
                        <form action="submit" method="post" onSubmit={handleSubmit}>
                            <h4 className="h4form">Choose Your Account type</h4>
                            <div className="divforaccounttype">
                            <label className={`inputlogin  ${role ==='customer'? 'selected' : ' '}`}>
                                <input type="radio" name="user" value='customer'
                                checked={role==='customer'} 
                                onChange={(e)=>{setRole(e.target.value)}} />
                                <div className="detailuser">
                                    <FaUser/>
                                    <span>User</span>
                                </div>
                            </label>
                            <label className={`inputlogin ${role === 'seller' ? 'selected': ''}`}>
                                <input type="radio" name="user" value='seller' checked={role==='seller' }
                                onChange={(e)=>{setRole(e.target.value)}} />
                                <div className="detailuser">
                                    <CiShop/>
                                    <span>Seller</span>
                                </div>
                            </label>
                            </div>
                            <div className="divofinputfields">
                                <div className="firstfield">
                                    <label className="labelfortextfield" name="email">Email</label>
                                    <input className="inputfortextfirld" type="email" name="email" placeholder="Email" value={email} 
                                    onChange={(e)=>setEmail(e.target.value)} required/>
                                </div>
                                <div className="firstfield">
                                    <label className="labelfortextfield2" name="email">Password</label>
                                    <div className="inputdiv">
                                    <input className="inputfortextfirld" type={ispassword?"text":"password"} name="email" placeholder="Password" 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)} required/>
                                    <span className="eye-icon" onClick={toggeleispassword}>{ispassword ? '👁️' : '🙈'}</span>
                                </div>
                                </div>
                                
                            </div>
                            <div className="lastpart">
                            <button type="submit">Login</button>
                            <div className="error_message">{error}</div>
                            <p>Not registered yet?<Link className="linkoflast" to='/register'>Create Your account</Link></p></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login