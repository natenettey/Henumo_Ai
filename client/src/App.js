import {useState, useEffect} from "react"
import {Routes, BrowserRouter as Router, Route,useNavigate} from 'react-router-dom'
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Dashboard from "./components/pages/dashboard";
import './App.css';

function App() {


 
  return (
    <div className="App">
      <Router>
         <Routes>
         
          <Route   path="/register" exact element={<Register/>}/>
          <Route   path="/login" exact element={<Login/>}/>
          <Route   path="/account/dashboard/" exact element={<Dashboard/>}/> 

          
         </Routes>
      </Router>
    </div>
  );
}

export default App;
