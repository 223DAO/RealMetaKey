//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@zoralabs/core/dist/contracts/ERC721.sol";

contract NFT is ERC721 {

    /**
     * Structure to keep token totoal and remaining redemptions
     * The total and remaining can be up to 42,949
     */
    struct NFTState {
	    uint32 total;
	    uint32 remaining;
	}

    //The maximum total supported
    uint32 public constant maxTotal = 42_949;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    // Address of admin
    address public admin;
    // Address of store contract
    address public store;

    // Mapping from token id to state
    mapping(uint256 => NFTState) private _states;
    // Mapping from token total and remain to token uri
    mapping(uint32 => string) private _uris;


    constructor() ERC721("RealMetaKey", "RMK") {
        admin = msg.sender;
    }

    /**
     * Ensure the caller is owner of this contract
     */
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }

    /**
     * Ensure the caller is the store contract associated with this contract
     */
    modifier onlyStore() {
        require(msg.sender == store, "Only store contract can call");
        _;
    }

    /**
     * Ensure that the token has not been burned and has been minted
     */
    modifier onlyExistingToken(uint256 _tokenId) {
        require(_exists(_tokenId), "Token doesn't exist");
        _;
    }

    /**
     * Ensure that the token's total and remaining are valid
     */
    modifier onlyValidState(uint32 _total, uint32 _remaining) {
        require(_total <= maxTotal, "The total number of redemptions exceeds max value");
        require(
            _remaining <= _total, 
            "Token's remaining redemptions can't be higher than total"
        );
        _;
    }

    /**
     * Admin can change admin
     */
    function setAdmin(address _admin) 
    external 
    onlyAdmin 
    {
        admin = _admin;
    }

    /**
     * Admin can change store contract
     */
    function setStore(address _store) 
    external 
    onlyAdmin 
    {
        store = _store;
    }

    /**
     * Admin can change the uri mapping
     */
    function setUriMapping(mapping(uint32 => string) calldata uris) 
    external 
    onlyAdmin 
    {
        _uris = uris;
    }

    /**
     * Only store contract can mint
     * Mint token to _to, with _total total and _remain remain
     */
    function mint(address _to, uint32 _total, uint32 _remaining) 
    external 
    onlyStore 
    {
        uint32 id = uriMappingID(_total, _remaining);
        require(_uri != "", "No content representing the total and remaining");
        string memory _uri = _uris[id];

        uint256 _tokenId = _tokenIdTracker.current();
        ERC721._safeMint(_to, _tokenId);
        _tokenIdTracker.increment();

        super._setTokenUri(_tokenId, _uri);
        _states[_tokenId] = NFTState(
            {
                total: _total,
                remaining: _remaining
            }
        );
    }

    /**
     * Get all token ids of _owner
     */
    function getTokenIds(address _owner) 
    external 
    view 
    returns (uint256[] memory) 
    {
        uint256 _tokenCount = ERC721.balanceOf(_owner);
        if (_tokenCount.length == 0) {
            return new uint256[](0);
        }

        uint256[] memory _tokenIDs = new uint256[](_tokenCount);
        uint256 i;

        for (i=0;i<_tokenCount;i++){
            _tokenIDs[i] = ERC721Enumerable.tokenOfOwnerByIndex(_owner, i);
        }
        return _tokenIDs;
    }

    /**
     * Get token total redemption count from _tokenId
     */
    function getTotal(uint256 _tokenId) 
    external 
    view 
    onlyExistingToken(_tokenId)
    returns (uint32) 
    {
        return _states[_tokenId].total;
    }

    /**
     * Get token remaining redemption count from _tokenId
     */
    function getRemaining(uint256 _tokenId) 
    external 
    view 
    onlyExistingToken(_tokenId)
    returns (uint32) 
    {
        return _states[_tokenId].remaining;
    }

    /**
     * Get token URI from _tokenId
     */
    function getTokenUri(uint256 _tokenId) 
    external 
    view 
    onlyExistingToken(_tokenId)
    returns (string memory) 
    {
        return ERC721URIStorage.tokenURI(_tokenId);
    }

    /**
     * Update remaining total and remaining redemption count and uri for token with _tokenId
     */
    function redeem(uint256 _tokenId, uint32 _total, uint32 _remaining) 
    external 
    onlyStore
    onlyExistingToken(_tokenId)
    {
        uint32 id = uriMappingID(_total, _remaining);
        require(_uri != "", "No content representing the total and remaining");
        string memory _uri = _uris[id];

        super._setTokenUri(_tokenId, _uri);
        _states[_tokenId] = NFTState(
            {
                total: _total,
                remaining: _remaining
            }
        );
    }

    /**
     * Get URI mapping id from total and remaining
     */
    function uriMappingID(uint32 _total, uint32 _remaining) 
    private 
    onlyValidState(_total, _remaining)
    returns (uint32) 
    {
        return 100_000*_total + _remaining;
    }
}