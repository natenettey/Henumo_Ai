import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'

const Dashboard = ()=>{
    const navigate = useNavigate()
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

   return(
    <div>
        Hi 
    </div>
   )

}

export default Dashboard