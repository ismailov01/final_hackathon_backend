import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { productContext } from "../contexts/ProductContext";

const EditPage = () => {
    const { saveEditedProducts, getProductsToEdit, productToEdit } =
        useContext(productContext);
    const params = useParams();
    useEffect(() => {
        getProductsToEdit(params.id);
    }, []);
    // console.log(params.id)
    const schema = yup.object().shape({
        name: yup.string().min(2).max(30).required("Required"),
        brand: yup.string().required("Required"),
        description: yup.string().min(5).max(100).required("Required"),
        image: yup.string().required("Required"),
        price: yup.string().min(3).max(255).required("Required"),
    });
    const navigate = useNavigate();
    return (
        <div>
            <h2>Редактирование</h2>
            {productToEdit ? (
                <Formik
                    validationSchema={schema}
                    onSubmit={(data, { resetForm }) => {
                        console.log(data);
                        saveEditedProducts(data);
                        navigate(-1);
                    }}
                    initialValues={productToEdit}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form
                            style={{ width: "90%", margin: "0 auto" }}
                            className="bg-light p-4"
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Название кроссовок</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите название кроссовок"
                                    name="name"
                                    onChange={handleChange}
                                    isValid={!errors.name && touched.name}
                                    isInvalid={!!errors.name}
                                    value={values.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail1">
                                <Form.Label>Брэнд товара</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="brand"
                                    onChange={handleChange}
                                    isValid={!errors.brand && touched.brand}
                                    isInvalid={!!errors.brand}
                                    value={values.brand}
                                >
                                    <option>Выберите брэнд</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Lebron">Lebron</option>
                                    <option value="Under Armour">Under Armour</option>
                                    <option value="Kobe Bryant">Kobe Bryant</option>
                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    {errors.brand}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Описание товара</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите описание кроссовок"
                                    name="description"
                                    onChange={handleChange}
                                    isValid={!errors.description && touched.description}
                                    isInvalid={!!errors.description}
                                    value={values.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Картинка товара</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите описание кроссовок"
                                    name="image"
                                    onChange={handleChange}
                                    isValid={!errors.image && touched.image}
                                    isInvalid={!!errors.image}
                                    value={values.image}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.image}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail2">
                                <Form.Label>Цена товара</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите цену товара"
                                    name="price"
                                    onChange={handleChange}
                                    isValid={!errors.price && touched.price}
                                    isInvalid={!!errors.price}
                                    value={values.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                style={{
                                    border: "none",
                                    marginLeft: "0",
                                    backgroundColor: "#1C374C",
                                }}
                                variant="primary"
                                type="submit"
                            >
                                Отправить
                            </Button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
};

export default EditPage;