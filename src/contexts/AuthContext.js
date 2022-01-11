import React, { useReducer } from "react";
import jwt_decode from "jwt-decode";
// import { APIusers } from "../const/config";
import axios from "axios";
import $axios from "../axios";

export const authContext = React.createContext();
const INIT_STATE = {
    user: null,
    logSuccess: false,
    errorMSG: null
};
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload }
        case "LOGOUT_USER":
            return { ...state, user: action.payload }
        case "LOG_SUCCESS":
            return { ...state, logSuccess: action.payload }
        case "ERROR_MSG":
            return { ...state, errorMSG: action.payload }
        case "GET_USER":
            return { ...state, user: action.payload }
        default:
            return state;
    }
};

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    // AUTH with google

    const signUpUser = async (email, password, username) => {
        try {
            let res = await $axios('user');

            let { data } = await $axios.post('user/signup', {
                password,
                email,
                username
            });
            localStorage.setItem('token', JSON.stringify(data))
            await $axios('user');
            dispatch({
                type: "LOGIN_USER",
                payload: data,
            });
            dispatch({
                type: "LOG_SUCCESS",
                payload: true,
            });
            const user = jwt_decode(data.accessToken);
            localStorage.setItem('user', JSON.stringify(user))
        } catch (e) {
            dispatch({
                type: "LOG_SUCCESS",
                payload: false
            })
            dispatch({
                type: "ERROR_MSG",
                payload: "User with given email has already exists"
            })
            console.log(e);
        }
    };
    const loginUser = async (email, password) => {
        try {
            let res = await $axios('user');
            // if (user) {
            // if (user.password !== password) {
            //     console.log("wrong password");
            //     return
            // }
            let { data } = await $axios.post('user/login', {
                password,
                email,
            });
            localStorage.setItem('token', JSON.stringify(data))
            await $axios('user');
            dispatch({
                type: "LOGIN_USER",
                payload: data,
            });
            dispatch({
                type: "LOG_SUCCESS",
                payload: true,
            });
            const user = jwt_decode(data.accessToken);
            localStorage.setItem('user', JSON.stringify(user))

            // }
        } catch (error) {
            dispatch({
                type: "LOG_SUCCESS",
                payload: false
            })
            dispatch({
                type: "ERROR_MSG",
                payload: 'Wrong mail or password'
            })
            console.log(error + "qweqweqweqwe");
            console.log(state.errorMSG + "qweqweqweqwe");
        }
    }

    const logOut = async () => {
        try {
            localStorage.removeItem('token')
            dispatch({
                type: "LOGOUT_USER",
                payload: null
            })
            dispatch({
                type: "LOG_SUCCESS",
                payload: false
            })
        } catch (e) {
            console.log(e);
        }
    };

    const getUser = async (id) => {
        try {
            const user = await $axios.get('user/' + id)

            dispatch({
                type: "GET_USER",
                payload: user
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <authContext.Provider
            value={{
                logOut,
                signUpUser,
                loginUser,
                user: state.user,
                logSuccess: state.logSuccess,
                errorMSG: state.errorMSG,
                getUser
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;