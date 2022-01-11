import { Button } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/ProductContext";

const Pagination = () => {
    const { products, getProducts, countOfProducts } = useContext(productContext);
    const pageNumbers = [];


    const [currentPage, setCurrentPage] = useState(1)
    const handlePage = (page) => {
        setCurrentPage(page)
        getProducts(page.toString())
    }
    useEffect(() => {
        getProducts()
    }, [])
    // console.log(countOfProducts)
    for (let i = 1; i <= Math.ceil(countOfProducts / 3); i++) {
        pageNumbers.push(i);
    }
    // console.log(products)
    return (
        <div className="pagination">
            <div className="pagination-div">
                <ul>
                    {
                        pageNumbers.map((page) => (
                            <li key={page}>
                                {currentPage === page ? (
                                    <Button
                                        variant="outline-success"
                                        style={{
                                            backgroundColor: "#1C374C",
                                            border: "none",
                                            padding: "0 20px",
                                            display: "inline-block",
                                            height: "30px",
                                            marginTop: "13px",
                                            marginRight: "10px",
                                        }}
                                        onClick={() => {
                                            handlePage(page);
                                        }}
                                    >
                                        {page}
                                    </Button>
                                ) : (
                                    <Button
                                        style={{
                                            backgroundColor: "#31B8BF",
                                            border: "none",
                                            padding: "0 20px",
                                            display: "inline-block",
                                            height: "30px",
                                            marginTop: "13px",
                                            marginRight: "10px",
                                        }}
                                        onClick={() => {
                                            handlePage(page);
                                        }}
                                    >
                                        {page}
                                    </Button>
                                )}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Pagination;