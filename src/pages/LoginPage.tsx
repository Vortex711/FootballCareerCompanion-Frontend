import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post<LoginResponse>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/careers");

    } catch (error) {
      alert("Login failed.");
      console.error(error);
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;