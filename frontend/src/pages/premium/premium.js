import "./premium.css";

function Premium() {

  function onUnlockClick() {
    console.log('unlock click', window.unlockProtocol)
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  return (
    <div >
      <h1>Welcome to the Premium Content</h1>

      <p>(Please switch to the Polygon mainnet, clear cookies and refresh page before the demo)</p>

      <p className="unlock-content locked">Premium content is currently locked 🔒<br />
        Supprt us on grant page, and you will get the unlock airdrop. <br />
        Or you can buy the lock with 0.01 MATIC.</p>

      <p className="unlock-content locked" onClick={onUnlockClick}>
        <button className="button">
          Unlock!
        </button>
      </p>

      <div className="unlock-content unlocked">
        <p>Thanks for your support 🎉</p>
        <li>
          <p>Premium content 1</p>
          <p>Premium content 2</p>
          <p>Premium content 3</p>
        </li>
      </div>
    </div>
  )
}

export default Premium;
