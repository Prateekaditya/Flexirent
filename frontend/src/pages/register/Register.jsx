import { useState } from "react";
import "./register.css"

import { FaUser } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { Link } from "react-router-dom";
import { CiShop } from "react-icons/ci";
const Register = () => {
    const [ispassword,showpassowrd] =useState(false)
    const toggeleispassword = ()=>showpassowrd(!ispassword);
    const [isconfirmpassword,showconfirmpassowrd] =useState(false)
    const toggeleisconfirmpassword = ()=>showconfirmpassowrd(!isconfirmpassword);
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [role,setRole]=useState('')
    const [name,setName]=useState('')
    const [cpass,setCpass]=useState('')
  
    const handleSubmit =(event)=>{
        event.preventDefault();
        if(!role){
            alert('Please Select an account type');
            return;
        }
        console.log("name:",name);
        console.log("email:",email);
        console.log("password:",password);
        console.log("role:",role);
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
                        <div className="create">
                        <p>Create Your Account </p>
                        <img className="registerimg" src="./create.png" height="15px" width="20px"></img>
                        </div>
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
                                    <label className="labelfortextfield" name="name">Name</label>
                                    <input className="inputfortextfirld" type="text" name="name" placeholder="Enter your name" value={name} 
                                    onChange={(e)=>setName(e.target.value)} required/>
                                </div>
                                <div className="firstfield">
                                    <label className="labelfortextfield" name="email">Email</label>
                                    <input className="inputfortextfirld" type="email" name="email" placeholder="Enter your Email" value={email} 
                                    onChange={(e)=>setEmail(e.target.value)} required/>
                                </div>
                                <div className="firstfield">
                                    <label className="labelfortextfield2" name="password">Password</label>
                                    <div className="inputdiv">
                                    <input className="inputfortextfirld" type={ispassword?"text":"password"} name="password" placeholder="Enter your Password" 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)} required/>
                                    <span className="eye-icon" onClick={toggeleispassword}>{ispassword ? '👁️' : '🙈'}</span>
                                </div>
                                </div>
                                <div className="firstfield">
                                    <label className="labelfortextfield3" name="cpass">Confirm Password</label>
                                    <div className="inputdiv">
                                    <input className="inputfortextfirld" type={ispassword?"text":"password"} name="cpass" placeholder="Confirm Password" 
                                    value={cpass} 
                                    onChange={(e)=>setCpass(e.target.value)} required/>
                                    <span className="eye-icon" onClick={toggeleisconfirmpassword}>{isconfirmpassword ? '👁️' : '🙈'}</span>
                                </div>
                                </div>
                            </div>
                            <div className="lastpart">
                            <button type="submit">Register</button>
                            <p>Already have a account?<Link className="linkoflast" to='/login'>Login</Link></p></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register