import React, { useState, useEffect } from "react";
import Nav from "../Home/Nav.jsx";
import PropertyList from "./PropertyList.jsx";
import * as Yup from "yup";
import axios from "axios";

function Dashboard({ user, setUser}) {

    const [properties, setProperties] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    console.log(user)


    useEffect(() => {
        // Fetch the user's list of properties from the server and update the state
        fetch(`/users/1/properties`)
            .then((response) => response.json())
            .then((data) => setProperties(data));
    }, []);

    return (
        <div>
            <PropertyList properties={properties} />
        </div>
    );
}

export default Dashboard;
