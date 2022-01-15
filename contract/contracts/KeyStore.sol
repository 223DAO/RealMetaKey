//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./NFT.sol";

struct NFTState {
    uint256 tokenId;
    string uri;
    uint256 totalKeys;
    uint256 remainingKeys;
    string[] redeemedKeys;
    bool canRedeem;
}

contract KeyStore {
    /**
     * can user redeem new keys?
     */
    bool public redeemEnable = true;

    address public admin;

    NFT immutable nftContract;

    string[] private _keys;
    mapping(uint256 => string[]) private _redeemedKeys;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }

    constructor(NFT _nftContract) {
        admin = msg.sender;
        nftContract = _nftContract;
    }

    function setAdmin(address _admin) external onlyAdmin {
        admin = _admin;
    }

    function setRedeemEnable(bool enable) public onlyAdmin {
        redeemEnable = enable;
    }

    /**
     * Admin can supply keys to the contract before nft holders can redeem.
     */
    function supplyKeys(string[] calldata keys) public onlyAdmin {
        _keys = keys;
    }

    /**
     * how many keys remaining in the store
     */
    function remainingKeys() public view returns (uint256) {
        return _keys.length;
    }

    /**
     * get all nfts hold by user
     */
    function getNfts() public view returns (NFTState[] memory nftStates) {
        NFTState[] memory _tokenStates = _nftContract.getStates(msg.sender);
        if (_tokenStates.length == 0) {
            return _tokenStates;
        }
        uint256 i;

        for (i=0;i<_tokenStates.length;i++){
            //Update redeemed keys
            _tokenStates[i].redeemedKeys = _redeemedKeys[_tokenStates[i].tokenId];
            //Update canRedeem
            _tokenStates[i].canRedeem = canRedeem(_tokenStates[i].remainingKeys);
        }
        return _tokenStates;
    }

    /**
     * Update redeem availability for token
     *
     * need to check:
     * - redeem enabled
     * - the store have keys remaining
     * - token has remaining keys to redeem
     */
    function canRedeem(uint remaining) private returns (bool) {
        return (remaining > 0) && redeemEnable && (_keys.length > 0);
    }

    /**
     * valid nft holder get a new key, and token state will change
     *
     * need to check:
     * - user is nft owner
     * - nft state > 0
     * - redeem enable
     * - the store have keys remaining
     */
    function redeemKey(uint256 tokenId)
        public
        returns (string memory key, NFTState memory nftState)
    {
        address owner = nftContract.ownerOf(tokenId);
        require(msg.sender == owner, "Only owner can redeem");
        require(redeemEnable, "Redemption disabled now");
        require(_keys.length > 0, "No more keys in store");
        require(remaining > 0, "No more keys available for this NFT");

        nftContract.redeemKey(_tokenId);
        //Get and remove the last key from _keys
        string memory _key = _keys[_keys.length - 1];
        _keys.pop();
        //Update _redeemedKeys
        _redeemedKeys[tokenId].push(_key);

        //Get new token state
        NFTState memory _tokenState = nftContract.getState(tokenId);
        //Update token redeemed keys
        _tokenState.redeemedKeys = _redeemedKeys[tokenId];
        //Update token canRedeem
        _tokenState.canRedeem = canRedeem(_tokenState.remainingKeys);

        return (_key, _tokenState);
    }
}
