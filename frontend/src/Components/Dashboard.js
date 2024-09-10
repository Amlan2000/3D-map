import React from 'react'
import SnaptrudeLogo from "./Images/snap.svg"
import "./Dashboard.css"; // Import the CSS file



const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <img
        src={SnaptrudeLogo}
        alt="Snaptrude Logo"
        className="snaptrude-logo"
      />
    </div>
  )
}



export default Dashboard
