import React from "react";

const Profile = ({user}) => {
    return (
        <>
            <div>Profile</div>
            <h1>Nombre: {user.name}</h1>
            <h2>Id: {user._id}</h2>

        </>
    )
}