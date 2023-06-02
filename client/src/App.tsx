import {useState, useEffect} from "react"
import {Routes, BrowserRouter as Router, Route,useNavigate} from 'react-router-dom'
import Login from "./app/pages/login/login";
import Register from "./app/pages/registration/register";
import Dashboard from "./app/pages/dashboard";
import NavBar from "./app/components/navBar/navBarComponent";
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import ItemsPage from "./app/pages/itemPage/itemsPage";
import SingleItemPage from "./app/pages/singleItem/singleItemPage";
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
        
      <Router>
         <Routes>
         <Route   path="/items"  element={<ItemsPage/>}/>
          <Route   path="/register"  element={<Register/>}/>
          <Route   path="/login"  element={<Login/>}/>
          <Route   path="/account/dashboard/"  element={<Dashboard/>}/>
          <Route   path="items/single-item/:productID"  element={<SingleItemPage/>}/> 

          
         </Routes>
      </Router>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
