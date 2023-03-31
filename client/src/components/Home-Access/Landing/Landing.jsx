import React from "react";
import "./Landing.css"



function Landing({user, setUser}) {
    return (
        <div className = "homepage">
            <div>
                <a href="/access">Login</a>
            </div>
            <div className = "roam">ROAM</div>
        </div>
    );
}

export default Landing