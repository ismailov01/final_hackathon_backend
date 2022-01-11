
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)// eslint-disable-line
    const { signUpUser, logSuccess, errorMSG } = useContext(authContext)
    useEffect(() => {
        if (logSuccess)
            navigate('/')
    }, [logSuccess])
    return (
        <>
            <div className="bodyRegister">

                <div className="containerDi">

                    <Link to="/">
                        <label
                            htmlFor="show"
                            className="close-btn fas fa-times"
                            title="close"
                        ></label>
                    </Link>
                    <div className="text">Регистрация</div>


                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            if (!email || !password) {

                            }
                            setIsSubmitting(true);
                            signUpUser(email, password, username)
                                .then((response) => {
                                })
                                .catch((error) => {
                                    console.log(error.message);
                                    Toastify({
                                        text: error.message,
                                        className: "error",
                                        style: {
                                            background:
                                                "linear-gradient(to right, rgb(71, 22, 22), red)",
                                        },
                                    }).showToast();
                                })
                                .finally(() => setIsSubmitting(false));
                        }}

                    // action="#"
                    >
                        <div className="data">
                            <label>Ваш Email</label>
                            <input
                                // value="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                            // required
                            />
                        </div>
                        <div className="data">
                            <label>Ваш Username</label>
                            <input
                                // value="email"
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                                type="text"
                            // required
                            />
                        </div>
                        <div className="data">
                            <label>Ваш пароль</label>
                            <input
                                // value="password"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                autoComplete="password"
                            // required
                            />
                        </div>

                        <div className="forgot-pass">

                        </div>
                        {
                            logSuccess ? (<></>) : (<p style={{ color: "red" }}>{errorMSG}</p>)
                        }
                        <div className="btn">
                            <div className="inner"></div>
                            <button type="submit">Регистрация</button>
                        </div>


                        <div className="signup-link">
                            Уже есть аккаунт? <Link to="/login">Войти</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}