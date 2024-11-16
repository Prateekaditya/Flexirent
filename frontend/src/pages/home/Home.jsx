import { useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import "./home.css"
const Home = () => {
  const [shopping,hasStartedShopping]=useState(false)

  const toggleShopping = ()=>{
    hasStartedShopping(!shopping)
  }
  return (
    <>
    <div>
      <Navbar/>
      { shopping ? (<></> ):(
      <div className="hero">
        <div className="paraHero">
          <h1>Rent in a new way</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto voluptatem illum rerum voluptas consequuntur fuga assumenda, repellat, atque a ratione quos quidem eius? Ipsa ipsam officia maiores eligendi excepturi recusandae!</p>
          <button onClick={toggleShopping}> Start Shopping</button>
        </div>
        <img className="bodyimgofhero" src="./Outlet.jpg" alt='outlook'/>
      </div>)}
    </div></>
  )
}

export default Home