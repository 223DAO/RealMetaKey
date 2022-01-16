//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./NFT.sol";

contract KeyStore {
    struct NFTData {
        uint256 tokenId;
        string uri;
        uint32 totalKeys;
        uint32 remainingKeys;
        string[] redeemedKeys;
        bool canRedeem;
    }

    //The standard total number of keys
    uint32 public constant TYPE_STANDRAD = 1;
    //The premium total number of keys
    uint32 public constant TYPE_PREMIUM = 6;

    // Address of admin
    address public admin;
    // Associated NFT contract
    NFT immutable nftContract;

    // If user can redeem new keys
    bool public redeemEnable = true;
    // Keys in store for redemption
    string[] private _keys;
    //Mapping from token id to redeemed keys
    mapping(uint256 => string[]) private _redeemedKeys;

    /**
     * Ensure the caller is owner of this contract
     */
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }

    constructor(NFT _nftContract) {
        admin = msg.sender;
        nftContract = _nftContract;
    }

    /**
     * Admin can change admin
     */
    function setAdmin(address _admin) external onlyAdmin {
        admin = _admin;
    }

    /**
     * Admin can enable and disable redemption function
     */
    function setRedeemEnable(bool _enable) external onlyAdmin {
        redeemEnable = _enable;
    }

    /**
     * Admin can supply keys to the store contract
     */
    function supplyKeys(string[] calldata keys) external onlyAdmin {
        for (uint256 i = 0; i < keys.length; ++i) {
            _keys.push(keys[i]);
        }
    }

    /**
     * Admin can grant _number NFTs of _type to _receiver
     * _type should be "standard" or "premium", representing the total keys available for the NFT
     */
    function grantNft(
        address _receiver,
        uint32 type_,
        uint8 _number
    ) external onlyAdmin {
        require(_number > 0, "No NFT to grant");
        require(
            type_ == TYPE_STANDRAD || type_ == TYPE_PREMIUM,
            "Wrong type of NFT"
        );
        for (uint8 i = 0; i < _number; ++i) {
            nftContract.mint(_receiver, type_, type_);
        }
    }

    /**
     * Number of keys remaining in the store
     */
    function remainingKeys() public view returns (uint256) {
        return _keys.length;
    }

    /**
     * get user nfts' data
     */
    function getNftIds() public view returns (uint256[] memory) {
        return nftContract.getTokenIdsByOwner(msg.sender);
    }

    /**
     * get user nfts' data
     */
    function nftData(uint256 _tokenId) public view returns (NFTData memory) {
        uint32 _total = nftContract.getTotal(_tokenId);
        uint32 _remaining = nftContract.getRemaining(_tokenId);
        string memory _uri = nftContract.tokenURI(_tokenId);
        string[] memory _redeemed = _redeemedKeys[_tokenId];
        bool _canRedeem = canRedeem(_remaining);
        return
            NFTData({
                tokenId: _tokenId,
                uri: _uri,
                totalKeys: _total,
                remainingKeys: _remaining,
                redeemedKeys: _redeemed,
                canRedeem: _canRedeem
            });
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
    function redeemKey(uint256 _tokenId) public {
        address owner = nftContract.ownerOf(_tokenId);
        require(msg.sender == owner, "Only owner can redeem");
        require(redeemEnable, "Redemption disabled now");
        require(_keys.length > 0, "No more keys in store");

        NFTData memory _nftData = nftData(_tokenId);
        require(
            _nftData.remainingKeys > 0,
            "No more keys available for this NFT"
        );

        nftContract.setRemaining(_tokenId, _nftData.remainingKeys - 1);
        // Get and remove the last key from _keys
        string memory _key = _keys[_keys.length - 1];
        _keys.pop();
        //Update _redeemedKeys
        _redeemedKeys[_tokenId].push(_key);
    }

    /**
     * Update redeem availability for token
     *
     * need to check:
     * - redeem enabled
     * - the store have keys remaining
     * - token has remaining keys to redeem
     */
    function canRedeem(uint256 _remaining) private view returns (bool) {
        return (_remaining > 0) && redeemEnable && (_keys.length > 0);
    }
}
