import axios from "axios";
import React, { useReducer } from "react";
import $axios from "../axios";
// import { APIfeedbacks } from "../const/config";

export const feedbackContext = React.createContext();

const INIT_STATE = {
    feedbacks: null,
    feedbacksToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_FEEDBACKS":
            return { ...state, feedbacks: action.payload };
        case "GET_FEEDBACKS_TO_EDIT":
            return { ...state, feedbacksToEdit: action.payload };
        default:
            return state;
    }
};

const FeedbackContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    // ! CREATE

    const addFeedback = async (userId, productId, rate) => {
        try {
            let feedbacks = {
                userId,
                productId,
                rate,
            };
            const response = await $axios.post('feedback/create', feedbacks);
            getFeedbacks(productId);
        } catch (e) {
            console.log(e);
        }
    };

    // ! READ

    const getFeedbacks = async (productId) => {
        try {
            const response = await $axios('feedback/' + productId);
            let action = {
                type: "GET_FEEDBACKS",
                payload: response.data,
            };
            dispatch(action);
        } catch (e) {
            console.log(e);
        }
    };

    // ! UPDATE

    const getFeedbacksToEdit = async (id) => {
        try {
            const response = await $axios(`${'feedback'}/${id}`);
            let action = {
                type: "GET_FEEDBACKS_TO_EDIT",
                payload: response.data,
            };
        } catch (e) {
            console.log(e);
        }
    };

    const saveEditedFeedbacks = async (editedFeedbacks) => {
        try {
            const response = await $axios.patch(
                `${'feedback'}/${editedFeedbacks.id}`,
                editedFeedbacks
            );
            getFeedbacks(editedFeedbacks.productId);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <feedbackContext.Provider
            value={{
                addFeedback: addFeedback,
                getFeedbacks: getFeedbacks,
                getFeedbacksToEdit: getFeedbacksToEdit,
                saveEditedFeedbacks: saveEditedFeedbacks,
                feedbacks: state.feedbacks,
                feedbacksToEdit: state.feedbacksToEdit,
            }}
        >
            {props.children}
        </feedbackContext.Provider>
    );
};

export default FeedbackContextProvider;