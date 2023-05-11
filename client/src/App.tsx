import {useState, useEffect} from "react"
import {Routes, BrowserRouter as Router, Route,useNavigate} from 'react-router-dom'
import Login from "./app/pages/login/login";
import Register from "./app/pages/registration/register";
import Dashboard from "./app/pages/dashboard";
import NavBar from "./app/components/navBar/navBarComponent";
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'cursive',
    ].join(','),
  },});
  
function App() {


 
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar></NavBar>
      <Router>
         <Routes>
         
          <Route   path="/register"  element={<Register/>}/>
          <Route   path="/login"  element={<Login/>}/>
          <Route   path="/account/dashboard/"  element={<Dashboard/>}/> 

          
         </Routes>
      </Router>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
