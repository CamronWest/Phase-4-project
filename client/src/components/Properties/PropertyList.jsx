import { useEffect, useState } from "react";
import React from "react";
import PropertyBlock from "./PropertyBlock.jsx";
import Nav from "../Home-Access/Home/Nav.jsx";

function PropertyList({hostView, setHostView, setUser, user, switchHostView, switchGuestView, selectedState, setSelectedState, allProperties, carveState, setStateList}) {

    let states = []

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

    useEffect(() => {
        setStateList(states);
    }, [allProperties]);

    return (
        <>
            {/* <Nav
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
            /> */}
            <div className="property-blocks-container">{propertyBlocks}</div>
        </>
    );
}

export default PropertyList;
