import React, { useEffect, useState } from "react";
import "./Nav.css";
import PropertyList from "../../Properties/PropertyList";

function Nav({ stateList, showGuestOption,setShowGuestOption,showStateOption, setShowStateOption, selectedState, setSelectedState, guests, setGuests }) {


    const handleStateOptionClick = (e) => {
        const value = e.target.getAttribute("value");
        setSelectedState(value);
        setShowStateOption(!showStateOption);
    };




    const handleGuestOptionClick = (e) => {
        setShowGuestOption(!showGuestOption);
    };

    const handleGuestSelect = (e) => {
        const value = e.target.getAttribute("value");
        setGuests(`${value} guests`);
        setShowGuestOption(!showGuestOption);
    };

    return (
        <nav className="nav-container">
            <div className="nav-left">
                <a href="#">Home</a>
            </div>
            <div className="nav-center">
                <h2>ROAM</h2>
                <ul>
                    <li>
                        <a href="#">
                            Anywhere
                            {!showStateOption ? (
                                <span> : {selectedState}</span>
                            ) : (
                                <></>
                            )}
                        </a>
                        {showStateOption && (
                            <ul className="dropdown vertical">
                                {stateList?.map((state, index) => (
                                    <li key={index} value={state}>
                                        <a
                                            onClick={handleStateOptionClick}
                                            value={state}
                                        >
                                            {state}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <span onClick={handleStateOptionClick}>&#9662;</span>
                    </li>
                    <li>
                        <a href="#">Anytime</a>
                    </li>
                    <li>
                        <a onClick={handleGuestOptionClick}>
                            Anyone {!showGuestOption ? `(${guests})` : <></>}
                        </a>
                        {showGuestOption && (
                            <ul className="dropdown vertical">
                                <li value="1">
                                    <a onClick={handleGuestSelect} value="1">
                                        1 Guest
                                    </a>
                                </li>
                                <li value="2">
                                    <a onClick={handleGuestSelect} value="2">
                                        2 Guests
                                    </a>
                                </li>
                                <li value="3">
                                    <a onClick={handleGuestSelect} value="3">
                                        3 Guests
                                    </a>
                                </li>
                                <li value="4">
                                    <a onClick={handleGuestSelect} value="4">
                                        Four!
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
            <div className="nav-right">
                <a href="#">Switch to hosting</a>
                <img src="#" alt="user avatar" />
                <div>User Menu</div>
            </div>
        </nav>
    );
}

export default Nav;
