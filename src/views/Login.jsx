import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ login }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onsubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Las credenciales no pueden estar vacías");
            return;
        }
        const res = await login({ username: username, password: password });
        if (res.isLogin === true) {
            setUsername("");
            setPassword("");
            navigate("/profile");
        } else {
            alert(res.error || "Credenciales inválidas");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <form onSubmit={onsubmit}>
                <div>
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <div style={{ marginTop: 12 }}>
                <Link to="/users">Ver usuarios</Link>
            </div>
        </div>
    );
};

export default Login;
