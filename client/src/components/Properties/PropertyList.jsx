import { useEffect, useState } from "react";
import React from "react";
import PropertyBlock from "./PropertyBlock.jsx";
import Nav from "../Home-Access/Home/Nav.jsx";

function PropertyList({hostView, setHostView, toggleView, setUser, user}) {
    const [showStateOption, setShowStateOption] = useState(false);
    const [showGuestOption, setShowGuestOption] = useState(false);
    const [guests, setGuests] = useState("almost");
    const [allProperties, setAllProperties] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [selectedState, setSelectedState] = useState("");

    useEffect(() => {
        fetch("/properties")
            .then((response) => response.json())
            .then((data) => setAllProperties(data));
    }, []);

    let states = [];

    function carveState(location) {
        let i = parseInt(location.indexOf(","));
        return location[parseInt(i + 2)] + location[parseInt(i + 3)];
    }

    useEffect(() => {
        setStateList(states);
    }, [allProperties]);

    const propertyBlocks = allProperties.map((property) => {
        states.push(carveState(property.location));
        const propertyState = carveState(property.location);
        if (selectedState && selectedState !== propertyState) {
            return null; // skip this PropertyBlock
        }
        return (
            <PropertyBlock
                key={property.id}
                name={property.name}
                location={property.location}
                state={propertyState}
                price={property.price}
                description={property.description}
                owner={property.owner}
            />
        );
    });

    return (
        <>
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
                toggleView={toggleView}
                setUser = {setUser}
                user = {user}
            />
            <div className="property-blocks-container">{propertyBlocks}</div>
        </>
    );
}

export default PropertyList;
