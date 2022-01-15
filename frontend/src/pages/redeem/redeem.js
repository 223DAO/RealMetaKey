import zora from '../../assets/zora.png';
import opensea from '../../assets/zora.png';

const zoraClicked = () => {
    window.open("https://zora.co/");
}

const openseaClicked = () => {
    window.open("https://opensea.io/");
}

function Redeem() {
    return (
        <div className="redeem">
            <p className='Title-Max-Font'>
                Connect MetaMask to redeem your keys!
            </p>
            <button className='Connect-Button'>
            <img src={zora} width={36} height={36} alt="zora"  onClick={zoraClicked}/>
                Zora
            </button>
            <button className='Connect-Button'>
            <img src={opensea} width={36} height={36} alt="opensea"  onClick={openseaClicked}/>
                Opensea
            </button>
            <button className='Connect-Button' onClick={zoraClicked}>
                Redeem
            </button>
        </div>
    );
}

export default Redeem;