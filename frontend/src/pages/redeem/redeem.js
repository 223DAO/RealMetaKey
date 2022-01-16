import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from 'antd';

import './redeem.css';

import zora from '../../assets/zora.png';
import opensea from '../../assets/opensea.png';
import nftImage from '../../assets/nftImage.png';
import { Contract } from "../../utils/Contract";
import { metamask } from "../../utils/MetaMask";

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
    window.open("https://testnets.opensea.io/collection/realmetakey");
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
    const [remainKeys, setRemainKeys] = useState(99);

    console.log('redeem view')

    const contract = new Contract()

    const itemDom = (item, index) => {
        async function redeem() {
            console.log('redeem click')
            const id = item.tokenId
            await contract.redeemKey(id)
            const newData = await contract.getNftData(id)
            console.log('redeem new data', newData)
            nftLists[index] = newData
            setNftLists(nftLists)
        }

        console.log('item', item)
        return (
            <Card
                key={index}
                className="App-redeem-page_nft"
                style={{ width: 300 }}
                cover={
                    <img
                        src={item.uri}
                    />
                }
                actions={[
                    <Button type="primary" onClick={redeem} disabled={!item.canRedeem}>Redeem{item.remainingKeys}/{item.totalKeys}</Button>,
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

    useEffect(() => {
        // Test call contract
        console.log('nft load')

        // await metamask.connect()

        contract.getNftDatas().then((data) => {
            console.log('nft data', data);
            setNftLists(data);
        }).catch((e) => {
            console.error('nft load error', e)
        })

    }, []);

    // useEffect(() => {
    //     contract.keyStore.remainingKeys().then(i => {
    //         setRemainKeys(i)
    //     }).catch(e => {
    //         console.error('key load error', e)
    //     })
    // }, []);

    let { walletAddress } = useSelector((state) => state.auth);

    let nft

    try {
        if (walletAddress) {
            nft = nftLists?.length ?
                nftLists.map((item, index) => itemDom(item, index))
                : noNftTips()
        } else {
            nft = (<div className="App-redeem-page_keys-remain">
                Connect MetaMask to redeem your keys!
            </div>)
        }
    } catch (e) {
        nft = 'error'
    }

    return (
        <div className="App-redeem-page">
            <div className="App-redeem-page_tips">
                <div className="App-redeem-page_keys-remain">
                    Remaining keys in the store: {remainKeys}
                </div>
            </div>
            <div className="App-redeem-page_tips">
                {nft}
            </div>
        </div>
    );
}

export default Redeem;
