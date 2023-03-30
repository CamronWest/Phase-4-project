import React, {useState, useEffect} from "react"
import Nav from "../Home/Nav.jsx"

function Dashboard({ userData }) {
    const [formState, setFormState] = useState(userData);
  
    function handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const username = target.username;
  
      setFormState({
        ...formState,
        [username]: value
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      
      fetch('/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })
        .then(response => response.json())
        .then(data => {
          
          console.log(data);
        })
        .catch(error => {
          
          console.error(error);
        });
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            type="text"
            username="username"
            value={formState.username}
            onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input
            type="email"
            username="email"
            value={formState.email}
            onChange={handleInputChange} />
        </label>
        <button onClick={() => setFormState({ ...formState, username: 'New username' })}>Update username</button>
        <button onClick={() => setFormState({ ...formState, email: 'new-email@example.com' })}>Update Email</button>
        <button type="submit">Submit</button>
      </form>
    );
  }

export default Dashboard