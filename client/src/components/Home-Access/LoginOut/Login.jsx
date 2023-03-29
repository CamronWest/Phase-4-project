import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>login</>
    );
}

const Logo = styled.h1`
    font-family: "Permanent Marker", cursive;
    font-size: 3rem;
    color: deeppink;
    margin: 8px 0 16px;
`;

const Wrapper = styled.section`
    max-width: 500px;
    margin: 40px auto;
    padding: 16px;
`;

const Divider = styled.hr`
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 16px 0;
`;

export default Login;
