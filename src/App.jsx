import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Users from "./views/Users";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);

    const login = async (credentials) => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            const data = await res.json();
            if (res.ok && data.user) {
                setIsLogin(true);
                setUser(data.user);
                setToken(data.token || null);
                return { isLogin: true, user: data.user, token: data.token };
            }
            return { isLogin: false, error: data.message || "Login failed" };
        } catch (error) {
            return { isLogin: false, error: error.message };
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login login={login} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/users" element={<Users token={token} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;