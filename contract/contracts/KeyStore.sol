//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./NFT.sol";

contract KeyStore {

    struct NFTData {
	    uint256 tokenId;
	    string uri;
	    uint256 totalKeys;
	    uint256 remainingKeys;
	    string[] redeemedKeys;
	    bool canRedeem;
	}

    //The standard total number of keys
    uint32 public constant standardTotalKey = 1;
    //The premium total number of keys
    uint32 public constant premiumTotalKey = 6;

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
        _keys = keys;
    }

    /**
     * Admin can grant _number NFTs of _type to _receiver
     * _type should be "standard" or "premium", representing the total keys available for the NFT
     */
    function grantNft(address _receiver, string _type, uint8 _number) external onlyAdmin {
        require(_number > 0, "No NFT to grant");
        uint8 totalKeys;
        if (_type == "standard") {
            totalKeys = 1;
        } else if (_type == "premium") {
            totalKeys = 6;
        }
        require(totalKeys > 0, "Wrong type of NFT");
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
    function getNfts() public view returns (NFTData[] memory nftDatas) {
        address[] memory _tokenIds = _nftContract.getTokenIds(msg.sender);
        if (_tokenIds.length == 0) {
            return new NFTData[](0);
        }

        NFTData[] memory _nftDatas = new NFTData[_tokenIds.length]();

        uint256 i;
        for (i=0;i<_tokenIds.length;i++){
            _nftDatas[i] = nftData(_tokenIds[i]);
        }
        return _nftDatas;
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
    function redeemKey(uint256 _tokenId)
    public
    returns (string memory key, NFTData memory nftData)
    {
        address owner = nftContract.ownerOf(_tokenId);
        require(msg.sender == owner, "Only owner can redeem");
        require(redeemEnable, "Redemption disabled now");
        require(_keys.length > 0, "No more keys in store");

        NFTData memory _nftData = nftData(_tokenId);
        require(_nftData.remainingKeys > 0, "No more keys available for this NFT");

        nftContract.redeem(_tokenId, _nftData.totalKeys, _nftData.remainingKeys - 1);
        //Get and remove the last key from _keys
        string memory _key = _keys[_keys.length - 1];
        _keys.pop();
        //Update _redeemedKeys
        _redeemedKeys[_tokenId].push(_key);

        //Return _key and updated NFTData
        return (_key, nftData(_tokenId));
    }

    /**
     * get user nfts' data
     */
    function nftData(uint256 _tokenId)
    public
    view
    returns (NFTData memory)
    {
        uint32 _total = nftContract.getTotal(_tokenId);
        uint32 _remaining = nftContract.getRemaining(_tokenId);
        string memory _uri = nftContract.getTokenUri(_tokenId);
        string[] memory _redeemed = _redeemedKeys[_tokenId];
        bool _canRedeem = canRedeem(_remaining);
        return NFTData({
            tokenId: _tokenId,
            uri: _uri,
            totalKeys: _total,
            remainingKeys: _remaining,
            redeemedKeys: _redeemed,
            canRedeem: _canRedeem
        });
    }

    /**
     * Update redeem availability for token
     *
     * need to check:
     * - redeem enabled
     * - the store have keys remaining
     * - token has remaining keys to redeem
     */
    function canRedeem(uint _remaining) private returns (bool) {
        return (_remaining > 0) && redeemEnable && (_keys.length > 0);
    }
}
