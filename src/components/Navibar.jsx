import React, { useContext, useEffect } from "react";
import { Container, Button, Navbar, Nav, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
const Navibar = () => {
    // const { user } = useContext(authContext)
    const user = JSON.parse(localStorage.getItem("user"));
    // if (!user) {
    //     // console.log(user);
    //     localStorage.setItem(
    //         "user",
    //         JSON.stringify({
    //             username: "guest"
    //         })
    //     );

    //     // console.log(JSON.parse(localStorage.getItem("user")));
    // }
    // useEffect(() => {
    //     checkSubscribe(user.currentUser.email);
    // }, []);
    const history = useNavigate();
    const { logOut } = useContext(authContext)
    const handleLogOut = () => {
        logOut();
        history("/");
        localStorage.clear();
    };
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Basket world</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "150px" }}
                        navbarScroll
                    >
                        <Link
                            style={{
                                padding: "3px",
                                textDecoration: "none",
                                color: "#000000",
                            }}
                            to="/"
                        >
                            Home
                        </Link>
                        <Link
                            style={{
                                padding: "3px",
                                textDecoration: "none",
                                color: "#000000",
                            }}
                            to="/history"
                        >
                            History
                        </Link>
                        <Link
                            style={{
                                padding: "3px",
                                textDecoration: "none",
                                color: "#000000",
                            }}
                            to="/views"
                        >
                            Views
                        </Link>
                        <Link
                            style={{
                                padding: "3px",
                                textDecoration: "none",
                                color: "#000000",
                            }}
                            to="/products"
                        >
                            Products
                        </Link>
                        {/* <button onClick={handleLogOut}>Logout</button> */}
                    </Nav>
                    {user ? (
                        <>
                            {/* {user.role === "admin" ? (
                                <Link to="/chat" style={{ textDecoration: "none" }}>
                                    <Button className="me-3">Admin</Button>
                                </Link>
                            ) : (
                                <Link to={`/chat/${user.email}`}>
                                    <Button className="me-3">Chat with admin</Button>
                                </Link>
                            )} */}
                            {/* {checking ? (
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        // console.log(googleUser);
                                        deleteSubscribe(googleUser.email);
                                    }}
                                >
                                    Отписаться
                                </Button>
                            ) : (
                                <Link to="/subscribe">
                                    <Button>Подписаться</Button>
                                </Link>
                            )} */}

                            {/* {user.email !== "beknazaromurbek@gmail.com" ? (
                                <>
                                    <Link style={{ marginRight: "10px" }} to="/cart">
                                        {" "}
                                        <Badge bg="secondary">
                                            {countOfProducts}
                                            <BsFillCartFill />
                                        </Badge>
                                    </Link>
                                    <Link to="/favorites">
                                        {" "}
                                        <Badge bg="secondary">
                                            {countOfProductsFavorites}
                                            <BsHeartFill />
                                        </Badge>
                                    </Link>
                                </>
                            ) : (
                                <></>
                            )} */}

                            <h6>{user.username}</h6>
                            <Button
                                style={{ marginLeft: "10px" }}
                                onClick={() => {
                                    handleLogOut();
                                }}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline-dark" >
                                    Войти
                                </Button>
                            </Link>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Navibar;