//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@zoralabs/core/dist/contracts/ERC721.sol";

struct NFTState {
    uint256 tokenId;
    string uri;
    uint256 totalKeys;
    uint256 remainingKeys;
    string[] redeemedKeys;
    bool canRedeem;
}

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public admin;
    address public keyStore;

    mapping(uint256 => uint256) private _nftTotalKeys;
    mapping(uint256 => uint256) private _nftRemainingKeys;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }

    modifier onlyKeyStore() {
        require(msg.sender == keyStore, "Only KeyStore contract can call");
        _;
    }

    constructor() ERC721("Name", "Symbol") {}

    /**
     * Mint token to _to, with _totalKeys total keys
     */
    function mint(address _to, uint256 _totalKeys) external onlyAdmin {
        _tokenIds.increment();
        uint256 _tokenId = _tokenIds.current();
        string memory _uri = uriForKeyCondition(_totalKeys, _totalKeys);
        ERC721._safeMint(_to, _tokenId);
        super._setTokenUri(_tokenId, _uri);
        _nftTotalKeys[_tokenId] = _totalKeys;
        _nftRemainingKeys[_tokenId] = _totalKeys;
    }

    /**
     * Get all token ids of _owner
     */
    function getTokenIds(address _owner) public view returns (uint256[] memory) {
        uint256 tokenCount = ERC721.balanceOf(_owner);
        uint256[] memory _tokenIDs = new uint256[](tokenCount);
        uint256 i;

        for (i=0;i<tokenCount;i++){
            _tokenIDs[i] = ERC721Enumerable.tokenOfOwnerByIndex(_owner, i);
        }
        return _tokenIDs;
    }

    /**
     * Get token state from id
     */
    function getState(uint256 _tokenId) public view returns (NFTState memory) {
        require(_tokenId <= _tokenIds.current(), "Token doesn't exist");
        NFTState memory nftState = new NFTState();
        nftState.tokenId = _tokenId;
        nftState.uri = ERC721URIStorage.tokenURI(_tokenId);
        nftState.totalKeys = _nftTotalKeys[_tokenId];
        nftState.remainingKeys = _nftRemainingKeys[_tokenId];

        return nftState;
    }

    /**
     * Get all token states of _owner
     */
    function getStates(address _owner) public view returns (NFTState[] memory) {
        uint256[] memory _tokenIDs = getTokenIds(_owner);
        uint256 tokenCount = _tokenIDs.length;
        NFTState[] memory _tokenStates = new NFTState[](tokenCount);

        for (i=0;i<tokenCount;i++){
            _tokenStates[i] = getState(_tokenIDs[i]);
        }
        return _tokenStates;
    }

    /**
     * Update remaining key count and uri for key redemption
     */
    function redeemKey(uint256 _tokenId) external onlyKeyStore {
        require(_tokenId <= _tokenIds.current(), "Token doesn't exist");
        require(_nftRemainingKeys[_tokenId] > 0, "No available keys to redeem");
        //Update remaining key count
        uint256 newRemaining = _nftRemainingKeys[_tokenId] - 1;
        _nftRemainingKeys[_tokenId] = newRemaining;
        //Update uri according to new remaining key count
        string memory _uri = uriForKeyCondition(_totalKeys, newRemaining);
        super._setTokenURI(_tokenId, _uri);
    }

    /**
     * Get URI for token according to total key count and remaining key count
     */
    function uriForKeyCondition(uint256 _total, uint256 _remaining) private returns (string memory) {
        //Possible values for _total are 1 and 6
        uint256 id = 10*_total + _remaining;
        if (id == 11) {
            return "uri for 11 TBD";
        } else if (id == 10) {
            return "uri for 10 TBD";
        } else if (id == 66) {
            return "uri for 66 TBD";
        } else if (id == 65) {
            return "uri for 65 TBD";
        } else if (id == 64) {
            return "uri for 64 TBD";
        } else if (id == 63) {
            return "uri for 63 TBD";
        } else if (id == 62) {
            return "uri for 62 TBD";
        } else if (id == 61) {
            return "uri for 61 TBD";
        } else if (id == 60) {
            return "uri for 60 TBD";
        }
        return "";
    }
}