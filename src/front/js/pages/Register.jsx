import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from "../../styles/SignUp.module.css";


export const Register = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {

        if (store.newUserRes == "success") {
            setMsg('')
        }
        if (store.newUserRes == "username already exists.") {
            setMsg("username already exists.")
            setTimeout(() => { setMsg("") }, 10000)
        }

    }, [store.newUserRes.length])

    const [userName, setUserName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [msg, setMsg] = useState("")
    const [registerMsg, setRegisterMsg] = useState("")

    const sendForm = () => {
        let usernameInput = userName
        usernameInput = usernameInput.toLocaleLowerCase()

        if (password.length < 5 || password.length > 10 || usernameInput.length < 3 || usernameInput.length > 20 || lastName.length < 3
            || lastName.length > 20 || firstName.length < 3 || firstName.length > 20) {
            setMsg("The registration info does not meet the registration requirements.")

        } if (password !== password2) {
            setTimeout(() => { setMsg("") }, 10000)
            return setMsg("Passwords do not match")

        } else {


            let newUser = {
                username: usernameInput,
                password: password,
                name: firstName,
                surname: lastName,
                avatar: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",

            }

            actions.createNewUser(newUser)
            setUserName('')
            setPassword('')
            setPassword2('')
            setFirstName('')
            setLastName('')
            setRegisterMsg("22")

        }
    }


    return (

        <div className={style.custom_container}>

            <div className={`${style.custom_form_container} m-5`}>

                <Link to={'/'} className={style.link}>
                    <h4>Register</h4>
                </Link>
                <h1>Sign Up Now</h1>

                {msg.length === 0 ? "" : <div className="alert alert-warning w-100" role="alert">{msg}</div>}

                {registerMsg.length === 0 ? "" :
                    <div >
                        <div className="alert alert-success w-100 d-flex" role="alert"><h2>Register complete!!</h2>

                        </div>
                    </div>
                }



                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="firstName">First Name</label>
                    <input type="text" className={`${style.custom_input} text-center`} id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="lastName">Last Name</label>
                    <input type="text" className={`${style.custom_input} text-center`} id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="username">Username</label>
                    <input type="username" className={`${style.custom_input} text-center`} id="username" placeholder="exampleUser" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="password">Password</label>
                    <input type="password" className={`${style.custom_input} text-center`} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="password">Cofirm Password</label>
                    <input type="password" className={`${style.custom_input} text-center`} id="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>

                <button type="button" className={style.custom_btn} onClick={() => sendForm()}>Click here to sign up now!</button>

                <div className={style.warning_message}>
                    <h5>Requirements for registration:</h5>
                    <p><b>Password must be a minimum length of 6</b></p>
                    <h3><b>Only "GMAIL" Accounts Accepted For Registration</b></h3>
                </div>
            </div>
        </div>
    );
};