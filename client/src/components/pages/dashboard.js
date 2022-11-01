import { useEffect,useState } from "react"
import {useNavigate} from 'react-router-dom'

const Dashboard = ()=>{
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({})
   

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
            }else{
                setUserInfo (data.user_info)
                console.log(userInfo)
            }
            
        })
        }
        console.log(token)
        
     
    },[])

    const logOut=()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }

   return(
    <div>
        Hi {userInfo.username}
        <br/>
        <button onClick={logOut}>Logout</button>
    </div>
   )

}

export default Dashboard