import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Landing from "./pages/landingPage/Landing"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import SellerHome from "./pages/sellerHome/SellerHome"
import "./App.css"
import GetProducts from "./pages/sellerPages/GetProducts"
import Create from "./pages/sellerPages/Create"
import Order from "./pages/sellerPages/Order"
import Review from "./pages/sellerPages/Review"
import ProductDetails from "./pages/productDetails/ProductDetails"
import Cart from "./pages/cart/Cart"
const App = () => {
  return (
    <div>
    <Router>
      <Routes >
        <Route path='/' element= {<Landing/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/users' element={<Home/>}/>
        <Route path='/seller' element={<SellerHome/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/products' element={<GetProducts/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/review' element={<Review/>}/>
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App