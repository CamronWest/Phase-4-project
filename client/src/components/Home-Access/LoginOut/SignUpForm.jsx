import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUpForm = ({setNeedSignUp}) => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("/users", values);
            console.log(response.data);
            setSubmitting(false);
        } catch (error) {
            setErrorMessage(error.message);
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
        ),
    });

    return (
        <div>
            <h2>Sign Up</h2>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <Field type="text" name="username" />
                            <ErrorMessage name="username" component="div" />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">
                                Confirm Password:
                            </label>
                            <Field type="password" name="confirmPassword" />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                            />
                        </div>

                        {errorMessage && <div>{errorMessage}</div>}

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            <label>Already have an account?</label>
            <button onClick = {()=>setNeedSignUp(false)}> Sign In </button>
        </div>
    );
};

export default SignUpForm;
