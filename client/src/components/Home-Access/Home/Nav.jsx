import React, { useEffect, useState } from "react";
import "./Nav.css";
import PropertyList from "../../Properties/PropertyList";

function Nav({user, stateList, showGuestOption,setShowGuestOption,showStateOption, setShowStateOption, selectedState, setSelectedState, guests, setGuests, hostView, switchHostView, setHostView, setUser, switchGuestView }) {


    const handleStateOptionClick = (e) => {
        const value = e.target.getAttribute("value");
        setSelectedState(value);
        setShowStateOption(!showStateOption);
    };

    function handleLogout() {
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(null);
                console.log(user);
            })}


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
                <img className = "user-avatar"src="https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png" alt="user avatar" />
                <button onClick={switchGuestView} type="button" href="#">Guest View</button>
                <button onClick={switchHostView}  type="button" href="#">Host View</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Nav;
