import { useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import CardCustomer from "../../components/card_customer/CardCustomer"
import LatestProduct from "../../components/latestProduct/LatestProduct"
import Categories from "../../components/categories/Categories"
import Footer from "../../components/footer/Footer"
import "./home.css"
const Home = () => {
  const [shopping,hasStartedShopping]=useState(false)

  const toggleShopping = ()=>{
    hasStartedShopping(!shopping)
  }
  return (
    <>
    <div>
      <Navbar />
      { shopping ? (<>
        <CardCustomer/>
      </> ):(
        <>
      <div id="abc" className="hero">
        <div className="paraHero">
          <h1>Rent in a new way</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto voluptatem illum rerum voluptas consequuntur fuga assumenda, repellat, atque a ratione quos quidem eius? Ipsa ipsam officia maiores eligendi excepturi recusandae!</p>
          <button className="buttonfalse" onClick={toggleShopping}> Start Shopping</button>
        </div>
        <img className="bodyimgofhero" src="./Outlet.jpg" alt='outlook'/>
      </div>
      <LatestProduct limit={6} />
      <Categories/>
      <div id="abc" className="backtotop">
        <a href="#abc">Back to Top</a>
      </div>
      <Footer/>
      </>
      )}
    </div></>
  )
}

export default Home