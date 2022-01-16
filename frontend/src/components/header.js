import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

import { signIn, logOut } from '../redux/actions/auth';

function Header() {
    const dispatch = useDispatch();
    const { walletAddress } = useSelector((state) => state.auth);
    const { ethereum } = window;

    const handleLogOut = () => {
        dispatch(logOut(false, null));
    }

    if (typeof ethereum !== 'undefined') {
        ethereum.on('disconnect', () => {
            console.log(111);
            handleLogOut();
        });
    
        ethereum.on('connect', () => {
            dispatch(signIn(true, walletAddress));
        });
    
        ethereum.on('accountsChanged', () => {
            dispatch(signIn(true, walletAddress));
        });    
    }

    const connectMetaMask = async () => {
        if (typeof ethereum !== 'undefined') {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            const address = accounts[0];

            if (Array.isArray(accounts) && accounts.length) {
                dispatch(signIn(true, address));
            }
        }
    }

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
            <div className="App__header-login-button">
                {
                    walletAddress ?
                        <span>{walletAddress}</span>
                        : <Button type="primary" onClick={connectMetaMask}>Connect Wallet</Button>
                    }
            </div>
        </div>
    );
}

export default Header;