import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import clearLogo from "./../../../assets/henumo_transparent.png";
import TextFields from "../../components/textField/textFieldComponent";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import style from "../registration/RegisterPage.module.css";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function Register(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [userpassword, setPassword] = useState("")
    const [usercompany, setUserCompany] = useState("")
    const [usermail, setUserMail] = useState("")
    const [loading, setLoading] = useState(false);

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
      setLoading(true)
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
          }else setLoading(false);
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

    return (
      <div className={style.container}>
        <div className={style.logo_container}>
          <img src={clearLogo} alt="transparent logo" />
        </div>
        <div className={style.form_container}>
          <div className={style.form_container_box}>
            <div className={style.form_container_box_caption}>
              <h4>Hey There !</h4>
            </div>
            <div className={style.form_container_box_caption}>
              <h2>Let's Sign Up</h2>
            </div>
            <form onSubmit={SubmitForm}>
              <div className={style.input_container}>
                <TextFields onChange={getName} label={"Username"} type="text" />
              </div>
              <div className={style.input_container}>
                <TextFields
                  onChange={getEmail}
                  label={"Email Address"}
                  type="email"
                />
              </div>
              <div className={style.input_container}>
                <TextFields
                  style={{ marginTop: 20 }}
                  sx={{
                    margin: "20px",
                  }}
                  onChange={getCompany}
                  label={"Company Name"}
                  type="text"
                />
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
                startIcon={<HowToRegIcon />}
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
                Sign Up
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
      // <form onSubmit={SubmitForm}>
      //     <input type="text" onChange ={getName} required />
      //     <br/>
      //     <input type="text" onChange ={getEmail}required />
      //     <br/>
      //     <input type="text" onChange ={getCompany} required />
      //     <br/>
      //     <input type="password" onChange ={getPassword}required />
      //     <br/>
      //     <button type="submit">Some Clickabel</button>
      // </form>
    );
}

export default Register