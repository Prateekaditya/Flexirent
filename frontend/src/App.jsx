import Home from "./pages/home/home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Landing from "./pages/landingPage/Landing"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import "./App.css"
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element= {<Landing/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/users' element={<Home/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App