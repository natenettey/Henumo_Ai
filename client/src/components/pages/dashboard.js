import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'

const Dashboard = ()=>{
    const navigate = useNavigate()

    //prevent users from accessing the login page when logged in
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
            if(!data.isValid){
                
                navigate("/login")
            }
            
        })
        }
        console.log(token)
        
     
    },[])

    const logOut=()=>{
        localStorage.removeItem("token")
        navigate("/loginl")
    }

   return(
    <div>
        Hi
        <button onClick={logOut}>Logout</button>
    </div>
   )

}

export default Dashboard