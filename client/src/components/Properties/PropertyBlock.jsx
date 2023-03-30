import React, {useEffect, useState} from 'react';
import "./PropertyBlock.css"

function PropertyBlock({name, location, state, price, description, owner}) {
    return (
        <div className="property-block">
            
            <div className = "image-slide-show">
                <img className = "card-Image" src = "https://a0.muscache.com/im/pictures/miso/Hosting-53733023/original/ecb8c127-51db-4fed-9a4f-543a2c5bc784.jpeg?im_w=720"/>
                <img className = "card-Image" src = "https://a0.muscache.com/im/pictures/35f92893-40d0-4e27-acc9-0d666e0490fd.jpg?im_w=720"/>
            </div>

            <div className = "card-info">
                <h2>{name}</h2>
                <h3>Location: {location}</h3>
                <h3>Price: ${price} per night</h3>
                <p>{description}</p>
                <p>{owner}</p>
            </div>

        </div>
    )
}

export default PropertyBlock;