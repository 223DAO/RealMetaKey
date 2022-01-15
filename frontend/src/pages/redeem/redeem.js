import logo from '../../assets/logo.svg';
import './redeem.css';
import zora from '../../assets/zora.png';
import opensea from '../../assets/opensea.png';

//todo : remove Test
var nftList = ['../../assets/zora.png', '../../assets/zora.png'];

const zoraClicked = () => {
    window.open("https://zora.co/");
}

const openseaClicked = () => {
    window.open("https://opensea.io/");
}

const singleNft = () => {
    const src = logo
    //todo : fix NaN
    return (
        <div className="Single-NFT">
            <img src={src} width={74} height={74} className="App-logo" alt="logo" />
            <div className="Single-NFT-Act">
            <p>
              key : askdjsakdh
            </p>
            <div className="Single-NFT">
            <button className='Connect-Button'>
                <img src={zora} width={36} height={36} alt="zora" onClick={zoraClicked} />
                Zora
            </button>
            <button className='Connect-Button'>
                <img src={opensea} width={36} height={36} alt="opensea" onClick={openseaClicked} />
                Opensea
            </button>
            <button className='Connect-Button' onClick={NaN}>
                Redeem
            </button>
            </div>
            </div>
        </div>
    );
}

function UnLoginRedeem() {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Remaining keys in the store : 180
            </p>
            <p className='Title-Max-Font'>
                Connect MetaMask to redeem your keys!
            </p>
        </div>
    );
}

function LoginRedeem() {
    return (
        <div className="Login-header">
            <p className='Title-Max-Font'>
                Remaining keys in the store: 180
            </p>
            {nftList.length ?
                nftList.map(singleNft) :
                <p className='Title-Max-Font'>
                    You don't have any NFT.
                </p>}

        </div>
    );
}

export default Redeem;

function Redeem() {
    const login = true;
    if (login) {
        return <LoginRedeem />
    } else {
        return <UnLoginRedeem />
    }
}