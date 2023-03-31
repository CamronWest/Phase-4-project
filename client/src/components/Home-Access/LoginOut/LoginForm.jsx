import React, { useState } from "react";
import axios from "axios"; // assuming you are using axios for making HTTP requests

const LoginForm = ({ setUser, setNeedSignUp, user }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        try {
            // make a POST request to your backend to authenticate the user
            const response = axios.post("/login", {
                username: formData.username,
                password: formData.password,
            });
            console.log(response)
            // if the user is authenticated, set the user in state and redirect to the dashboard
            setUser(response.data);
            console.log(user)
            window.location.href = "/home"; // redirect to the dashboard route
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">User Name: </label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
            <button type="button" onClick={() => setNeedSignUp(true)}>
                Signup
            </button>
        </form>
    );
};

export default LoginForm;
