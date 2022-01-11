import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { productContext } from "../contexts/ProductContext";
import Comment from "../components/comments/Comment";
import Feedback from "../components/Feedbacks";
import Likes from "../components/Likes";
// import Feedbacks from "../components/Feedbacks/Feedbacks";
// import RecommendItems from "../components/RecommendItems";
// import Comment from "../components/comments/Comment";
// import Likes from "../components/Likes/Likes";
// import { viewsContext } from "../contexts/ViewsContext";
// import { subscribersContext } from "../contexts/SubscribersContext";
const DetailPage = () => {
    const {
        getProductsToEdit,
        productToEdit,
        // checkProductInCart,
        // addAndDeleteProductInCart,
        // checkProductInFavorites,
        // addAndDeleteProductInFavorites,
    } = useContext(productContext);
    // const { getSubscriber, subscribers, checkSubscribe, checking } =
    //     useContext(subscribersContext);
    // useEffect(() => {
    //     getSubscriber(user.currentUser.email);
    //     checkSubscribe(user.currentUser.email);
    // }, []);
    const params = useParams();
    useEffect(() => {
        getProductsToEdit(params.id);
    }, []);
    let user = JSON.parse(localStorage.getItem("user"));
    // const { addViews } = useContext(viewsContext);
    // useEffect(() => {
    //     addViews(user.currentUser.email, productToEdit);
    // }, [productToEdit]);
    // if (productToEdit) {
    // }
    return (
        <div className="container">
            {productToEdit ? (
                <div style={{ display: "flex" }}>
                    <div>
                        <img width="500px" src={productToEdit.image} alt="product" />
                    </div>
                    <div>
                        <h2>{productToEdit.name}</h2>
                        <h3>{productToEdit.description}</h3>
                        <p>
                            {/* {checking ? (
                                subscribers ? (
                                    <>
                                        <del style={{ color: "red" }}>{productToEdit.price}</del>
                                        <ins style={{ color: "blue", fontWeight: "500" }}>
                                            {Math.round(
                                                (productToEdit.price * (100 - subscribers.discount)) /
                                                100
                                            )}
                                        </ins>
                                    </>
                                ) : (
                                    <h4>Load</h4>
                                )
                            ) : (
                                productToEdit.price
                            )} */}
                            {productToEdit.price}

                        </p>
                        <p>Brand: {productToEdit.brand} </p>
                        <div
                            style={{
                                marginBottom: "-10px",
                                width: "30px",
                                borderRadius: "50%",
                                height: "30px",
                                display: "inline-block",
                            }}
                        ></div>
                        <br />
                        <br />
                        <Feedback />
                        <Likes />
                        {/* <>
                            <Button
                                style={{ marginRight: "10px" }}
                                variant={
                                    checkProductInCart(productToEdit.id) ? "danger" : "primary"
                                }
                                onClick={() => {
                                    {
                                        checking ? (
                                            subscribers ? (
                                                <>
                                                    {addAndDeleteProductInCart(
                                                        productToEdit,
                                                        subscribers.discount
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )
                                        ) : (
                                            <>{addAndDeleteProductInCart(productToEdit)}</>
                                        );
                                    }
                                }}
                            >
                                Корзина
                            </Button>
                            <Button
                                variant={
                                    checkProductInFavorites(productToEdit.id)
                                        ? "danger"
                                        : "primary"
                                }
                                onClick={() => addAndDeleteProductInFavorites(productToEdit)}
                            >
                                Избранное
                            </Button>
                            <Feedbacks />
                            <Likes />
                        </> */}
                    </div>
                </div>
            ) : (
                <h2>Loading</h2>
            )}

            <Comment />
            {/* <RecommendItems /> */}
        </div>
    );
};

export default DetailPage;