//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721Enumerable {
    // Address of admin
    mapping(address => bool) public admins;

    mapping(uint256 => uint32) public total;
    mapping(uint256 => uint32) public remaining;

    // Mapping from token total and remain to token uri
    mapping(uint64 => string) private uris;

    constructor() ERC721("RealMetaKey", "RMK") {
        admins[msg.sender] = true;
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
     * Admin can add admin
     */
    function addAdmin(address _admin) external onlyAdmin {
        admins[_admin] = true;
    }

    /**
     * Admin can remove admin
     */
    function removeAdmin(address _admin) external onlyAdmin {
        admins[_admin] = false;
    }

    /**
     * Admin can set the uri
     */
    function setUri(
        uint32 total_,
        uint32 remain_,
        string calldata uri
    ) public onlyAdmin {
        uris[_state(total_, remain_)] = uri;
    }

    /**
     * Only store contract can mint
     * Mint token to _to, with _total total and _remain remain
     */
    function mint(
        address _to,
        uint32 _total,
        uint32 _remaining
    ) external onlyAdmin {
        require(_total > 0, "total must be greater to 0");
        require(
            _remaining > 0 && _remaining <= _total,
            "remain must be greater than 0 and less equal total"
        );

        uint256 _tokenId = totalSupply();
        super._safeMint(_to, _tokenId);

        total[_tokenId] = _total;
        remaining[_tokenId] = _remaining;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return uris[_tokenState(tokenId)];
    }

    function setRemaining(uint256 _tokenId, uint32 _remaining)
        public
        onlyAdmin
    {
        remaining[_tokenId] = _remaining;
    }

    function getTotal(uint256 _tokenId) public view returns (uint32) {
        return total[_tokenId];
    }

    function getRemaining(uint256 _tokenId) public view returns (uint32) {
        return remaining[_tokenId];
    }

    /**
     * Get all token ids of _owner
     */
    function getTokenIdsByOwner(address _owner)
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

        for (i = 0; i < _tokenCount; i++) {
            _tokenIDs[i] = ERC721Enumerable.tokenOfOwnerByIndex(_owner, i);
        }
        return _tokenIDs;
    }

    function _tokenState(uint256 tokenId) private view returns (uint64) {
        return (uint32(total[tokenId]) << 16) | remaining[tokenId];
    }

    function _state(uint32 total_, uint32 remaining_)
        private
        pure
        returns (uint64)
    {
        return (uint64(total_) << 16) | uint64(remaining_);
    }
}
