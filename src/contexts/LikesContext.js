import axios from "axios";
import React, { useReducer } from "react";
import $axios from "../axios";
// import { APIlikes } from "../const/config";

export const likesContext = React.createContext();

const INIT_STATE = {
    likes: null,
    likesToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_LIKES":
            return { ...state, likes: action.payload };
        case "GET_LIKES_TO_EDIT":
            return { ...state, likesToEdit: action.payload };
        default:
            return state;
    }
};

const LikesContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    // ! CREATE

    const addLike = async (userId, productId, status) => {
        try {
            let likes = {
                userId,
                productId,
                status,
            };
            const response = await $axios.post('like/create', likes);
            getLikes(productId);
        } catch (e) {
            console.log(e);
        }
    };

    // ! READ

    const getLikes = async (productId) => {
        try {
            const response = await $axios('like/' + productId);
            let action = {
                type: "GET_LIKES",
                payload: response.data,
            };
            dispatch(action);
        } catch (e) {
            console.log(e);
        }
    };

    // ! UPDATE

    const getLikesToEdit = async (id) => {
        try {
            const response = await $axios(`'like/get/${id}`);
            let action = {
                type: "GET_LIKES_TO_EDIT",
                payload: response.data,
            };
        } catch (e) {
            console.log(e);
        }
    };

    const saveEditedLikes = async (editedLikes) => {
        try {
            const response = await $axios.patch(`like/${editedLikes.id}`, editedLikes
            );
            getLikes(editedLikes.productId);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <likesContext.Provider
            value={{
                addLike: addLike,
                getLikes: getLikes,
                getLikesToEdit: getLikesToEdit,
                saveEditedLikes: saveEditedLikes,
                likes: state.likes,
                likesToEdit: state.likesToEdit,
            }}
        >
            {props.children}
        </likesContext.Provider>
    );
};

export default LikesContextProvider;