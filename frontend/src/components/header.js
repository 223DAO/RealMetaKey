import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

import { metamaskAccount } from '../redux/actions/auth';
import { metamask } from "../utils/MetaMask";

function Header() {
    const dispatch = useDispatch();
    const { walletAddress } = useSelector((state) => state.auth);

    function handleAccount(account) {
        console.log('account changed', account)
        dispatch(metamaskAccount(account))
    }

    useEffect(() => {
        metamask.addListener('account', handleAccount)

        return function () {
            metamask.removeListener('account', handleAccount)
            metamask.disconnect()
        };
    })

    function ellipsizeAddress(account) {
        return account.substr(0, 5) + '...' + account.substr(account.length - 5, 5)
    }

    function onConnectClick() {
        console.log('connect click')
        metamask.connect().then(console.log)
    }

    return (
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
                        <span>{ellipsizeAddress(walletAddress)}</span>
                        : <Button type="primary" onClick={onConnectClick}>Connect Wallet</Button>
                }
            </div>
        </div>
    );
}

export default Header;
