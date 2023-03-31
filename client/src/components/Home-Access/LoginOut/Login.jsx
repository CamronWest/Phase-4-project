import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./Login.css";

function Login({ setUser }) {
  const [needSignup, setNeedSignUp] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="login-forms"
        style={{
          marginTop: "calc(25vh - 2in)",
          marginBottom: "33vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {needSignup ? (
          <SignUpForm setUser={setUser} setNeedSignUp={setNeedSignUp} />
        ) : (
          <LoginForm setUser={setUser} setNeedSignUp={setNeedSignUp} />
        )}
      </div>
      <div className="equalizer">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      <div class="bar"></div>
  <div class="bar"></div>
      </div>
    </div>
  );
}

export default Login;
