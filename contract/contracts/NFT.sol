//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721Enumerable, ERC721URIStorage {

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
    mapping (address => bool) admins;
    // Address of store contract
    address public store;

    // Mapping from token id to state
    mapping(uint256 => NFTState) private _states;
    // Mapping from token total and remain to token uri
    mapping(uint32 => string) private _uris;


    constructor() ERC721("RealMetaKey", "RMK") {
        admins[msg.sender] = true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) 
    internal 
    override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * Ensure the caller is admin of this contract
     */
    modifier onlyAdmin() {
        require(admins[msg.sender] == true, "Caller is not admin");
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
     * Admin can add admin
     */
    function addAdmin(address _admin)
    external
    onlyAdmin
    {
        admins[_admin] = true;
    }

    /**
     * Admin can remove admin
     */
    function removeAdmin(address _admin)
    external
    onlyAdmin
    {
        admins[_admin] = false;
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
    function setUriMapping(uint32 _id, string calldata _uri)
    external
    onlyAdmin
    {
        _uris[_id] = _uri;
    }

    /**
     * Only store contract can mint
     * Mint token to _to, with _total total and _remain remain
     */
    function mint(address _to, uint32 _total, uint32 _remaining)
    external
    onlyAdmin
    {
        uint32 id = uriMappingID(_total, _remaining);
        string memory _uri = _uris[id];
        require(_uri != "", "No content representing the total and remaining");

        uint256 _tokenId = _tokenIdTracker.current();
        ERC721._safeMint(_to, _tokenId);
        _tokenIdTracker.increment();

        ERC721URIStorage._setTokenURI(_tokenId, _uri);
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
        if (_tokenCount == 0) {
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
    onlyAdmin
    onlyExistingToken(_tokenId)
    {
        uint32 id = uriMappingID(_total, _remaining);
        string memory _uri = _uris[id];
        require(_uri != "", "No content representing the total and remaining");

        ERC721URIStorage._setTokenURI(_tokenId, _uri);
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
    pure
    onlyValidState(_total, _remaining)
    returns (uint32)
    {
        return 100_000*_total + _remaining;
    }
}
