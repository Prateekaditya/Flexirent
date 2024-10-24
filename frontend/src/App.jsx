import Home from "./components/home/home"
import Login from "./components/login/Login"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import "./App.css"
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='login' element= {<Login/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App