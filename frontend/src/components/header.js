import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

import { metamaskAccount } from '../redux/actions/auth';
import { metamask } from "../utils/MetaMask";

function Header() {
    const dispatch = useDispatch();
    let { walletAddress } = useSelector((state) => state.auth);

    function handleAccount(account) {
        console.log('account changed', account)
        dispatch(metamaskAccount(account))
    }

    useEffect(() => {
        console.log('use effect')
        metamask.addListener('account', handleAccount)
        if (walletAddress) {
            console.log('localstorage has account, try connect metamask silently')
            metamask.connect()
        }

        return function () {
            metamask.removeListener('account', handleAccount)
        };
    })

    function ellipsizeAddress(account) {
        return account.substr(0, 5) + '...' + account.substr(account.length - 5, 5)
    }

    function onConnectClick() {
        console.log('connect click')
        return metamask.connect()
    }

    function onDisconnectClick() {
        console.log('disconnect click')
        return metamask.disconnect()
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
                        <Button type="primary" onClick={onDisconnectClick}>Disconnect ({ellipsizeAddress(walletAddress)})</Button> :
                        <Button type="primary" onClick={onConnectClick}>Connect Wallet {walletAddress}</Button>
                }
            </div>
        </div>
    );
}

export default Header;
