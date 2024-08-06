import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'
import style from "../../styles/Login.module.css"


export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [redirectMsg, setRedirectMsg] = useState("");

    const sendLoginForm = () => {
        if (password.length < 5 || password.length > 10) {
            setMsg("password only can be more than 5 characters and minus than 10")
            setTimeout(() => { setMsg("") }, 10000)

        }
        else if (userName.length < 3 || userName.length > 20) {
            setMsg("username only can be more than 5 characters and minus than 10")
            setTimeout(() => { setMsg("") }, 10000)

        }
        else {
            actions.logIn(userName, password)
        }
    }

    useEffect(() => {
        if (store.loginRes == "success") {
            navigate('/home')

        }

        if (store.loginRes == "Incorrect password") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("Incorrect password")
        }

        if (store.loginRes == "username don't exist") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("username don't exist")
        }

        if (store.loginRes == "this username is not registered") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("this username is not registered")
        }


    }, [store.loginRes.length])

    return (
        <div className={`${style.container} container-fluid`}>


            <div className={style.logo_box}>
                <Link to='/login' className={style.logo_login}>DTECH INC</Link>
            </div>
            <div className={style.welcome}>
                <p>Welcome!</p>
            </div>
            <div className={style.form_container}>


                <div className={style.form_floating}>
                    {msg.length == 0 ? "" : <div className="alert alert-danger" role="alert">{msg}</div>}
                    {redirectMsg.length == 0 ? "" :
                        <div className="alert alert-warning" role="alert">
                            User not pay, redirecting to paypal...
                            <div className="spinner-border text-light mx-2" role="status">
                            </div>
                        </div>


                    }
                    <label>Username</label>
                    <input type="username" className={`${style.form_control} text-center`} id="username" placeholder="Username" value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                sendLoginForm();
                        }}

                    />

                </div>
                <div className={style.form_floating}>
                    <label>Password</label>
                    <input type="password" className={`${style.form_control} text-center`} id="Password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                sendLoginForm();
                        }}
                    />

                </div>
                <button className={style.btn} onClick={() => sendLoginForm()}>Submit</button>

                <div className={style.m_3}>
                    <Link className={style.text_danger} to="/register">Not registered?</Link>
                </div>
            </div>





        </div>

    )
}