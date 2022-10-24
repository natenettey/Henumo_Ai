import {useState, useEffect} from "react"
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./auth/login";
import Register from "./auth/register";
import './App.css';

function App() {
  // const [data,setData]=useState({})
  // useEffect(()=>{
  //   fetch("/home")
  //   .then(res=>res.json())
  //   .then(data=>setData(data))
  // },[])
 
  return (
    <div className="App">
      <Router>
         <Routes>
         
          <Route   path="/register" exact element={<Register/>}/>
          <Route   path="/login" exact element={<Login/>}/>  
          
         </Routes>
      </Router>
    </div>
  );
}

export default App;
