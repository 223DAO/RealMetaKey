import logo from '../../assets/logo.svg';
import metamask from '../../assets/metamask.svg';
import './redeem.css';
import { MetaMask } from '../../MetaMask';

const metaMaskClicked = () => {
  let metaMask = new MetaMask();

  metaMask.connect();
}

function Redeem() {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Remaining keys in the store : 180
            </p>
            <p className='Title-Max-Font'>
                Connect MetaMask to redeem your keys!
            </p>
            <button className='Connect-Button'>
            <img src={metamask} width={36} height={36} alt="metamask"  onClick={metaMaskClicked}/>
                Connect Wallet
            </button>
        </div>
    );
}

export default Redeem;