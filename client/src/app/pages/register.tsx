import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'

function Register(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [userpassword, setPassword] = useState("")
    const [usercompany, setUserCompany] = useState("")
    const [usermail, setUserMail] = useState("")

    //prevent unloggedin users from accessing the dashboard
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            navigate("/register")
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

    //submit form
    const SubmitForm = (event: React.FormEvent) => {
      event.preventDefault();
      const values = {
        user: username,
        email: usermail,
        company: usercompany,
        password: userpassword,
      };

      fetch("http://localhost:8000/account/register", {
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
          if (data.status == "ok") {
            navigate("/login");
          }
        });
    };

    //collect inputs
    const getName = (event: React.FormEvent<HTMLInputElement>) => {
      setUsername((event.target as HTMLInputElement).value);
      console.log(username);
    };

    const getEmail = (event: React.FormEvent<HTMLInputElement>) => {
      setUserMail((event.target as HTMLInputElement).value);
      console.log(usermail);
    };

    const getCompany = (event: React.FormEvent<HTMLInputElement>) => {
      setUserCompany((event.target as HTMLInputElement).value);
      console.log(usercompany);
    };

    const getPassword = (event: React.FormEvent<HTMLInputElement>) => {
      setPassword((event.target as HTMLInputElement).value);
      console.log(userpassword);
    };

    return(
        <form onSubmit={SubmitForm}>
            <input type="text" onChange ={getName} required />
            <br/>
            <input type="text" onChange ={getEmail}required />
            <br/>
            <input type="text" onChange ={getCompany} required />
            <br/>
            <input type="password" onChange ={getPassword}required />
            <br/>
            <button type="submit">Some Clickabel</button>
        </form>
    )
}

export default Register