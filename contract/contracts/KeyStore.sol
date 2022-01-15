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
    function supplyKeys(string[] calldata keys) public onlyAdmin {}

    /**
     * how many keys remaining in the store
     */
    function remainingKeys() public view returns (uint256) {}

    /**
     * get all nfts hold by user
     *
     * can user redeem key?
     * user may have more than one nft
     */
    function getNfts() public view returns (NFTState[] memory nftStates) {}

    /**
     * valid nft holder get a new key, and nft state will change
     *
     * need to check:
     * - user is nft owner
     * - nft state > 0
     * - redeem enable may be false
     * - the store may have no keys remaining
     */
    function redeemKey(uint256 nftId)
        public
        returns (string memory key, NFTState memory nftState)
    {}

    /**
     * nft holder get redeemed keys
     */
    function getRedeemedKeys() public view returns (string[] memory) {}
}
