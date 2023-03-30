import React, {useState} from 'react';
import Nav from './Nav.jsx';
import PropertyList from '../../Properties/PropertyList.jsx';
import App from '../../App.js';
import Dashboard from '../Dashboard/Dashboard.jsx';



function Home({user, setUser}) {
    console.log(user)




    const [hostView, setHostView] = useState(false)

    function toggleView() {
        setHostView(!hostView)
    }

    return (
    <section className = "page home-page">
        
        <div className = "home-container">

        {hostView ?
            <Dashboard /> 
                :
            <PropertyList
            hostView={hostView}
            setHostView={setHostView}
            toggleView={toggleView}
            setUser = {setUser}
            />

        }    

        </div>
    </section>
    )
}

export default Home