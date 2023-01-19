import {useState, useEffect} from "react"
import {Routes, BrowserRouter as Router, Route,useNavigate} from 'react-router-dom'
import Login from "./app/pages/login/login";
import Register from "./app/pages/registration/register";
import Dashboard from "./app/pages/dashboard";
import './App.css';

function App() {


 
  return (
    <div className="App">
      <Router>
         <Routes>
         
          <Route   path="/register"  element={<Register/>}/>
          <Route   path="/login"  element={<Login/>}/>
          <Route   path="/account/dashboard/"  element={<Dashboard/>}/> 

          
         </Routes>
      </Router>
    </div>
  );
}

export default App;
