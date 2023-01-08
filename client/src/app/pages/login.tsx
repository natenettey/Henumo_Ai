import { useState,useEffect } from "react"
import {useNavigate} from 'react-router-dom'

function Login(){

    const navigate=useNavigate()
    const [username, setUsernaame] = useState("")
    const [userpassword, setPassword] = useState("")

    //prevent unloggedin users from accessing the dashboard
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            navigate("/login")
        }else{
            fetch("http://localhost:8000/account/auth-check",{
        headers:{
            "x-access-token":token
            
        }
    }).then(response=>response.json()).then(
        data=>{
            console.log(data)
            if(data.isValid){
                
                navigate("/account/dashboard")
            }
            
        })
        }
        console.log(token)
        
     
    },[])

    const SubmitForm = (event: React.FormEvent) => {
      event.preventDefault();
      const values = {
        user: username,
        password: userpassword,
      };

      fetch("http://localhost:8000/account/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (!data.token) {
            console.log(data.message);
          } else {
            localStorage.setItem("token", data.token);
            navigate("/account/dashboard");
          }
        });
    };

    const getName = (event: React.FormEvent<HTMLInputElement>) => {
      setUsernaame((event.target as HTMLInputElement).value);
      console.log(username);
    };

    const getPassword = (event: React.FormEvent<HTMLInputElement>) => {
      setPassword((event.target as HTMLInputElement).value);
      console.log(userpassword);
    };

    

    return(
        <form onSubmit={SubmitForm}>
            <input type="text" onChange ={getName} required />
            <br/>
            <input type="password" onChange ={getPassword}required />
            <br/>
            <button type="submit">Some Clickabel</button>
        </form>
    )
}

export default Login