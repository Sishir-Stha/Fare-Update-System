import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import "../App.css"; // Import styles

const Login: React.FC = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

    useEffect(() => {
      document.title = "IT System Login";
      const favicon = document.querySelector("link[rel='icon']");
      if (favicon) {
        favicon.setAttribute("href", "/favicon.ico"); 
      }
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      navigate("/landingpage", { replace: true });
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png"
       
         alt="Yeti Airlines" className="logo" />
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN ➝
          </button>
        </form>
      </div>

      <footer className="footer">
        <p>© 2025 Sishir Shrestha. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
