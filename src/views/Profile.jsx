import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
    return (
        <div style={{ padding: 20 }}>
            <div>Profile</div>
            <h1>Nombre: {user.name}</h1>
            <h2>Id: {user._id}</h2>
            <div style={{ marginTop: 12 }}>
                <Link to="/users">Ver usuarios</Link>
            </div>
        </div>
    );
};

export default Profile;
