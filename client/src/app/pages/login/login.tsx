import { useState,useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import Cookies from "js-cookie";
import style from '../login/LoginPage.module.css'
import clearLogo from "./../../../assets/henumo_transparent.png";
import TextFields from "../../components/textField/textFieldComponent";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import { loginService } from "../../../services/LoginServices";


function Login(){

    const navigate=useNavigate()
    const [username, setUsernaame] = useState("")
    const [userpassword, setPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const setToken = (authToken: string) => {
      Cookies.set("authToken", authToken, {
        expires: new Date(Date.now() + 15 * 60 * 1000),
      });
    };

    function handleClick() {
      setLoading(true);
    }
    
    //prevent unloggedin users from accessing the dashboard
    useEffect(()=>{
        const token = Cookies.get("authToken");
        
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
       handleClick()
      const values = {
        user: username,
        password: userpassword,
      };

      loginService(values)
        .then((data) => {
          console.log(data);
          if (!data.data.token) {
             setLoading(false);
            console.log(data.data.message);
          } else {
            console.log(data.data.token);
            setToken(data.data.token);
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

    

    return (
      <div className={style.container}>
        <div className={style.logo_container}>
          <img src={clearLogo} alt="transparent logo" />
        </div>
        <div className={style.form_container}>
          <div className={style.form_container_box}>
            <div className={style.form_container_box_caption}>
              <h4>Welcome</h4>
            </div>
            <div className={style.form_container_box_caption}>
              <h2>Let's Log In</h2>
            </div>
            <form onSubmit={SubmitForm}>
              <div className={style.input_container}>
                <TextFields onChange={getName} label={"Email Address"} />
              </div>
              <div className={style.input_container}>
                <TextFields
                  style={{ marginTop: 20 }}
                  sx={{
                    margin: "20px",
                  }}
                  onChange={getPassword}
                  label={"Password"}
                  type="password"
                />
              </div>
              <LoadingButton
                size="small"
                color="secondary"
                startIcon={<LoginOutlinedIcon />}
                onClick={SubmitForm}
                loading={loading}
                loadingPosition="start"
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "150px",
                  backgroundColor: "#0069d9",
                  fontSize: "20px",
                  fontFamily: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                  ].join(","),
                }}
                type="submit"
              >
                Log In
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login