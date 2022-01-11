import React, { useReducer } from "react";
import $axios from '../axios'
export const productContext = React.createContext()

const INIT_STATE = {
    products: null,
    productToEdit: null,
    countOfProducts: 0,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "GET_PRODUCTS_TO_EDIT":
            return { ...state, productToEdit: action.payload }
        case "GET_COUNT":
            return { ...state, countOfProducts: action.payload }
        case "CLEAR_STATE":
            return { ...state, productToEdit: action.payload };
        default:
            return state
    }
}

const ProductContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const addProducts = async (product) => {
        try {
            await $axios.post('product/create', product);
            getProducts();
        } catch (e) {
            console.log(e);
        }
    };

    // ! READ

    const getProducts = async (page = '1') => {
        try {
            // let filter = window.location.search;

            let filter = window.location.search;
            let filter1 = window.location.search;
            // console.log(filter)
            // console.log(page)
            if (filter)
                filter += `&page=${page}`
            else
                filter += `?page=${page}`

            const { data } = await $axios(`product/${filter}`);
            if (filter1)
                filter1 += '&limit=10000'
            else
                filter1 += '?limit=10000'

            const response = await $axios(`product/${filter1}`);
            dispatch({
                type: "GET_COUNT",
                payload: response.data.rows.length
            })

            let action = {
                type: "GET_PRODUCTS",
                payload: data.rows,
            };
            // console.log(response)
            dispatch(action);
        } catch (e) {
            console.log(e);
        }
    };

    // ! UPDATE

    const getProductsToEdit = async (id) => {
        try {
            const response = await $axios.get(`product/${parseInt(id)}`);
            let action = {
                type: "GET_PRODUCTS_TO_EDIT",
                payload: response.data,
            };
            // console.log(response.data);
            dispatch(action);
        } catch (e) {
            console.log(e);
        }
    };

    const saveEditedProducts = async (editedProducts) => {
        try {
            await $axios.patch(`product/${editedProducts.id}`, editedProducts);
            getProducts();
            clearState();
        } catch (e) {
            console.log(e);
        }
    };

    const clearState = () => {
        let action = {
            type: "CLEAR_STATE",
            payload: null,
        };
        dispatch(action);
    };
    //Delete
    const deleteProduct = async (id) => {
        try {
            await $axios.delete(`product / ${id} `);
            getProducts();
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <productContext.Provider
            value={{
                addProducts: addProducts,
                getProducts: getProducts,
                getProductsToEdit: getProductsToEdit,
                saveEditedProducts: saveEditedProducts,
                deleteProduct: deleteProduct,
                productToEdit: state.productToEdit,
                products: state.products,
                countOfProducts: state.countOfProducts
            }}
        >

            {props.children}
        </productContext.Provider>
    )
}

export default ProductContextProvider;