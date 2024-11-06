import Home from "./pages/home/home"
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
      </Routes>
    </Router>
    </div>
  )
}

export default App