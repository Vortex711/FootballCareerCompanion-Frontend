import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    console.log("Hello");

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                email, 
                password
            });

            localStorage.setItem("token", res.data.token);
            navigate("/careers");
        } catch (err) {
            alert("Login failed.");
            console.log(err);
        }
    };

    return (
        <div className="page">
            <h2>Login</h2>

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button className="primary-btn" onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

export default LoginPage;