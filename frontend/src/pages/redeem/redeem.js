import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from 'antd';

import './redeem.css';

import zora from '../../assets/zora.png';
import opensea from '../../assets/opensea.png';
import nftImage from '../../assets/nftImage.png';
import { contract } from "../../utils/Contract";

// const nftLists = [
//     {
//         tokenId: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
//         url: nftImage,
//         redeemedKeys: ['0x714779977aBFa568b426ceECCef5b0480A3fFDFD','0x714779977aBFa568b426ceECCef5b0480A3fFDFD'],
//         totalKeys: 6,
//         canRedeem: 2,
//     },
//     {
//         tokenId: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
//         url: nftImage,
//         redeemedKeys: ['0x714779977aBFa568b426ceECCef5b0480A3fFDFD'],
//         totalKeys: 6,
//         canRedeem: 0,
//     },
//     {
//         tokenId: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
//         url: nftImage,
//         redeemedKeys: ['0x714779977aBFa568b426ceECCef5b0480A3fFDFD'],
//         totalKeys: 6,
//         canRedeem: 2,
//     },
//     {
//         tokenId: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
//         url: nftImage,
//         redeemedKeys: ['0x714779977aBFa568b426ceECCef5b0480A3fFDFD'],
//         totalKeys: 6,
//         canRedeem: 2,
//     },
//     {
//         tokenId: '0x714779977aBFa568b426ceECCef5b0480A3fFDFD',
//         url: nftImage,
//         redeemedKeys: ['0x714779977aBFa568b426ceECCef5b0480A3fFDFD'],
//         totalKeys: 6,
//         canRedeem: 2,
//     },
// ];

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
                src={item.url}
            />
            }
            actions={[
                <Button type="primary" disabled={!item.canRedeem}>Redeem{item.canRedeem}/{item.totalKeys}</Button>,
                <Avatar src={opensea} onClick={openseaClicked} />,
                <Avatar src={zora} onClick={zoraClicked} />,
            ]}
        >
            <span className="App-redeem-page_nft-redeem-key">
                {item.redeemedKeys.join(',')}
            </span>
        </Card>
    );
}

const noNftTips = () => {
    return (
        <div className="App-redeem-page_no-nfts">
            You don't have any NFT
        </div>
    );
}

function Redeem() {
    const [nftLists, setNftLists] = useState([]);

    useEffect(() => {
      // Test call contract
      console.log('nft load')
        contract.getNftIds().then((data) => {
          console.log('nft data', data);

          setNftLists(data);
        })
    }, []);

    let { walletAddress } = useSelector((state) => state.auth);

    return(
        <div className="App-redeem-page">
            {
                walletAddress ?
                (
                    <div className="App-redeem-page_nfts">
                        {
                            !!nftLists.length ?
                                nftLists.map((item, index) => itemDom(item, index))
                                : noNftTips()
                        }
                        
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
