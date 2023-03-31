import React, {useState, useEffect} from "react"
import Nav from "../Home/Nav.jsx"
import PropertyList from "./PropertyList.jsx";
import * as Yup from "yup";
import axios from "axios";

function Dashboard({ userId }) {
    const [properties, setProperties] = useState([]);

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

    useEffect(() => {
      // Fetch the user's list of properties from the server and update the state
      fetch(`/users/${userId}/properties`)
        .then((response) => response.json())
        .then((data) => setProperties(data));
    }, [userId]);
  
    
    return (
    <div>
        <PropertyList properties={properties} />
        
        </div>
    )
  }

export default Dashboard