import { useState } from "react"

function Register(){

    const [username, setUsername] = useState("")
    const [userpassword, setPassword] = useState("")
    const [usercompany, setUserCompany] = useState("")
    const [usermail, setUserMail] = useState("")

    const SubmitForm=(event)=>{
        event.preventDefault()
        const values ={
            user:username,
            email:usermail,
            company:usercompany,
            password:userpassword

        }

        fetch(
            "http://localhost:8000/account/register",{
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
            
            
        })
    }

    //collect inputs
    const getName = (event)=>{
        setUsername(event.target.value)
        console.log(username)

    }

    const getEmail = (event)=>{
        setUserMail(event.target.value)
        console.log(usermail)

    }

    const getCompany = (event)=>{
        setUserCompany(event.target.value)
        console.log(usercompany)

    }

    const getPassword = (event)=>{
        setPassword(event.target.value)
        console.log(userpassword)

    }

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