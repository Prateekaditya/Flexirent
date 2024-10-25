import Home from "./pages/home/home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import "./App.css"
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='login' element= {<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App