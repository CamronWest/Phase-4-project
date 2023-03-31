import React, {useEffect, useState} from 'react';
import "./PropertyBlock.css"

function PropertyBlock({name, location, state, price, description, owner, user, image, propid}) {
    
    // function handleBooking (e) {
    //      patch bookedby with current username
    // }
    

    
    return (
        <div className="property-block">
            
            <div className = "image-slide-show">
                <img className = "card-Image" src ={image} />
            </div>


            <div className = "card-info">
                <h2>{name}</h2>
                <h3>Location: {location}</h3>
                <h3>Price: ${price} per night</h3>
                <p>{description}</p>
                <p>{owner}</p>
            </div>
                <button  propid = {propid} type="button" className = "card-button">Book Now</button>

        </div>
    )
}

export default PropertyBlock;