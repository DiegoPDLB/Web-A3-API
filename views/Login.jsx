import { TextFiel } from "@mui/material";
import React, { useState } from "react" 

const Login = ({login}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onsubmit = async (e) => {
        e.preventDefault();
        if (!username || !password)
            alert("Las credenciales no pueden estar vacías")
            return
    }
    const res = login ({username: username, password: password})
    if (res.isLogin === true) {
        setUsername("");
        setPassword("");
        navigate("/profile");
    }

    return (
        <>
        <form onSubmit={onsubmit}>
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username" />
            <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" />
            <button type="submit">Login</button>
        </form>
        </>
    )
} 