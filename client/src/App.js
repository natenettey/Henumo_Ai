import {useState, useEffect} from "react"
import './App.css';

function App() {
  const [data,setData]=useState({})
  useEffect(()=>{
    fetch("/home")
    .then(res=>res.json())
    .then(data=>setData(data))
  },[])
  return (
    <div className="App">
      <div>
      {data.name}</div>
    </div>
  );
}

export default App;
