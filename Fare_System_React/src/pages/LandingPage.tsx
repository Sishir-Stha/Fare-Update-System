import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure this file exists

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const email = localStorage.getItem("email") || "guest@example.com";
  const userAvatar = "/user-avatar.png"; // Default avatar
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.title = "Yeti Airlines Landing Page";
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <div className="landing-header">
        <div className="landing-logo">
          <img src="/logo.png" alt="Yeti Airlines" />
        </div>
        <div className="landing-user-profile-container">
          <div className="landing-user-profile" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={userAvatar} alt="User" />
            <div>
            <strong>{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}</strong>
            </div>
          </div>
          {showDropdown && (
            <div className="dropdown-menu standard-dropdown">
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="landing-content">
        <h1 className="landing-welcome">
          Welcome 👋<br />
          <strong>{username} !!</strong>
        </h1>
        <p className="landing-subtext">Please Select the Application</p>
        <div className="landing-app-options">
        <button onClick={() => navigate("/dashboard")} className="landing-button-primary">
          <img src="/plane.png" alt="Plane Icon" className="button-icon" />
          <span>Fare Change System</span>
        </button>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;