import React from 'react'
import HomeLogo from "../Images/homepage.webp"
import "./Dashboard.css"; // Import the CSS file



const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <img
        src={HomeLogo}
        alt="Home Logo"
        className="home-logo"
      />
    </div>
  )
}



export default Dashboard
