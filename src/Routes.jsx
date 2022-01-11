import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navibar from './components/Navibar';
import AdminPage from './pages/AdminPage';
import MainPage from './pages/MainPage';
import ProblemList from './ProblemList';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegistarPage';
import AuthContextProvider from './contexts/AuthContext';
import ProductPage from './pages/ProductPage';
import ProductContextProvider from './contexts/ProductContext';
import EditPage from './pages/EditPage';
import DetailPage from './pages/DetailPage';
import CommentContextProvider from './contexts/CommentContext';
import FeedbackContextProvider from './contexts/FeedbackContext';
import LikesContextProvider from './contexts/LikesContext';
const MyRoutes = () => {
    return (
        <AuthContextProvider>
            <ProductContextProvider>
                <CommentContextProvider>
                    <FeedbackContextProvider>
                        <LikesContextProvider>
                            <BrowserRouter>
                                <Navibar />
                                <Routes>
                                    <Route path="/" element={<MainPage />} />
                                    <Route path="/admin" element={<AdminPage />} />
                                    <Route path="/problem" element={<ProblemList />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/products" element={<ProductPage />} />
                                    <Route path="/products/edit/:id" element={<EditPage />} />
                                    <Route path="/products/detail/:id" element={<DetailPage />} />
                                </Routes>
                            </BrowserRouter>
                        </LikesContextProvider>
                    </FeedbackContextProvider>
                </CommentContextProvider>
            </ProductContextProvider>
        </AuthContextProvider>
    );
};

export default MyRoutes;