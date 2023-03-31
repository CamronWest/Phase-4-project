import React, {useState, useEffect} from "react"
import Nav from "../Home/Nav.jsx"
import PropertyList from "./PropertyList.jsx";

function Dashboard({ userId }) {
    const [properties, setProperties] = useState([]);
  
    useEffect(() => {
      // Fetch the user's list of properties from the server and update the state
      fetch(`/api/users/${userId}/properties`)
        .then((response) => response.json())
        .then((data) => setProperties(data));
    }, [userId]);
  
    return 
    <div>
B YHNG         <PropertyList properties={properties} />
        </div>;
  }

export default Dashboard