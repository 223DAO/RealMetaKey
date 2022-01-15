import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return(
        <div className="App__header">
            <div className="App__header-links">
                <NavLink className={(navData) => (navData.isActive ? "App__header-link-active" : 'none')} className="App__header-link-wrapper" to="/home">
                    <span className="App__header-link">Home</span>
                    <div className="App__header-link-line"></div>
                </NavLink>
                <NavLink className={(navData) => (navData.isActive ? "App__header-link-active" : 'none')} className="App__header-link-wrapper" to="/grant">
                    <span className="App__header-link">Grant</span>
                    <div className="App__header-link-line"></div>
                </NavLink>
                <NavLink className={(navData) => (navData.isActive ? "App__header-link-active" : 'none')} className="App__header-link-wrapper" to="/redeem">
                    <span className="App__header-link">Redeem</span>
                    <div className="App__header-link-line"></div>
                </NavLink>
            </div>
        </div>
    );
}

export default Header;