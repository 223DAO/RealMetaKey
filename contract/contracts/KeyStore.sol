//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./NFT.sol";

struct NFTState {
    uint256 nftId;
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
        require(msg.sender == admin, "only admin can call");
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
    }

    function canRedeem(NFTState state) private returns (bool) {
        
    }

    /**
     * valid nft holder get a new key, and nft state will change
     *
     * need to check:
     * - user is nft owner
     * - nft state > 0
     * - redeem enable
     * - the store have keys remaining
     */
    function redeemKey(uint256 nftId)
        public
        returns (string memory key, NFTState memory nftState)
    {}
}
