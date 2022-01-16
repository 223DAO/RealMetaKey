import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from 'antd';

import './redeem.css';

import logo from '../../assets/logo.svg';
import zora from '../../assets/zora.png';
import opensea from '../../assets/opensea.png';
import eye from '../../assets/eye.png';
import noEye from '../../assets/noEye.png';
import nftImage from '../../assets/nftImage.png';

const nftLists = [
    {
        image: nftImage,
        hasRedeemedKey: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
        redeemedCount: 2,
        total: 6,
    },
    {
        image: nftImage,
        hasRedeemedKey: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
        redeemedCount: 2,
        total: 6,
    },
    {
        image: nftImage,
        hasRedeemedKey: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
        redeemedCount: 2,
        total: 6,
    },
    {
        image: nftImage,
        hasRedeemedKey: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
        redeemedCount: 2,
        total: 6,
    },
    {
        image: nftImage,
        hasRedeemedKey: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
        redeemedCount: 2,
        total: 6,
    }
];

const zoraClicked = () => {
    window.open("https://zora.co/");
}

const openseaClicked = () => {
    window.open("https://opensea.io/");
}

const itemDom = (item, index) => {
    return (
        <Card
            key={index}
            className="App-redeem-page_nft"
            style={{ width: 300 }}
            cover={
            <img
                src={item.image}
            />
            }
            actions={[
                <Button>Redeem</Button>,
                <Avatar src={opensea} onClick={openseaClicked} />,
                <Avatar src={zora} onClick={zoraClicked} />,
            ]}
        >
            <span className="App-redeem-page_nft-redeem-key">{item.hasRedeemedKey}</span>
        </Card>
    );
}

function Redeem() {
    let { walletAddress } = useSelector((state) => state.auth);

    return(
        <div className="App-redeem-page">
            {
                walletAddress ? 
                (
                    <div className="App-redeem-page_nfts">
                        {nftLists.map((item, index) => itemDom(item, index))}
                    </div>
                )
                : (
                    <div className="App-redeem-page_tips">
                        <div className="App-redeem-page_keys-remain">
                            Remaining keys in the store: 180
                        </div>
                        <div className="App-redeem-page_connect-tooltip">
                            Connect MetaMask to redeem your keys!
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Redeem;
