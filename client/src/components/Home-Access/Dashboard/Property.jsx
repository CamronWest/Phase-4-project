import React, {useState, useEffect} from "react"

function Property({ property }) {
    const [name, setName] = useState(property.name);
    const [address, setAddress] = useState(property.address);
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
  
    return (
      <div>
        <input type="text" value={name} onChange={handleNameChange} />
        <input type="text" value={address} onChange={handleAddressChange} />
      </div>
    );
  }

  export default Property;  
 
