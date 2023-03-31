import React, {useState, useEffect} from 'react';
import Nav from './Nav.jsx';
import PropertyList from '../../Properties/PropertyList.jsx';
import App from '../../App.js';
import Dashboard from '../Dashboard/Dashboard.jsx';



function Home({user, setUser}) {

    const [showStateOption, setShowStateOption] = useState(false);
    const [showGuestOption, setShowGuestOption] = useState(false);
    const [selectedState, setSelectedState] = useState("");

    const [hostView, setHostView] = useState("")

    const [guests, setGuests] = useState("almost");
    const [allProperties, setAllProperties] = useState([]);
    const [stateList, setStateList] = useState([]);


    useEffect(() => {
        fetch("/properties")
            .then((response) => response.json())
            .then((data) => setAllProperties(data));
    }, []);

    console.log(user)


    function carveState(location) {
        let i = parseInt(location.indexOf(","));
        return location[parseInt(i + 2)] + location[parseInt(i + 3)];
    }





    function switchHostView() {
        console.log("click")
        setHostView(true)
    }

    function switchGuestView() {
        console.log("click")
        setHostView(false)
    }

    useEffect (() => {
        if (hostView === true) {
            setHostView(true)
        } else {
            setHostView(false)
        }
    },[hostView])

    return (
    <section className = "page home-page">
        
        <div className = "home-container">

            <Nav 
                stateList={stateList}
                showGuestOption={showGuestOption}
                setShowGuestOption={setShowGuestOption}
                showStateOption={showStateOption}
                setShowStateOption={setShowStateOption}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                guests={guests}
                setGuests={setGuests}
                hostView={hostView} 
                setHostView={setHostView}
                switchHostView={switchHostView}
                switchGuestView={switchGuestView}
                setUser = {setUser}
                user = {user}
        />
        {hostView ?
            <Dashboard 
            hostView={hostView}
            setHostView={setHostView}
            switchHostView={switchHostView}
            switchGuestView={switchGuestView}
            showStateOption={showStateOption}
            setShowStateOption={setShowStateOption}
            showGuestOption={showGuestOption}
            setShowGuestOption={setShowGuestOption}
            /> 
                :
            <PropertyList
            hostView={hostView}
            setHostView={setHostView}
            switchHostView={switchHostView}
            switchGuestView={switchGuestView}
            setUser = {setUser}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            allProperties = {allProperties}
            carveState={carveState}
            setStateList={setStateList}
            />

        }    

        </div>
    </section>
    )
}

export default Home