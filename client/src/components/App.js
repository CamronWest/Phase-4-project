import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home-Access/Home/Home.jsx";
import SignUpForm from "./Home-Access/LoginOut/SignUpForm.jsx";
import LoginForm from "./Home-Access/LoginOut/LoginForm.jsx";
import Landing from "./Home-Access/Landing/Landing.jsx";
import Login from "./Home-Access/LoginOut/Login.jsx";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);

    
    // if (!user) return <Landing setUser={setUser} />;
    //this pushes to login page if no user is logged in, which is fine but it bypasses our beautiful landing page

    return (
        <Switch>

            <Route path="/access">
                <Login setUser={setUser} />
            </Route>

            <Route path="/home">
                <Home user={user} setUser = {setUser}/>
            </Route>

            <Route path="/">
                <Landing user={user} setUser={setUser} />
            </Route>

            
        </Switch>
    );
}

export default App;
