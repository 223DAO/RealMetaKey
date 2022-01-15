import logo from '../../assets/logo.svg';
import './redeem.css';
import zora from '../../assets/zora.png';
import opensea from '../../assets/opensea.png';

var nftList = ['../../assets/zora.png', '../../assets/zora.png'];

const zoraClicked = () => {
    window.open("https://zora.co/");
}

const openseaClicked = () => {
    window.open("https://opensea.io/");
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
            <div className="Login-content">
                <button className='Connect-Button'>
                    <img src={zora} width={36} height={36} alt="zora" onClick={zoraClicked} />
                    <p className='Title-Max-Font'>
                        Zora
                    </p>
                </button>
                <button className='Connect-Button'>
                    <img src={opensea} width={36} height={36} alt="opensea" onClick={openseaClicked} />
                    <p className='Title-Max-Font'>
                        Opensea
                    </p>
                </button>
                <button className='Connect-Button' onClick={zoraClicked}>
                    Redeem
                </button>
            </div>
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