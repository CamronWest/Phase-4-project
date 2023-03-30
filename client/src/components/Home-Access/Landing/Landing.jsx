import React from "react";
import "./Landing.css"



function Landing({user, setUser}) {
    return (
        <div className = "homepage">
            <div>
                <a href="#">About</a>
                <a onClick={setUser("temp")}href="/access">Login</a>
            </div>
            <div className = "roam"><span id = "r">R</span>OAM</div>
        </div>
    );
}

export default Landing