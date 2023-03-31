import { useEffect, useState } from "react";
import React from "react";
import PropertyBlock from "./PropertyBlock.jsx";
import Nav from "../Home-Access/Home/Nav.jsx";

function PropertyList({hostView, setHostView, setUser, user, switchHostView, switchGuestView, selectedState, setSelectedState, allProperties, carveState, setStateList}) {

    let states = []
    let images = [
        "https://a0.muscache.com/im/pictures/miso/Hosting-53733023/original/ecb8c127-51db-4fed-9a4f-543a2c5bc784.jpeg?im_w=720",
        "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_348,q_75,w_618/https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/newyorkstate/pointeaurochelodge_d78fca58-0b68-491b-bde1-4ec6aa7cd73c.jpg",
        "https://a0.muscache.com/im/pictures/miso/Hosting-49814528/original/8635b3ad-47a1-4be7-a2f2-97ba0ba01139.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/aabc73e7-d2ec-4a3e-8cd2-5261fad11fc0.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/4b6ef801-3f45-4d78-a4a0-1c6eded532c6.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-626254961090027634/original/1843249b-cf76-4527-9b22-d5325c82ce12.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-746982533816745844/original/7e7eb43e-fecb-44dc-a3e2-d93f0f7ce574.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-593988155734180868/original/bd9938b3-d2f7-40c7-883a-0cfc5bacaf95.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-48552694/original/09c8ddbf-8ffb-408b-8b59-ce4cfc273a22.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-38448310/original/7de3e5c6-94e6-4c8f-a9fa-0cf640409f8d.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/c8d5a56c-e7ab-403c-9a93-3711bac42887.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-667905795030554448/original/5f3ea3a9-dd75-41fe-80cc-b23ec800d6bd.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-48882707/original/0733bb02-cae3-432f-98ce-42547acb2e78.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-709237474096352934/original/d4c68968-1856-43c8-a479-a1170c5fcde1.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/2c1f3819-3106-4f7c-b7aa-f21251104e5a.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/044998bb-bd52-4467-938e-f211fee3002b.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/cb99cf9b-c4a0-41a9-9554-31f6a8dd4b4a.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/29d075a0-c376-4cf2-a982-e501dcbe09b9.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-819364674655912803/original/43b22669-54d7-4576-a90d-b2931d7f299f.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/2127a328-6e99-4346-8e88-b49c7d0900ac.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51817665/original/277d2188-3456-493a-a895-180dc2c42d14.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-50771866/original/0d5f7d40-1a1a-4f03-b15d-2949e56935ea.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45479155/original/c5b3681e-9649-412f-b0db-3468d782eba8.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-762396383662572796/original/ecb46fb9-4f30-416a-b1c3-bc9f3f21c0b3.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/b623f1c4-db24-49c6-8a18-d7b1e603807e.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-730458829137967457/original/8fb8f0fa-7763-4406-a0d2-7ca096cf6409.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/55372229/ee67103d_original.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/44084255-533a-4fda-abb9-bf0f7bddb1b0.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/6bd2bdc0-cbc1-4697-9817-1a1ffc5599a5.jpg?im_w=720"

    ]

    const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

    const propertyBlocks = allProperties.map((property) => {
        states.push(carveState(property.location));
        const propertyState = carveState(property.location);
        if (selectedState && selectedState !== propertyState) {
            return null; 
        }
        return (
            <PropertyBlock
                key={property.id}
                image = {getRandomImage()}
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
            <div className="property-blocks-container">{propertyBlocks}</div>
        </>
    );
}

export default PropertyList;
