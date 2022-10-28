import { useState } from "react"
import {useNavigate, UseNavigate} from 'react-router-dom'

function Login(){

    const navigate=useNavigate()
    const [username, setUsernaame] = useState("")
    const [userpassword, setPassword] = useState("")

    const SubmitForm=(event)=>{
        event.preventDefault()
        const values ={
            user:username,
            password:userpassword

        }

        fetch(
            "http://localhost:8000/account/login",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(values)
            }
        ).then(response=>{
             return response.json()
        }).then(data=>{
            console.log(data)
            if (!data.token){
                console.log(data.message)
            }else{
                localStorage.setItem("token",data.token)
                navigate('/account/dashboard')

            }
            
        })
    }

    const getName = (event)=>{
        setUsernaame(event.target.value)
        console.log(username)

    }

    const getPassword = (event)=>{
        setPassword(event.target.value)
        console.log(userpassword)

    }

    

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